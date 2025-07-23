'use client';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const userData = {
    username: 'pkuckpam',
    firstName: 'Pham',
    lastName: 'Kuck',
    email: 'pkuckpam@gmail.com',
    phone: '0123456789',
    avtUrl: 'https://scontent.fsgn6-1.fna.fbcdn.net/v/t39.30808-6/475850716_1862410967665318_5163934026762753103_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=6RYmNAA0yVYQ7kNvwGbwh7b&_nc_oc=AdlcQe-W5e-5potihXBMXOUZYNwLEov4C0e_mZO688Qg4IVNnOC9DLkbWNgmKv80Om4&_nc_zt=23&_nc_ht=scontent.fsgn6-1.fna&_nc_gid=gatLYvEOxIe_TQ5mH3CoDA&oh=00_AfRKBny2LYHwxnjarKzE63e7ovt6xoc26RWxxOy4U8CciQ&oe=68851374',
    gender: 'Nam',
    birthDate: '1990-01-01',
};

const ProfilePage = () => {
    const [birthDate, setBirthDate] = useState<Date | null>(new Date());

    return (
        <div className="order-detail-page">
            <div className="flex flex-col min-h-[80vh] bg-gray-50 px-12">
                <div className="flex flex-1">
                    <div className="flex-1 p-6 bg-white rounded-lg shadow-md my-6">
                        <div className="text-xl font-semibold text-black uppercase">
                            Hồ sơ cá nhân
                        </div>
                        <div className="text-gray-600 mb-4">
                            Quản lý thông tin hồ sơ để bảo mật tài khoản
                        </div>
                        <hr className="my-4 border-gray-300" />
                        <div className="flex px-8">
                            <div className="flex-[3] pr-4 gap-2 flex flex-col">
                                <div className="mb-4 flex items-center">
                                    <label className="block text-gray-700 text-sm font-bold w-1/4">
                                        Tên đăng nhập
                                    </label>
                                    <div className="w-2/3 text-gray-800">
                                        {userData.username}
                                    </div>
                                </div>
                                <div className="mb-4 flex items-center">
                                    <label className="block text-gray-700 text-sm font-bold w-1/4">
                                        Tên
                                    </label>
                                    <input
                                        className="w-2/3 p-2 border rounded"
                                        type="text"
                                        defaultValue={userData.firstName}
                                    />
                                </div>
                                <div className="mb-4 flex items-center">
                                    <label className="block text-gray-700 text-sm font-bold w-1/4">
                                        Email
                                    </label>
                                    <div className="w-2/3 flex items-center">
                                        <div className="w-2/3 text-gray-800">
                                            <div className="w-2/3 text-gray-800">
                                                {userData.email.replace(
                                                    /(.{2})(.*)(@.*)/,
                                                    '$1******$3',
                                                )}
                                            </div>
                                        </div>
                                        <a
                                            href="#"
                                            className="ml-2 text-sm cursor-pointer text-blue-500 underline"
                                        >
                                            Thay Đổi
                                        </a>
                                    </div>
                                </div>
                                <div className="mb-4 flex items-center">
                                    <label className="block text-gray-700 text-sm font-bold w-1/4">
                                        Số điện thoại
                                    </label>

                                    <div className="w-2/3 flex items-start">
                                        <div className="w-2/3 text-gray-800">
                                            {userData.phone.replace(
                                                /(.{2})(.*)(.{2})/,
                                                '$1******$3',
                                            )}
                                        </div>
                                        <a
                                            href="#"
                                            className="ml-2 text-sm cursor-pointer text-blue-500 underline"
                                        >
                                            Thay Đổi
                                        </a>
                                    </div>
                                </div>
                                <div className="mb-4 flex items-center">
                                    <label className="block text-gray-700 text-sm font-bold w-1/4">
                                        Giới tính
                                    </label>
                                    <div className="w-2/3 flex space-x-4">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Nam"
                                                className="form-radio"
                                            />
                                            <span className="ml-2">Nam</span>
                                        </label>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Nữ"
                                                className="form-radio"
                                            />
                                            <span className="ml-2">Nữ</span>
                                        </label>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Khác"
                                                className="form-radio"
                                            />
                                            <span className="ml-2">Khác</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-4 flex items-center">
                                    <label className="block text-gray-700 text-sm font-bold w-1/4">
                                        Ngày sinh
                                    </label>
                                    <div className="w-2/3 ">
                                        <DatePicker
                                            selected={birthDate}
                                            onChange={(date) =>
                                                setBirthDate(date)
                                            }
                                            dateFormat="dd/MM/yyyy"
                                            className="p-2 border border-gray-300 rounded text-gray-800 cursor-pointer w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                                            maxDate={new Date()}
                                            showYearDropdown
                                            scrollableYearDropdown
                                            yearDropdownItemNumber={100}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 flex items-center">
                                    <label className="block text-gray-700 text-sm font-bold w-1/4"></label>
                                    <button className="w-1/6 bg-red-500 text-white p-2 rounded cursor-pointer hover:bg-red-600 transition-colors duration-200">
                                        Lưu
                                    </button>
                                </div>
                            </div>
                            <div className="border-l border-gray-300"></div>
                            <div className="flex-[2] pl-4 flex flex-col items-center">
                                <div className="mb-4 flex flex-col items-center">
                                    <div className="w-32 h-32 rounded-full border-4 border-gray-300 bg-gray-100 flex items-center justify-center overflow-hidden mb-4">
                                        <img
                                            src={userData.avtUrl}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <button className="w-full bg-green-500 text-white p-2 rounded cursor-pointer hover:bg-green-600 transition-colors duration-200">
                                        Chọn Ảnh
                                    </button>
                                </div>
                                <div className="text-gray-500 text-sm text-center">
                                    Dung lượng file tối đa 1 MB. Định dạng:
                                    JPEG, PNG
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
