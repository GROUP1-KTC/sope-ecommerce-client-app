'use client';
import { useState } from 'react';
import FaceIcon from '@mui/icons-material/Face';
import { useAlertStore } from '~/store/zustand/alertStore';
import FaceScanModal from '~/components/face-scan/FaceModalScan';
import { loadAuthUser } from '~/utils/authCookie';

const PrivacySettingsPage = () => {
    const [isFaceAuthEnabled, setIsFaceAuthEnabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const alertStore = useAlertStore();

    const storedUser = loadAuthUser();

    const username = storedUser?.id || '';

    const handleToggleFaceAuth = () => {
        console.log("Stored user:", storedUser);
        console.log("Username:", username);
        if (!isFaceAuthEnabled) {
            setIsModalOpen(true);
        } else {
            setIsFaceAuthEnabled(false);
            alertStore.showAlert({
                severity: 'info',
                message: 'Face Authentication has been disabled.',
            });
        }
    };

    return (
        <div className="privacy-settings-page min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <h2 className="text-xl font-semibold text-black mb-6 text-center">
                    Privacy & Face Authentication
                </h2>
                <hr className="mb-6 border-gray-300" />

                <div className="flex items-center justify-between px-4 py-3 bg-gray-100 rounded-lg">
                    <div className="flex items-center gap-3">
                        <FaceIcon className="text-red-600" style={{ fontSize: 60 }} />
                        <div>
                            <p className="text-lg font-medium text-gray-700">Face Authentication</p>
                            <p className="text-gray-500 text-sm">
                                Use your face to log in securely
                            </p>
                        </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isFaceAuthEnabled}
                            onChange={handleToggleFaceAuth}
                        />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-400 transition-all"></div>
                        <div
                            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${isFaceAuthEnabled ? 'translate-x-5' : ''
                                }`}
                        ></div>
                    </label>
                </div>
            </div>

            {/* Modal scan Face */}
            <FaceScanModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                username={username}

            />
        </div>
    );
};

export default PrivacySettingsPage;
