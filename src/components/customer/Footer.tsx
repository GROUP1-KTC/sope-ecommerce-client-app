import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <footer className="bg-[#fafafa] border-t border-[#f5f5f5] text-[#222] text-xs sm:text-sm mt-10 border border-red-500">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8 border-b-2 border-red-800">
                {/* Customer Service */}
                <div>
                    <h3 className="font-bold mb-2 ">CUSTOMER SERVICE</h3>
                    <ul className="space-y-1">
                        <li>Help Centre</li>
                        <li>Shopee Blog</li>
                        <li>Shopee Mall</li>
                        <li>How To Buy</li>
                        <li>How To Sell</li>
                        <li>Payment</li>
                        <li>Shopee Coins</li>
                        <li>Shipping</li>
                        <li>Return & Refund</li>
                        <li>Contact Us</li>
                        <li>Warranty Policy</li>
                    </ul>
                </div>
                {/* About Shopee */}
                <div>
                    <h3 className="font-bold mb-2">ABOUT SHOPEE</h3>
                    <ul className="space-y-1">
                        <li>About Us</li>
                        <li>Shopee Careers</li>
                        <li>Shopee Policies</li>
                        <li>Privacy Policy</li>
                        <li>Shopee Mall</li>
                        <li>Seller Centre</li>
                        <li>Flash Deals</li>
                        <li>Shopee Ambassador Programme</li>
                        <li>Media Contact</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-2">THANH TOÁN</h3>
                    <ul className="grid grid-cols-3 gap-2 mb-4">
                        <li>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-1 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8"
                                    alt="Visa"
                                    width={48}
                                    height={24}
                                    className="w-12 h-6 object-contain"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-1 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16"
                                    alt="MasterCard"
                                    width={48}
                                    height={24}
                                    className="w-12 h-6 object-contain"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-1 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08"
                                    alt="AMEX"
                                    width={48}
                                    height={24}
                                    className="w-12 h-6 object-contain"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-1 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c"
                                    alt="JCB"
                                    width={48}
                                    height={24}
                                    className="w-12 h-6 object-contain"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-1 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281"
                                    alt="SPay"
                                    width={48}
                                    height={24}
                                    className="w-12 h-6 object-contain"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-1 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09"
                                    alt="COD"
                                    width={48}
                                    height={24}
                                    className="w-12 h-6 object-contain"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-1 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06"
                                    alt="Paypal"
                                    width={48}
                                    height={24}
                                    className="w-12 h-6 object-contain"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-1 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/0217f1d345587aa0a300e69e2195c492"
                                    alt="Installment"
                                    width={48}
                                    height={24}
                                    className="w-12 h-6 object-contain"
                                />
                            </a>
                        </li>
                    </ul>
                    <h3 className="font-bold mb-2 mt-4">ĐƠN VỊ VẬN CHUYỂN</h3>
                    <ul className="grid grid-cols-3 gap-2">
                        <li>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-1 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m20rc1wk8926cf"
                                    alt="SPX"
                                    width={48}
                                    height={24}
                                    className="w-12 h-6 object-contain"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-1 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/vn-50009109-64f0b242486a67a3d29fd4bcf024a8c6"
                                    alt="Giao Hang Nhanh"
                                    width={48}
                                    height={24}
                                    className="w-12 h-6 object-contain"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-1 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/59270fb2f3fbb7cbc92fca3877edde3f"
                                    alt="Giao Hang Tiet Kiem"
                                    width={48}
                                    height={24}
                                    className="w-12 h-6 object-contain"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-1 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/957f4eec32b963115f952835c779cd2c"
                                    alt="VNPost"
                                    width={48}
                                    height={24}
                                    className="w-12 h-6 object-contain"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-1 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/0d349e22ca8d4337d11c9b134cf9fe63"
                                    alt="J&T"
                                    width={48}
                                    height={24}
                                    className="w-12 h-6 object-contain"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-1 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/3900aefbf52b1c180ba66e5ec91190e5"
                                    alt="NinjaVan"
                                    width={48}
                                    height={24}
                                    className="w-12 h-6 object-contain"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-1 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/6e3be504f08f88a15a28a9a447d94d3d"
                                    alt="Viettel"
                                    width={48}
                                    height={24}
                                    className="w-12 h-6 object-contain"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-1 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/0b3014da32de48c03340a4e4154328f6"
                                    alt="Grab"
                                    width={48}
                                    height={24}
                                    className="w-12 h-6 object-contain"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-1 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/vn-50009109-ec3ae587db6309b791b78eb8af6793fd"
                                    alt="Ahamove"
                                    width={48}
                                    height={24}
                                    className="w-12 h-6 object-contain"
                                />
                            </a>
                        </li>
                    </ul>
                </div>
                {/* Follow Us */}
                <div>
                    <h3 className="font-bold mb-2">FOLLOW US</h3>
                    <ul className="space-y-1">
                        <li className='mb-2'>
                            <a href="https://facebook.com" className="flex items-center gap-2 hover:underline">
                                <FacebookIcon fontSize="small" sx={{ fontSize: 20 }} /> Facebook
                            </a>
                        </li>
                        <li className='mb-2'>
                            <a href="https://instagram.com" className="flex items-center gap-2 hover:underline">
                                <InstagramIcon fontSize="small" sx={{ fontSize: 20 }} /> Instagram
                            </a>
                        </li>
                        <li className='mb-2'>
                            <a href="https://linkedin.com" className="flex items-center gap-2 hover:underline">
                                <LinkedInIcon fontSize="small" sx={{ fontSize: 20 }} /> LinkedIn
                            </a>
                        </li>
                    </ul>
                </div>
                {/* Shopee App Download */}
                <div>
                    <h3 className="font-bold mb-2">SHOPEE APP DOWNLOAD</h3>
                    <div className="flex flex-row gap-4 items-center">
                        <a
                            href="https://shopee.vn/web"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center bg-white p-0.5 shadow-sm rounded"
                        >
                            <img
                                src="https://down-vn.img.susercontent.com/file/a5e589e8e118e937dc660f224b9a1472"
                                alt="QR Code"
                                width={64}
                                height={64}
                                className="w-16 h-16 object-contain"
                            />
                        </a>
                        <div className="flex flex-col gap-2">
                            <a
                                href="https://shopee.vn/web"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-0.5 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/ad01628e90ddf248076685f73497c163"
                                    alt="AppGallery"
                                    width={80}
                                    height={24}
                                    className="w-20 h-6 object-contain"
                                />
                            </a>
                            <a
                                href="https://shopee.vn/web"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-0.5 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/35352374f39bdd03b25e7b83542b2cb0"
                                    alt="App Store"
                                    width={80}
                                    height={24}
                                    className="w-20 h-6 object-contain"
                                />
                            </a>
                            <a
                                href="https://shopee.vn/web"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-white p-0.5 shadow-sm rounded"
                            >
                                <img
                                    src="https://down-vn.img.susercontent.com/file/ae7dced05f7243d0f3171f786e123def"
                                    alt="Google Play"
                                    width={80}
                                    height={24}
                                    className="w-20 h-6 object-contain"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Copyright & Info */}
            <div className="border-t border-[#f5f5f5] py-6 text-center text-xs text-[#888]">
                <div className="mb-2">
                    © 2025 Shopee. All Rights Reserved .
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mt-2">
                    <a href="/privacy-policy">
                        <span>PRIVACY POLICY</span>
                    </a>
                    <span className="hidden sm:inline">|</span>
                    <span>TERM OF SERVICE</span>
                    <span className="hidden sm:inline">|</span>
                    <span>SHIPPING POLICY</span>
                    <span className="hidden sm:inline">|</span>
                    <span>VIOLATION</span>
                </div>

                <div className="my-3">
                    <img
                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/269d99f72b0ddacd.png"
                        alt="Shopee Logo"
                        className="mx-auto w-150 h-50"
                    />
                </div>

                <div>345 HUTECH Vietnam</div>
                <div>© 2025 - Copyright belongs to KTC group 1 </div>
            </div>
        </footer>
    );
};

export default Footer;
