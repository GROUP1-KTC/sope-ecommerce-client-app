'use client';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useConfirmFaceMutation } from '~/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setCredentials } from '~/features/auth/authSlice';

interface FaceLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    faceAuthId: string;
}

const FaceLoginModal = ({ isOpen, onClose, faceAuthId }: FaceLoginModalProps) => {
    const [match, setMatch] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [confirmFace] = useConfirmFaceMutation();
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (!isOpen) return;

        // mở camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) videoRef.current.srcObject = stream;
            })
            .catch(err => console.error("Không mở được camera:", err));

        // setup chụp liên tục
        intervalRef.current = setInterval(() => {
            captureAndSend();
        }, 1000); // 1 ảnh/s

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                (videoRef.current.srcObject as MediaStream)
                    .getTracks()
                    .forEach(track => track.stop());
            }
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isOpen]);

    const captureAndSend = async () => {
        if (!videoRef.current || !canvasRef.current || match) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // convert canvas -> blob
        const blob: Blob | null = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
        if (!blob) return;

        const formData = new FormData();
        formData.append("faceAuthId", faceAuthId);
        formData.append("file", blob, "frame.jpg");

        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            const res = await fetch("http://localhost:8000/verify", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (data.match_found) {
                setMatch(true);
                if (intervalRef.current) clearInterval(intervalRef.current);

                if (videoRef.current && videoRef.current.srcObject) {
                    (videoRef.current.srcObject as MediaStream)
                        .getTracks()
                        .forEach(track => track.stop());
                }

                onClose();

                const tempToken = localStorage.getItem("tempToken");
                if (tempToken) {
                    try {
                        const response = await confirmFace(tempToken).unwrap();
                        const loginData = response.data;

                        dispatch(setCredentials(loginData));

                        if (loginData.roles.includes("ADMIN")) {
                            router.push("/admin");
                        } else {
                            router.push("/");
                        }
                    } catch (err) {
                        console.error("Confirm face failed:", err);
                    }
                }

            }
        } catch (err) {
            console.error("Error gửi ảnh:", err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-[850px] h-[600px] relative flex flex-col p-6">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                ><X size={24} /></button>

                <h2 className="text-2xl font-semibold mb-4 text-center">Face Verification</h2>

                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-full h-[80%] flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden">
                        <video ref={videoRef} autoPlay playsInline className="max-w-full max-h-full object-contain rounded-xl" />
                        <canvas ref={canvasRef} className="hidden" />
                    </div>
                    <p className="mt-4 text-lg text-gray-700 text-center">
                        {match ? <span className="text-green-600 font-semibold">✅ Face Matched! Logging in...</span>
                            : 'Align your face in front of the camera...'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FaceLoginModal;
