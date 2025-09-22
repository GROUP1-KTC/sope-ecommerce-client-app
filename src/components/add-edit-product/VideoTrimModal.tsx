import { useEffect, useRef, useState } from 'react';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';

interface VideoTrimModalProps {
    videoUrl: string;
    onClose: () => void;
    onConfirm: (start: number, end: number) => void;
}

const VideoTrimModal = ({
    videoUrl,
    onClose,
    onConfirm,
}: VideoTrimModalProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [duration, setDuration] = useState(0);
    const [range, setRange] = useState<[number, number]>([0, 60]);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.onloadedmetadata = () => {
                const dur = Math.floor(video.duration);
                setDuration(dur);
                if (dur < 60) {
                    setRange([0, dur]);
                }
            };
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const video = videoRef.current;
            if (video && video.currentTime >= range[1]) {
                video.pause();
            }
        }, 200);
        return () => clearInterval(interval);
    }, [range]);

    const handlePlay = () => {
        const video = videoRef.current;
        if (video) {
            video.currentTime = range[0];
            video.play();
        }
    };

    const handleConfirm = () => {
        onConfirm(range[0], range[1]);
    };

    return (
        <div className="bg-white/70 flex items-center justify-center">
            <div className="bg-white rounded-xl p-4 border shadow-lg w-full h-1/4 max-w-3xl">
                <h2 className="text-lg font-semibold mb-4">Chỉnh sửa Video</h2>

                <video
                    ref={videoRef}
                    src={videoUrl}
                    controls
                    className="w-full mb-4 rounded"
                    onPlay={handlePlay}
                />

                <div className="mb-2 text-center text-sm">
                    Tồng thời lượng {Math.floor(range[1] - range[0])} giây —{' '}
                    {range[0]}s → {range[1]}s
                </div>

                <div className="mb-4 px-2">
                    {/* <Slider
                        range
                        min={0}
                        max={duration}
                        defaultValue={range}
                        value={range}
                        onChange={handleSliderChange}
                    /> */}
                    <div className="text-right text-xs mt-1 text-gray-500">
                        00:00 / {Math.floor(duration / 60)}:
                        {String(duration % 60).padStart(2, '0')}
                    </div>
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`px-4 py-2 rounded text-white ${
                            range[1] - range[0] >= 10
                                ? 'bg-orange-500 hover:bg-orange-600'
                                : 'bg-gray-300 cursor-not-allowed'
                        }`}
                        disabled={range[1] - range[0] < 10}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoTrimModal;
