'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
    X,
    CheckCircle,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    ArrowDown,
    AlertTriangle,
} from 'lucide-react';
import { useAlertStore } from '~/store/zustand/alertStore';
import * as FaceMeshModule from '@mediapipe/face_mesh';
import * as CameraUtils from '@mediapipe/camera_utils';
import * as DrawingUtils from '@mediapipe/drawing_utils';
import axios from 'axios';
import { useUpdateFaceAuthMutation } from '~/features/user/userApi';
import { useConfirmFaceMutation } from '~/features/auth/authApi';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '~/features/auth/authSlice';

const angles = ['center', 'left', 'right', 'up', 'down'] as const;
type Angle = (typeof angles)[number];

const angleIcons: Record<Angle, any> = {
    center: CheckCircle,
    left: ArrowLeft,
    right: ArrowRight,
    up: ArrowUp,
    down: ArrowDown,
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
    username: string;
    mode: 'register' | 'verify';
}

export default function FaceScanModal({
    isOpen = true,
    onClose,
    username,
    mode,
}: Props) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const overlayRef = useRef<HTMLCanvasElement | null>(null);

    const [isCapturing, setIsCapturing] = useState(false);
    const [currentAngleIndex, setCurrentAngleIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [poseError, setPoseError] = useState(false);
    const [blurryWarning, setBlurryWarning] = useState(false);
    const [confirmFace] = useConfirmFaceMutation();

    const [autoVerifyStarted, setAutoVerifyStarted] = useState(false);

    const [updateFaceAuth] = useUpdateFaceAuthMutation();

    const [retryCount, setRetryCount] = useState(0);
    const MAX_RETRY = 2;

    const showAlert = useAlertStore((s) => s.showAlert);
    const dispatch = useDispatch();
    const router = useRouter();

    const faceMeshRef = useRef<FaceMeshModule.FaceMesh | null>(null);
    const facePoseRef = useRef({ yaw: 0, pitch: 0, roll: 0 });

    const VIDEO_WIDTH = 640;
    const VIDEO_HEIGHT = 480;

    useEffect(() => {
        if (
            isOpen &&
            mode === 'verify' &&
            !autoVerifyStarted &&
            retryCount === 0
        ) {
            setAutoVerifyStarted(true);
            startCapture();
        }
    }, [isOpen, mode, autoVerifyStarted, retryCount]);

    // 🧠 Khởi tạo MediaPipe FaceMesh
    useEffect(() => {
        if (!isOpen) return;
        const { FaceMesh } = FaceMeshModule as any;
        const { drawConnectors } = DrawingUtils as any;
        const faceMesh = new FaceMesh({
            locateFile: (file: string) =>
                `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });

        faceMesh.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        const FOCAL_APPROX = VIDEO_WIDTH * 1.0; // có thể chỉnh 0.8..1.5 để hiệu chỉnh
        const SMOOTH_FRAMES = 6;
        const yawBuffer: number[] = [];
        const pitchBuffer: number[] = [];

        faceMesh.onResults((results: any) => {
            const canvas = overlayRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = VIDEO_WIDTH;
            canvas.height = VIDEO_HEIGHT;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (
                results.multiFaceLandmarks &&
                results.multiFaceLandmarks.length > 0
            ) {
                const lm = results.multiFaceLandmarks[0];

                // draw landmarks (optional)
                drawConnectors(ctx, lm, FaceMeshModule.FACEMESH_TESSELATION, {
                    color: '#0f0',
                    lineWidth: 0.5,
                });

                // Lấy điểm cần thiết (normalized coords)
                const nose = lm[1];
                const left = lm[234];
                const right = lm[454];

                // chuyển sang pixel
                const nosePx = {
                    x: nose.x * VIDEO_WIDTH,
                    y: nose.y * VIDEO_HEIGHT,
                };
                const leftPx = {
                    x: left.x * VIDEO_WIDTH,
                    y: left.y * VIDEO_HEIGHT,
                };
                const rightPx = {
                    x: right.x * VIDEO_WIDTH,
                    y: right.y * VIDEO_HEIGHT,
                };

                // midpoint giữa hai mắt
                const midXPx = (leftPx.x + rightPx.x) / 2;
                const midYPx = (leftPx.y + rightPx.y) / 2;

                // dùng focal approximation thay vì z trực tiếp
                const dx = nosePx.x - midXPx; // positive -> quay phải
                const dy = nosePx.y - midYPx; // positive -> cúi xuống

                const yawDeg = Math.atan2(dx, FOCAL_APPROX) * (180 / Math.PI); // trái/phải
                const pitchDeg = Math.atan2(dy, FOCAL_APPROX) * (180 / Math.PI); // up/down

                // smoothing (moving average)
                yawBuffer.push(yawDeg);
                pitchBuffer.push(pitchDeg);
                if (yawBuffer.length > SMOOTH_FRAMES) yawBuffer.shift();
                if (pitchBuffer.length > SMOOTH_FRAMES) pitchBuffer.shift();

                const avgYaw =
                    yawBuffer.reduce((a, b) => a + b, 0) /
                    Math.max(1, yawBuffer.length);
                const avgPitch =
                    pitchBuffer.reduce((a, b) => a + b, 0) /
                    Math.max(1, pitchBuffer.length);

                facePoseRef.current = { yaw: avgYaw, pitch: avgPitch, roll: 0 };

                // OPTIONAL: debug draw / text
                ctx.fillStyle = 'white';
                ctx.font = '14px monospace';
                ctx.fillText(`Yaw: ${avgYaw.toFixed(2)}°`, 8, 18);
                ctx.fillText(`Pitch: ${avgPitch.toFixed(2)}°`, 8, 36);
            }
        });

        faceMeshRef.current = faceMesh;
    }, [isOpen]);

    // Setup camera
    useEffect(() => {
        if (!isOpen || !videoRef.current || !faceMeshRef.current) return;
        const { Camera } = CameraUtils as any;

        const camInstance = new Camera(videoRef.current, {
            onFrame: async () => {
                await faceMeshRef.current!.send({ image: videoRef.current! });
            },
            width: VIDEO_WIDTH,
            height: VIDEO_HEIGHT,
        });

        camInstance.start();
        return () => camInstance.stop();
    }, [isOpen]);

    // Hàm kiểm tra hướng mặt có đúng không
    const checkPoseMatch = (target: Angle): boolean => {
        const { yaw, pitch } = facePoseRef.current;
        const YAW_THRESHOLD = 5;
        const PITCH_THRESHOLD = 2;
        const CENTER_TOLERANCE = 6;

        switch (target) {
            case 'left':
                return yaw < -YAW_THRESHOLD;
            case 'right':
                return yaw > YAW_THRESHOLD;
            case 'up':
                return pitch < -PITCH_THRESHOLD;
            case 'down':
                return pitch > PITCH_THRESHOLD;
            default:
                return (
                    Math.abs(yaw) < CENTER_TOLERANCE &&
                    Math.abs(pitch) < CENTER_TOLERANCE
                );
        }
    };

    const captureSingle = (): string | null => {
        const video = videoRef.current;
        if (!video) return null;
        const tmp = document.createElement('canvas');
        tmp.width = VIDEO_WIDTH;
        tmp.height = VIDEO_HEIGHT;
        const ctx = tmp.getContext('2d');
        if (!ctx) return null;
        ctx.drawImage(video, 0, 0, tmp.width, tmp.height);
        return tmp.toDataURL('image/jpeg', 0.9);
    };

    const isBlurry = (dataUrl: string, threshold = 100): Promise<boolean> => {
        return new Promise((resolve) => {
            const img = new Image();
            let timer: any = setTimeout(() => resolve(true), 3000);

            img.onload = () => {
                clearTimeout(timer);
                const c = document.createElement('canvas');
                c.width = img.width;
                c.height = img.height;
                const ctx = c.getContext('2d');
                if (!ctx) return resolve(true);

                ctx.drawImage(img, 0, 0);
                const imData = ctx.getImageData(0, 0, c.width, c.height);

                const w = c.width;
                const h = c.height;
                const gray = new Float32Array(w * h);

                // Transform to grayscale (float)
                for (let i = 0, j = 0; i < imData.data.length; i += 4, j++) {
                    gray[j] =
                        0.299 * imData.data[i] +
                        0.587 * imData.data[i + 1] +
                        0.114 * imData.data[i + 2];
                }

                // Laplacian
                const lap = new Float32Array(w * h);
                for (let y = 1; y < h - 1; y++) {
                    for (let x = 1; x < w - 1; x++) {
                        const idx = y * w + x;
                        lap[idx] =
                            -4 * gray[idx] +
                            gray[idx - 1] +
                            gray[idx + 1] +
                            gray[idx - w] +
                            gray[idx + w];
                    }
                }

                // Variance of Laplacian
                let sum = 0;
                let count = 0;
                for (let y = 1; y < h - 1; y++) {
                    for (let x = 1; x < w - 1; x++) {
                        sum += lap[y * w + x];
                        count++;
                    }
                }
                const mean = sum / count;

                let variance = 0;
                for (let y = 1; y < h - 1; y++) {
                    for (let x = 1; x < w - 1; x++) {
                        const d = lap[y * w + x] - mean;
                        variance += d * d;
                    }
                }
                variance /= count;

                console.log('Image size:', w, h);
                console.log('Variance of Laplacian:', variance);

                resolve(variance < threshold);
            };

            img.onerror = () => {
                clearTimeout(timer);
                resolve(true);
            };

            img.src = dataUrl;
        });
    };

    const startCapture = async () => {
        if (!videoRef.current) {
            showAlert({ severity: 'error', message: 'Camera chưa sẵn sàng' });
            return;
        }

        setIsCapturing(true);
        setPoseError(false);
        setBlurryWarning(false);

        const shotsPerAngle = 3;
        const totalShots = angles.length * shotsPerAngle;
        let capturedShots = 0;

        const collected: Record<Angle, string[]> = {
            center: [],
            left: [],
            right: [],
            up: [],
            down: [],
        };

        for (let ai = 0; ai < angles.length; ai++) {
            setCurrentAngleIndex(ai);
            const angle = angles[ai];
            await new Promise((r) => setTimeout(r, 700));

            while (collected[angle].length < shotsPerAngle) {
                await new Promise((r) => setTimeout(r, 250));

                if (!checkPoseMatch(angle)) {
                    setPoseError(true);
                    continue;
                } else {
                    setPoseError(false);
                }

                const data = captureSingle();
                if (!data) continue;

                try {
                    const blurry = await isBlurry(data, 20);
                    console.log('blurry check:', blurry);
                    if (!blurry) {
                        collected[angle].push(data.split(',')[1]);
                        capturedShots++;
                        setBlurryWarning(false);
                        setProgress((capturedShots / totalShots) * 100);
                    } else {
                        setBlurryWarning(true);
                    }
                } catch (err) {
                    console.error('error in isBlurry:', err);
                }
            }

            await new Promise((r) => setTimeout(r, 300));
        }

        showAlert({
            severity: 'success',
            message: 'Quét hoàn tất, gửi dữ liệu...',
        });

        try {
            const payload = { username, images: collected };

            const url =
                mode === 'register'
                    ? `${process.env.NEXT_PUBLIC_AI_SERVICE_URL}/face/register`
                    : `${process.env.NEXT_PUBLIC_AI_SERVICE_URL}/face/verify`;

            const res = await axios.post(url, payload, { timeout: 60000 });

            console.log('API response:', res.data);

            if (res.data.id && mode === 'register') {
                try {
                    await updateFaceAuth({
                        id: username,
                        idObject: res.data.id,
                    }).unwrap();
                } catch (err) {
                    console.error('Failed to update FaceAuth:', err);
                }
                showAlert({
                    severity: 'success',
                    message: 'đăng ký khuôn mặt thành công!',
                });
            } else if (res.data.match_found && mode === 'verify') {
                const response = await confirmFace(
                    res.data.face_auth_token,
                ).unwrap();
                const loginData = response.data;
                dispatch(setCredentials(loginData));

                if (loginData.roles.includes('ADMIN')) router.push('/admin');
                else router.push('/');

                showAlert({
                    severity: 'success',
                    message: 'Xác thực khuôn mặt thành công!',
                });

                setRetryCount(0);
            } else if (mode === 'verify') {
                if (retryCount < MAX_RETRY) {
                    setRetryCount(retryCount + 1);
                    showAlert({
                        severity: 'error',
                        message: `Xác thực thất bại. Bạn còn ${MAX_RETRY - retryCount} lần thử lại.`,
                    });
                } else {
                    showAlert({
                        severity: 'error',
                        message:
                            'Ánh sáng môi trường không phù hợp hoặc khuôn mặt không rõ. Vui lòng thử lại sau hoặc dùng phương thức khác.',
                    });
                    setIsCapturing(false);
                    setProgress(100);
                    setTimeout(() => {
                        setProgress(0);
                        onClose();
                    }, 1200);
                    return;
                }
            }
        } catch (err: any) {
            console.error(err);
            showAlert({
                severity: 'error',
                message: err?.response?.data?.detail || 'Lỗi server',
            });
        } finally {
            if (videoRef.current && videoRef.current.srcObject) {
                (videoRef.current.srcObject as MediaStream)
                    .getTracks()
                    .forEach((track) => track.stop());
                videoRef.current.srcObject = null;
            }

            setIsCapturing(false);
            setProgress(100);
            setTimeout(() => {
                setProgress(0);
                onClose();
            }, 800);
        }
    };

    const CurrentIcon = angleIcons[angles[currentAngleIndex]];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-4 max-w-[540px] w-full relative">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-semibold text-center mb-2">
                    {mode === 'register'
                        ? 'Đăng ký khuôn mặt (2FA)'
                        : 'Xác thực khuôn mặt'}
                </h2>

                <div className="relative w-full h-88 rounded-xl overflow-hidden bg-black">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        autoPlay
                        playsInline
                        muted
                    />
                    <canvas
                        ref={overlayRef}
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    />
                </div>

                <div className="mt-3 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                        <CurrentIcon size={28} className="text-green-500" />
                        <div className="text-sm font-medium">
                            Hướng: {angles[currentAngleIndex].toUpperCase()}
                        </div>
                    </div>

                    {poseError && (
                        <div className="flex items-center text-red-600 text-sm mt-1 gap-1 animate-pulse">
                            <AlertTriangle size={18} />
                            Vui lòng quay mặt đúng hướng yêu cầu!
                        </div>
                    )}

                    {blurryWarning && (
                        <div className="flex items-center text-red-600 text-sm mt-1 gap-1 animate-pulse">
                            <AlertTriangle size={18} />
                            Ảnh bị mờ, vui lòng giữ yên khuôn mặt
                        </div>
                    )}

                    <div className="w-full">
                        <div className="text-xs text-center mb-1">
                            Tiến độ: {Math.round(progress)}%
                        </div>
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div
                                className="bg-green-500 h-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {!isCapturing ||
                    mode === 'register' ||
                    (mode === 'verify' && retryCount > 0) ? (
                        <button
                            onClick={startCapture}
                            className="mt-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
                            disabled={
                                mode === 'verify' && retryCount >= MAX_RETRY
                            }
                        >
                            {mode === 'register'
                                ? 'Bắt đầu đăng ký'
                                : retryCount >= MAX_RETRY
                                  ? 'Không thể thử lại'
                                  : 'Xác thực lại'}
                        </button>
                    ) : (
                        <div className="mt-2 text-sm text-gray-600">
                            Đang quét khuôn mặt... Vui lòng giữ mặt trong khung
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
