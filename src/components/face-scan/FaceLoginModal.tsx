'use client';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useConfirmFaceMutation } from '~/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setCredentials } from '~/features/auth/authSlice';
import { useVerifyFaceMutation } from '~/services/api/faceApi';

interface FaceLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    faceAuthId: string;
}

const FaceLoginModal = ({
    isOpen,
    onClose,
    faceAuthId,
}: FaceLoginModalProps) => {
    const [match, setMatch] = useState(false);
    const [noFaceDetected, setNoFaceDetected] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [confirmFace] = useConfirmFaceMutation();
    const [verifyFace] = useVerifyFaceMutation();
    const dispatch = useDispatch();
    const router = useRouter();
    const [retryCount, setRetryCount] = useState(0);

    const startCamera = () => {
        setNoFaceDetected(false);
        setMatch(false);

        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) videoRef.current.srcObject = stream;
            })
            .catch((err) => console.error('Không mở được camera:', err));

        intervalRef.current = setInterval(() => captureAndSend(), 1000);

        setTimeout(() => {
            if (!match) {
                setNoFaceDetected(true);
                stopCamera();
            }
        }, 10000);
    };

    const stopCamera = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (videoRef.current && videoRef.current.srcObject) {
            (videoRef.current.srcObject as MediaStream)
                .getTracks()
                .forEach((track) => track.stop());
        }
    };

    useEffect(() => {
        if (isOpen) startCamera();

        return () => stopCamera();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const captureAndSend = async () => {
        if (!videoRef.current || !canvasRef.current || match) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const blob: Blob | null = await new Promise((resolve) =>
            canvas.toBlob(resolve, 'image/jpeg'),
        );
        if (!blob) return;

        const formData = new FormData();
        formData.append('faceAuthId', faceAuthId);
        formData.append('file', blob, 'frame.jpg');

        try {
            const data = await verifyFace(formData).unwrap();
            if (data.match_found) {
                setMatch(true);
                stopCamera();
                onClose();

                const faceAuthToken = data.face_auth_token;
                if (faceAuthToken) {
                    const response = await confirmFace(faceAuthToken).unwrap();
                    const loginData = response.data;
                    dispatch(setCredentials(loginData));

                    if (loginData.roles.includes('ADMIN'))
                        router.push('/admin');
                    else router.push('/');
                }
            }
        } catch (err) {
            console.error('Error gửi ảnh:', err);
        }
    };

    const handleRetry = () => {
        if (retryCount < 3) {
            setRetryCount((prev) => prev + 1);
            startCamera();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg relative flex flex-col p-4 max-w-[500px]">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 hover:scale-110 transition cursor-pointer"
                    onClick={onClose}
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Xác thực khuôn mặt
                </h2>

                <div className="flex flex-col items-center justify-center">
                    <div className="bg-white rounded-lg overflow-hidden p-2">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="object-contain rounded-xl"
                        />
                        <canvas ref={canvasRef} className="hidden" />
                    </div>

                    <div className="mt-4 text-lg text-gray-700 text-center">
                        {match ? (
                            <span className="text-green-600 font-semibold">
                                Khuôn mặt đã được xác thực! Đang đăng nhập...
                            </span>
                        ) : noFaceDetected && retryCount < 3 ? (
                            <div className="flex flex-col items-center">
                                <span className="text-red-600 font-semibold text-center">
                                    Không tìm thấy khuôn mặt. Vui lòng thử lại.
                                </span>
                                <button
                                    onClick={handleRetry}
                                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
                                >
                                    Thử lại
                                </button>
                            </div>
                        ) : noFaceDetected && retryCount >= 3 ? (
                            <span className="text-red-600 font-semibold text-center">
                                Ánh sáng môi trường không phù hợp hoặc khuôn mặt
                                không rõ. Vui lòng thử lại sau hoặc dùng phương
                                thức khác.
                            </span>
                        ) : (
                            'Vui lòng để khuôn mặt ở chính giữa khung hình'
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaceLoginModal;
