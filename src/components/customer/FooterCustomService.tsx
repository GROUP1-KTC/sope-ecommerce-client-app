const FooterCustomService = () => {
    return (
        <footer className="w-full bg-gray-100 py-6 mt-auto">
            <div className="max-w-5xl mx-auto flex flex-col items-center">
                <div className="flex items-center space-x-4 text-gray-600 text-sm mb-2">
                    <a href="#" className="hover:underline">
                        Shopee Policy
                    </a>
                    <span className="mx-1">|</span>
                    <a href="#" className="hover:underline">
                        Service Requirement
                    </a>
                    <span className="mx-1">|</span>
                    <a href="#" className="hover:underline">
                        Privacy Policy
                    </a>
                </div>
                <div className="text-gray-500 text-sm">
                    © 2025 Shopee. Tất cả các quyền được bảo lưu.
                </div>
            </div>
        </footer>
    );
};

export default FooterCustomService;
