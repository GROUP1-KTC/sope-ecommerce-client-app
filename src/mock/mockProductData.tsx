import { time } from "console";
import { features } from "process";
import ProductDescription from "~/components/product-detail/ProductDescription";
import SellerInfo from "~/components/product-detail/SellerInfo";

export const productData = {
  breadcrumb :"Shopee / Mẹ & Bé / Tã & bô em bé / Tã dùng một lần / Tã Bỉm Quần/Dán MOONY Xanh Unicharm Nhập Khẩu Chính Hãng, Đầy Đủ Tem Phụ cho bé trai và bé gái" ,
  mainProduct: {
    id: 1,
    name: "Tã Bỉm Quần/Dán MOONY Xanh Unicharm Nhập Khẩu Chính Hãng, Đầy Đủ Tem Phụ cho bé trai và bé gái",
    price: 100000,
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5o-lvojguw00w59c0@resize_w900_nl.webp",
    rating: 4.5,
    sold: "1000"
  },

  shopVouchers: [
    {
      description: "Giảm 3%",
      discount: 10000,
      validUntil: "2023-12-31"
    },
    {
      description: "Giảm 5%",
      discount: 5000,
      validUntil: "2023-11-30"
    }
  ],

  promotionCombo: {
    description: "Mua 3 & giảm ₫10.000",
    discount: 10000,
    requiredQuantity: 3
  },

  priceDetail: {
    originalPrice: 120000, // Giá gốc
    discounts: [
      {
        type: "product",
        value: 95000,
        description: "Giảm giá sản phẩm"
      },
      {
        type: "shopee",
        value: 44550,
        description: "Mua từ ₫100,000 giảm giá 15%. Sử dụng Voucher có hạn."
      },
      {
        type: "shop",
        value: 8000,
        description: "Mua từ ₫0 giảm giá 50%. Sử dụng Voucher có hạn."
      }
    ],
    finalPrice: 252450 // Giá tạm tính
  },

  productOptions: {
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Xanh', 'Vàng', 'Hồng'],
  },
  
  relatedProducts: [
    {
      id: 2,
      name: "Tã Bỉm Quần MOONY Xanh Unicharm Nhập Khẩu Chính Hãng",
      price: 120000,
      image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5o-lvojguw00w59c0@resize_w900_nl.webp",
      rating: 4.7,
      sold: "500"
    },
    {
      id: 3,
      name: "Tã Dán MOONY Vàng Unicharm Chính Hãng",
      price: 95000,
      image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5o-lvojguw00w59c0@resize_w900_nl.webp",
      rating: 4.6,
      sold: "800"
    },
    {
      id: 4,
      name: "Tã Dán MOONY Vàng Unicharm Chính Hãng",
      price: 95000,
      image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5o-lvojguw00w59c0@resize_w900_nl.webp",
      rating: 4.6,
      sold: "800"
    },
    {
      id: 5,
      name: "Tã Dán MOONY Vàng Unicharm Chính Hãng",
      price: 95000,
      image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5o-lvojguw00w59c0@resize_w900_nl.webp",
      rating: 4.6,
      sold: "800"
    },
    {
      id: 6,
      name: "Tã Dán MOONY Vàng Unicharm Chính Hãng",
      price: 95000,
      image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5o-lvojguw00w59c0@resize_w900_nl.webp",
      rating: 4.6,
      sold: "800"
    }
  ],
  shopProducts: [
    {
      id: 2,
      name: "Tã Bỉm Quần MOONY Xanh Unicharm Nhập Khẩu Chính Hãng",
      price: 120000,
      image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5o-lvojguw00w59c0@resize_w900_nl.webp",
      rating: 4.7,
      sold: "500"
    },
    {
      id: 3,
      name: "Tã Dán MOONY Vàng Unicharm Chính Hãng",
      price: 95000,
      image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5o-lvojguw00w59c0@resize_w900_nl.webp",
      rating: 4.6,
      sold: "800"
    },
    {
      id: 4,
      name: "Tã Dán MOONY Vàng Unicharm Chính Hãng",
      price: 95000,
      image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5o-lvojguw00w59c0@resize_w900_nl.webp",
      rating: 4.6,
      sold: "800"
    },
    {
      id: 5,
      name: "Tã Dán MOONY Vàng Unicharm Chính Hãng",
      price: 95000,
      image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5o-lvojguw00w59c0@resize_w900_nl.webp",
      rating: 4.6,
      sold: "800"
    },
    {
      id: 6,
      name: "Tã Dán MOONY Vàng Unicharm Chính Hãng",
      price: 95000,
      image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5o-lvojguw00w59c0@resize_w900_nl.webp",
      rating: 4.6,
      sold: "800"
    }
  ],
  suggestedProducts: [
    {
      id: 2,
      name: "Tã Bỉm Quần MOONY Xanh Unicharm Nhập Khẩu Chính Hãng",
      price: 120000,
      image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5o-lvojguw00w59c0@resize_w900_nl.webp",
      rating: 4.7,
      sold: "500"
    },
    {
      id: 3,
      name: "Tã Dán MOONY Vàng Unicharm Chính Hãng",
      price: 95000,
      image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5o-lvojguw00w59c0@resize_w900_nl.webp",
      rating: 4.6,
      sold: "800"
    },
    {
      id: 4,
      name: "Tã Dán MOONY Vàng Unicharm Chính Hãng",
      price: 95000,
      image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5o-lvojguw00w59c0@resize_w900_nl.webp",
      rating: 4.6,
      sold: "800"
    },
    {
      id: 5,
      name: "Tã Dán MOONY Vàng Unicharm Chính Hãng",
      price: 95000,
      image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5o-lvojguw00w59c0@resize_w900_nl.webp",
      rating: 4.6,
      sold: "800"
    },
    {
      id: 6,
      name: "Tã Dán MOONY Vàng Unicharm Chính Hãng",
      price: 95000,
      image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5o-lvojguw00w59c0@resize_w900_nl.webp",
      rating: 4.6,
      sold: "800"
    }
  ],
  sellerInfo: {
    name: "Shop Tã Bỉm Chính Hãng",
    lastestTimeOnline: "Hoạt động gần đây",
    shopAvatar: "/abc.png",
    numOfReviews: 1500,
    responseRate: 95,
    responseTime: "Trong vòng 1 giờ",
    timeActive: "Tham gia từ 2020",
    numOfProducts: 200,
    numOfFollowers: 5000,
  },

  productDetail: {
    description: "Tã Bỉm Quần/Dán MOONY Xanh Unicharm là sản phẩm tã bỉm cao cấp, nhập khẩu chính hãng từ Nhật Bản. Sản phẩm được thiết kế đặc biệt cho bé trai và bé gái, mang lại sự thoải mái và an toàn tối đa cho làn da nhạy cảm của trẻ.",
    features: {
      "Chất liệu": "Sợi bông tự nhiên, mềm mại",
      "Khả năng thấm hút": "Siêu thấm, giữ da khô",
      "Thiết kế": "Dạng quần/dán tiện lợi, dễ dàng thay đổi",
      "Kích thước": "Phù hợp với các bé từ sơ sinh đến"
    }
  },

  ProductDescription: "Tã Bỉm Quần/Dán MOONY Xanh Unicharm là sản phẩm tã bỉm cao cấp, nhập khẩu chính hãng từ Nhật Bản. Sản phẩm được thiết kế đặc biệt cho bé trai và bé gái, mang lại sự thoải mái và an toàn tối đa cho làn da nhạy cảm của trẻ.",

  shipInfomation: {
    time: "Nhận hàng 12 Th07 - 17 Th07",
    fee: "Phí ship: ₫15,000 (miễn phí với đơn từ ₫50,000)",
    policy: "Tặng voucher ₫10,000 nếu giao sau 17 Th07"
  },

  policy: {
    sopePolicy: "Trả hàng miễn phí 15 ngày · Chính hãng 100% · Miễn phí vận chuyển",
    procurementPolicy: [
      "Trả hàng miễn phí trong vòng 15 ngày nếu sản phẩm không đúng mô tả.",
      "Cam kết 100% hàng chính hãng, có hóa đơn rõ ràng.",
      "Miễn phí vận chuyển cho đơn hàng từ 50,000 VNĐ."
    ]
  },

  reviews: [
    {
      id: 1,
      avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
      name: 'Nguyen Van AAA',
      rating: 4,
      date: '13/07/2025',
      comment: 'Sản phẩm rất tốt, chất lượng ổn, giao hàng nhanh chóng!',
    },
    {
      id: 2,
      avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
      name: 'Tran Thi B',
      rating: 5,
      date: '12/07/2025',
      comment: 'Tuyệt vời, màu sắc đẹp, đáng đồng tiền!',
    },
    {
      id: 3,
      avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
      name: 'Le Van C',
      rating: 3,
      date: '11/07/2025',
      comment: 'Sản phẩm trung bình, hy vọng cải thiện hơn.',
    },
  ],

};