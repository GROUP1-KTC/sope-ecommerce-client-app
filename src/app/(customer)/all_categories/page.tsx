import Image from 'next/image';
import CustomLink from '~/components/shared/loading/CustomLink';

interface Category {
    name: string;
    img: string;
    link: string;
}

const categories: Category[] = [
    {
        name: 'Thời Trang Nam',
        img: 'https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b',
        link: 'product',
    },
    {
        name: 'Thời Trang Nữ',
        img: 'https://down-vn.img.susercontent.com/file/75ea42f9eca124e9cb3cde744c060e4d',
        link: 'product',
    },
    {
        name: 'Điện Thoại & Phụ Kiện',
        img: 'https://down-vn.img.susercontent.com/file/31234a27876fb89cd522d7e3db1ba5ca',
        link: 'product',
    },
    {
        name: 'Mẹ & Bé',
        img: 'https://down-vn.img.susercontent.com/file/099edde1ab31df35bc255912bab54a5e',
        link: 'product',
    },
    {
        name: 'Thiết Bị Điện Tử',
        img: 'https://down-vn.img.susercontent.com/file/978b9e4cb61c611aaaf58664fae133c5',
        link: 'product',
    },
    {
        name: 'Nhà Cửa & Đời Sống',
        img: 'https://down-vn.img.susercontent.com/file/24b194a695ea59d384768b7b471d563f',
        link: 'product',
    },
    {
        name: 'Máy Tính & Laptop',
        img: 'https://down-vn.img.susercontent.com/file/c3f3edfaa9f6dafc4825b77d8449999d',
        link: 'product',
    },
    {
        name: 'Sắc Đẹp',
        img: 'https://down-vn.img.susercontent.com/file/ef1f336ecc6f97b790d5aae9916dcb72',
        link: 'product',
    },
    {
        name: 'Máy Ảnh & Máy Quay Phim',
        img: 'https://down-vn.img.susercontent.com/file/ec14dd4fc238e676e43be2a911414d4d',
        link: 'product',
    },
    {
        name: 'Sức Khỏe',
        img: 'https://down-vn.img.susercontent.com/file/49119e891a44fa135f5f6f5fd4cfc747',
        link: 'product',
    },
    {
        name: 'Đồng Hồ',
        img: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260',
        link: 'product',
    },
    {
        name: 'Giày Dép Nữ',
        img: 'https://down-vn.img.susercontent.com/file/48630b7c76a7b62bc070c9e227097847',
        link: 'product',
    },
    {
        name: 'Giày Dép Nam',
        img: 'https://down-vn.img.susercontent.com/file/74ca517e1fa74dc4d974e5d03c3139de',
        link: 'product',
    },
    {
        name: 'Túi Ví Nữ',
        img: 'https://down-vn.img.susercontent.com/file/fa6ada2555e8e51f369718bbc92ccc52',
        link: 'product',
    },
    {
        name: 'Thể thao và du lịch',
        img: 'https://down-vn.img.susercontent.com/file/6cb7e633f8b63757463b676bd19a50e4_tn&quot',
        link: 'product',
    },
    {
        name: 'Thể thao và du lịch',
        img: 'https://down-vn.img.susercontent.com/file/ce8f8abc726cafff671d0e5311caa684_tn&quot',
        link: 'product',
    },
    {
        name: 'Thể thao và du lịch',
        img: 'https://down-vn.img.susercontent.com/file/31234a27876fb89cd522d7e3db1ba5ca_tn&quot',
        link: 'product',
    },
    {
        name: 'Thể thao và du lịch',
        img: 'https://down-vn.img.susercontent.com/file/3fb459e3449905545701b418e8220334_tn&quot',
        link: 'product',
    },
    {
        name: 'Thể thao và du lịch',
        img: 'https://down-vn.img.susercontent.com/file/7abfbfee3c4844652b4a8245e473d857_tn&quot',
        link: 'product',
    },
    {
        name: 'Thể thao và du lịch',
        img: 'https://down-vn.img.susercontent.com/file/8e71245b9659ea72c1b4e737be5cf42e_tn&quot',
        link: 'product',
    },
];

// Helper: group categories by first letter
const groupByFirstLetter = (cats: Category[]): Record<string, Category[]> => {
    const groups: Record<string, Category[]> = {};
    cats.forEach((cat) => {
        const first = cat.name.trim()[0].toUpperCase();
        if (!groups[first]) groups[first] = [];
        groups[first].push(cat);
    });
    return groups;
};

const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i),
);

const AllCategories = () => {
    const groups = groupByFirstLetter(categories);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
            <div className="w-full max-w-5xl">
                <div className="text-sm text-gray-500 mb-4 hover:bg-red-200">
                    Trang chủ &gt; Tất cả Danh mục
                </div>
                {/* Alphabet navigation */}
                <div className="flex justify-center gap-2 mb-6 select-none">
                    {alphabet.map((ch) =>
                        groups[ch] ? (
                            <a
                                key={ch}
                                href={`#cat-${ch}`}
                                className="text-red-500 font-semibold px-2 cursor-pointer hover:underline"
                            >
                                {ch}
                            </a>
                        ) : (
                            <span
                                key={ch}
                                className="text-gray-300 px-2 cursor-not-allowed"
                            >
                                {ch}
                            </span>
                        ),
                    )}
                </div>
                {/* Category groups by letter */}
                {alphabet.map(
                    (ch) =>
                        groups[ch] && (
                            <div key={ch} id={`cat-${ch}`} className="mb-12">
                                <div className="text-3xl font-bold text-gray-700 mb-4">
                                    {ch}
                                </div>
                                <div className="grid grid-cols-6 gap-6 bg-white p-8 rounded-xl shadow">
                                    {groups[ch].map((cat, idx) => (
                                        <CustomLink
                                            href={cat.link}
                                            key={cat.name + idx}
                                            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 transition group"
                                        >
                                            <div className="w-20 h-20 flex items-center justify-center mb-2">
                                                <Image
                                                    src={cat.img}
                                                    alt={cat.name}
                                                    width={40}
                                                    height={40}
                                                    className="w-16 h-16 object-contain rounded-full border border-gray-200 bg-white group-hover:scale-105 transition"
                                                />
                                            </div>
                                            <div className="text-center text-sm font-medium text-gray-700 group-hover:text-green-600">
                                                {cat.name}
                                            </div>
                                        </CustomLink>
                                    ))}
                                </div>
                            </div>
                        ),
                )}
            </div>
        </div>
    );
};

export default AllCategories;
