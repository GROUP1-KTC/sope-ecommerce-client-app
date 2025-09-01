'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGetProfileQuery, useUpdateProfileMutation } from '~/features/user/userApi';
import { setUser, updateUser } from '~/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '~/hooks/useTypes';

const ProfilePage = () => {

    const [updateProfile] = useUpdateProfileMutation();

    const handleSave = async () => {
        try {
            const storedUser = sessionStorage.getItem("authUser");
            if (!storedUser) {
                alert("Không tìm thấy thông tin người dùng, vui lòng đăng nhập lại!");
                return;
            }

            const parsedUser = JSON.parse(storedUser);
            const userId = parsedUser?.id;

            if (!userId) {
                alert("Thiếu userId, vui lòng đăng nhập lại!");
                return;
            }

            console.log("Updating profile with data:", {
                id: userId,
                name: user.name,
                gender: user.gender,
                birthday: birthDate?.toISOString().split("T")[0],
                avatarUrl: user.avatarUrl,
            });

            const res = await updateProfile({
                id: userId,
                body: {
                    name: user.name,
                    gender: user.gender,
                    birthday: birthDate?.toISOString().split("T")[0],
                    avatarUrl: user.avatarUrl,
                },
            }).unwrap();

            dispatch(updateUser(res));
            alert("Cập nhật thành công!");
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra khi cập nhật!");
        }
    };


    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const { data, isLoading } = useGetProfileQuery();

    console.log("Profile API result:", { data, isLoading });


    const [birthDate, setBirthDate] = useState<Date | null>(new Date());

    useEffect(() => {
        if (data) {
            dispatch(setUser(data));
            if (data.birthDate) setBirthDate(new Date(data.birthDate));
        }
    }, [data, dispatch]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="order-detail-page">
            <div className="flex flex-col min-h-[80vh] bg-gray-50 px-0 sm:px-4 md:px-12">
                <div className="flex flex-1">
                    <div className="flex-1 p-6 bg-white rounded-lg shadow-md my-6">
                        <div className="text-xl font-semibold text-black uppercase">
                            Hồ sơ cá nhân
                        </div>
                        <div className="text-gray-600 mb-4">
                            Quản lý thông tin hồ sơ để bảo mật tài khoản
                        </div>
                        <hr className="my-4 border-gray-300" />
                        <div className="flex flex-col md:flex-row px-4 md:px-8 gap-4">
                            <div className="w-full md:w-3/4 gap-2 flex flex-col">
                                <div className="mb-4 flex items-center">
                                    <label className="block text-gray-700 text-sm font-bold w-1/4">
                                        Tên đăng nhập
                                    </label>
                                    <div className="w-2/3 text-gray-800">
                                        {user.username}
                                    </div>
                                </div>
                                <div className="mb-4 flex items-center">
                                    <label className="block text-gray-700 text-sm font-bold w-1/4">
                                        Tên
                                    </label>
                                    <input
                                        className="w-2/3 p-2 border rounded"
                                        type="text"
                                        value={user.name || ''}
                                        onChange={(e) =>
                                            dispatch(setUser({ ...user, name: e.target.value }))
                                        }
                                    />
                                </div>
                                <div className="mb-4 flex items-center">
                                    <label className="block text-gray-700 text-sm font-bold w-1/4">
                                        Email
                                    </label>
                                    <div className="w-2/3 flex items-center">
                                        <div className="w-2/3 text-gray-800">
                                            <div className="w-2/3 text-gray-800">
                                                {(user.email ?? '').replace(
                                                    /(.{2})(.*)(@.*)/,
                                                    '$1******$3',
                                                )}
                                            </div>
                                        </div>
                                        <Link
                                            href="/account/profile/change-email"
                                            className="ml-2 text-sm cursor-pointer text-blue-500 underline"
                                        >
                                            Thay Đổi
                                        </Link>
                                    </div>
                                </div>
                                <div className="mb-4 flex items-center">
                                    <label className="block text-gray-700 text-sm font-bold w-1/4">
                                        Số điện thoại
                                    </label>

                                    <div className="w-2/3 flex items-start">
                                        <div className="w-2/3 text-gray-800">
                                            {(user.phone ?? '').replace(
                                                /(.{2})(.*)(.{2})/,
                                                '$1******$3',
                                            )}
                                        </div>
                                        <Link
                                            href="/account/profile/change-phone"
                                            className="ml-2 text-sm cursor-pointer text-blue-500 underline"
                                        >
                                            Thay Đổi
                                        </Link>
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
                                                value="MALE"
                                                checked={user.gender === "MALE"}
                                                onChange={() => dispatch(setUser({ ...user, gender: "MALE" }))}
                                                className="form-radio"
                                            />
                                            <span className="ml-2">Nam</span>
                                        </label>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="FEMALE"
                                                checked={user.gender === "FEMALE"}
                                                onChange={() => dispatch(setUser({ ...user, gender: "FEMALE" }))}
                                                className="form-radio"
                                            />
                                            <span className="ml-2">Nữ</span>
                                        </label>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="OTHER"
                                                checked={user.gender === "OTHER"}
                                                onChange={() => dispatch(setUser({ ...user, gender: "OTHER" }))}
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
                                    <button
                                        onClick={handleSave}
                                        className="w-1/6 bg-red-500 text-white p-2 rounded cursor-pointer hover:bg-red-600 transition-colors duration-200">
                                        Lưu
                                    </button>
                                </div>
                            </div>
                            <div className="hidden md:block border-l border-gray-300"></div>
                            <div className="w-full md:w-1/4 pl-0 md:pl-4 flex flex-col items-center">
                                <div className="mb-4 flex flex-col items-center">
                                    <div className="w-32 h-32 rounded-full border-4 border-gray-300 bg-gray-100 flex items-center justify-center overflow-hidden mb-4">
                                        <Image
                                            width={128}
                                            height={128}
                                            src={
                                                user.avatarUrl ||
                                                '/default-avatar.png'
                                            }
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
