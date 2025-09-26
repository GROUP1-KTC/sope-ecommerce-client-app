'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useUpdateFaceAuthMutation } from '~/features/user/userApi';
import { useAlertStore } from '~/store/zustand/alertStore';
import * as FaceMeshModule from '@mediapipe/face_mesh';
import * as CameraUtils from '@mediapipe/camera_utils';
import * as DrawingUtils from '@mediapipe/drawing_utils';
import {
    useCaptureFrameMutation,
    useSaveFaceMutation,
} from '~/services/api/faceApi';

interface FaceScanModalProps {
    isOpen: boolean;
    onClose: () => void;
    username: string;
}

declare class ImageCapture {
    constructor(track: MediaStreamTrack);
    takePhoto(): Promise<Blob>;
}

const angles = ['center', 'left', 'right', 'up', 'down'];

const FaceScanModal: React.FC<FaceScanModalProps> = ({
    isOpen,
    onClose,
    username,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [totalCountdown, setTotalCountdown] = useState<number | null>(null);

    const [updateFaceAuth] = useUpdateFaceAuthMutation();

    const [captureFrameMutation] = useCaptureFrameMutation();
    const [saveFaceMutation] = useSaveFaceMutation();

    const captureFrame = () => {
        if (!videoRef.current) return null;

        const track = (
            videoRef.current.srcObject as MediaStream
        ).getVideoTracks()[0];
        const imageCapture = new ImageCapture(track);

        return imageCapture.takePhoto().then((blob) => {
            return new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(blob);
            });
        });
    };

    const startAutoCapture = async () => {
        setIsCapturing(true);
        setTotalCountdown(10);

        const countdownInterval = setInterval(() => {
            setTotalCountdown((prev) => {
                if (!prev || prev <= 1) {
                    clearInterval(countdownInterval);
                    return null;
                }
                return prev - 1;
            });
        }, 1000);

        for (let i = 0; i < angles.length; i++) {
            await new Promise<void>((resolve) => {
                let counter = 1;
                const interval = setInterval(() => {
                    counter -= 1;
                    if (counter === 0) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 1000);
            });

            const frame = await captureFrame();
            if (!frame) continue;

            await captureFrameMutation({
                angle: angles[i],
                frame: frame.split(',')[1],
                username,
            }).unwrap();
        }

        const data = await saveFaceMutation({ username }).unwrap();
        const idObject = data.idObject;

        try {
            await updateFaceAuth({ id: username, idObject }).unwrap();
        } catch (err) {
            console.error('Failed to update FaceAuth:', err);
        }

        if (videoRef.current && videoRef.current.srcObject) {
            (videoRef.current.srcObject as MediaStream)
                .getTracks()
                .forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }

        setIsCapturing(false);
        onClose();

        useAlertStore.getState().showAlert({
            severity: 'success',
            message: 'Cài đặt nhận diện khuôn mặt thành công!',
        });
    };

    useEffect(() => {
        if (!isOpen) return;

        if (!videoRef.current || !canvasRef.current) return;

        const videoEl = videoRef.current;
        const canvasEl = canvasRef.current;

        let stream: MediaStream;
        let camera: any;

        const { FaceMesh, FACEMESH_TESSELATION } = FaceMeshModule as any;
        const { Camera } = CameraUtils as any;
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

        faceMesh.onResults((results: any) => {
            const ctx = canvasEl.getContext('2d')!;
            ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

            ctx.drawImage(results.image, 0, 0, canvasEl.width, canvasEl.height);

            if (results.multiFaceLandmarks) {
                for (const landmarks of results.multiFaceLandmarks) {
                    drawConnectors(ctx, landmarks, FACEMESH_TESSELATION, {
                        color: '#33FFFF',
                        lineWidth: 0.2,
                    });
                }
            }
        });

        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((s) => {
                stream = s;
                videoEl.srcObject = stream;

                camera = new Camera(videoEl, {
                    onFrame: async () => {
                        await faceMesh.send({ image: videoEl });
                    },
                    width: 640,
                    height: 480,
                });
                camera.start();
            })
            .catch((err) => {
                console.error('Cannot access webcam:', err);
                alert('Cannot access webcam');
            });

        return () => {
            if (camera) camera.stop();
            if (stream) stream.getTracks().forEach((track) => track.stop());
            if (videoEl) videoEl.srcObject = null;
            setIsCapturing(false);
            setTotalCountdown(null);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white mt-20 rounded-2xl shadow-lg relative flex flex-col p-4 max-w-[500px] w-full">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 hover:scale-110 transition cursor-pointer"
                    onClick={onClose}
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Quét khuôn mặt của bạn
                </h2>

                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <div className="bg-white rounded-xl overflow-hidden p-2 w-full">
                            <canvas
                                ref={canvasRef}
                                width={640}
                                height={480}
                                className="w-full h-80 object-contain rounded-xl"
                            />
                            <video
                                ref={videoRef}
                                className="hidden"
                                autoPlay
                                playsInline
                            />
                        </div>
                    </div>

                    {isCapturing && totalCountdown !== null && (
                        <div className="mt-2 text-center text-xl font-bold text-red-600">
                            Giữ khuôn mặt trong khung hình: {totalCountdown}s
                        </div>
                    )}

                    <button
                        onClick={startAutoCapture}
                        className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 cursor-pointer hover:shadow-lg transition"
                        disabled={isCapturing}
                    >
                        Bắt đầu quét
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FaceScanModal;
