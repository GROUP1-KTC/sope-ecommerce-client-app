'use client';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useUpdateFaceAuthMutation } from '~/features/user/userApi';
import { useAlertStore } from '~/store/zustand/alertStore';

interface FaceScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

const angles = ["center", "left", "right", "up", "down"];

const FaceScanModal: React.FC<FaceScanModalProps> = ({ isOpen, onClose, username }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [angleIdx, setAngleIdx] = useState(0);
  const [capturedFrames, setCapturedFrames] = useState<string[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const [updateFaceAuth] = useUpdateFaceAuthMutation();

  const captureFrame = () => {
    if (!videoRef.current) return null;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg');
  };

  const startAutoCapture = async () => {
    setIsCapturing(true);

    for (let i = 0; i < angles.length; i++) {
      await new Promise<void>((resolve) => {
        let counter = 3;
        setCountdown(counter);
        const interval = setInterval(() => {
          counter -= 1;
          setCountdown(counter);
          if (counter === 0) {
            clearInterval(interval);
            resolve();
          }
        }, 1000);
      });

      const frame = captureFrame();
      if (!frame) continue;

      setCapturedFrames(prev => [...prev, frame]);
      setAngleIdx(i);

      await fetch("http://localhost:8000/face/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          angle: angles[i],
          frame: frame.split(",")[1],
          username: username,
        })
      });
    }

    const res = await fetch("http://localhost:8000/face/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });

    const data = await res.json();
    const idObject = data.idObject;

    try {
      await updateFaceAuth({ id: username, idObject }).unwrap();
    } catch (err) {
      console.error("Failed to update FaceAuth:", err);
    }

    if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    setIsCapturing(false);
    setCountdown(null);
    setAngleIdx(0);

    onClose();

    // Hiển thị alert
    useAlertStore.getState().showAlert({
      severity: 'success',
      message: 'Cài đặt nhận diện khuôn mặt thành công!',
    });
  };


  useEffect(() => {
    if (!isOpen) return;

    let stream: MediaStream;

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(s => {
        stream = s;
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(err => {
        console.error("Cannot access webcam:", err);
        alert("Cannot access webcam");
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      setAngleIdx(0);
      setCapturedFrames([]);
      setIsCapturing(false);
      setCountdown(null);
    };
  }, [isOpen]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer hover:scale-110 transition"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold text-center mb-4">Quét khuôn mặt của bạn</h2>
        <p className="text-center text-gray-600 mb-2">
          {isCapturing
            ? countdown !== null
              ? `Đang quét ${angles[angleIdx]} trong ${countdown}s`
              : `Đã quét: ${angles[angleIdx]}`
            : "Vui lòng đảm bảo ánh sáng tốt và khuôn mặt rõ ràng. Khuôn mặt ở giữa camera."}
        </p>
        <div className="video-container relative bg-gray-200 rounded overflow-hidden mb-4">
          <video ref={videoRef} autoPlay playsInline className="w-full h-64" />
          {countdown !== null && (
            <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white bg-black/40">
              {countdown}
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <button
            onClick={startAutoCapture}
            className="px-4 py-2 mt-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer disabled:opacity-50"
            disabled={isCapturing}
          >
            Bắt đầu quét
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2 mt-4">
          {capturedFrames.map((frame, idx) => (
            <img key={idx} src={frame} className="w-full h-20 object-cover rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaceScanModal;
