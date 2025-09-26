'use client';
import { useState } from 'react';
import FaceIcon from '@mui/icons-material/Face';
import { useAlertStore } from '~/store/zustand/alertStore';
import FaceScanModal from '~/components/face-scan/FaceModalScan';
import { loadAuthUser } from '~/utils/authCookie';
import {
    useDisableFaceAuthMutation,
    useGetFaceAuthStatusQuery,
} from '~/features/user/userApi';

const PrivacySettingsPage = () => {
    const [isFaceAuthEnabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const alertStore = useAlertStore();
    const { data: isFaceAuthEnabledBackend, refetch } =
        useGetFaceAuthStatusQuery();
    const [disableFaceAuth] = useDisableFaceAuthMutation();

    const storedUser = loadAuthUser();

    const username = storedUser?.id || '';

    const handleToggleFaceAuth = async () => {
        if (!isFaceAuthEnabledBackend) {
            setIsModalOpen(true);
        } else {
            try {
                await disableFaceAuth().unwrap();
                alertStore.showAlert({
                    severity: 'info',
                    message: 'Face Authentication has been disabled.',
                });
                refetch();
            } catch (_err) {
                alertStore.showAlert({
                    severity: 'error',
                    message: 'Failed to disable Face Authentication.',
                });
            }
        }
    };

    return (
        <div className="privacy-settings-page min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <h2 className="text-xl font-semibold text-black mb-6 text-center">
                    Quyền riêng tư và xác thực khuôn mặt
                </h2>
                <hr className="mb-6 border-gray-300" />

                <div className="flex items-center justify-between px-4 py-3 bg-gray-100 rounded-lg">
                    <div className="flex items-center gap-3">
                        <FaceIcon
                            className="text-red-600"
                            style={{ fontSize: 60 }}
                        />
                        <div>
                            <p className="text-lg font-medium text-gray-700">
                                Xác thực khuôn mặt
                            </p>
                            <p className="text-gray-500 text-sm">
                                Sử dụng khuôn mặt của bạn để đăng nhập một cách
                                an toàn
                            </p>
                        </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isFaceAuthEnabledBackend || false}
                            onChange={handleToggleFaceAuth}
                        />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-400 transition-all"></div>
                        <div
                            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                                isFaceAuthEnabled ? 'translate-x-5' : ''
                            }`}
                        ></div>
                    </label>
                </div>
            </div>

            <FaceScanModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                username={username}
            />
        </div>
    );
};

export default PrivacySettingsPage;
