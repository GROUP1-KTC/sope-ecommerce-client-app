import ProductDescription from "~/components/product-detail/ProductDescription";
import ProductInfo from "~/components/product-detail/ProductInfo";
import ProductList from "~/components/product-detail/ProductList";
import ProductReviews from "~/components/product-detail/ProductReviews";
import SellerInfo from "~/components/product-detail/SellerInfo";

const ProductDetail = () => {

    return (
      <div className="w-4/5 mx-auto ">
        <h1 className="text-s mb-4 mt-4">Shopee / Mẹ & Bé / Tã & bô em bé / Tã dùng một lần / Tã Bỉm Quần/Dán MOONY Xanh Unicharm Nhập Khẩu Chính Hãng, Đầy Đủ Tem Phụ cho bé trai và bé gái</h1>
        {/* Product Info Component */}
        <ProductInfo product={{
          id: 1,
          name: "Tã Bỉm Quần/Dán MOONY Xanh Unicharm Nhập Khẩu Chính Hãng, Đầy Đủ Tem Phụ cho bé trai và bé gái",
          price: 100000,
          image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5o-lvojguw00w59c0@resize_w900_nl.webp",
          rating: 4.5,
          sold: "1000"
        }} />
        {/* Related Products List */}
        <ProductList title="Sản phẩm liên quan" products={[
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
        ]} />
        {/* Seller Info Component */
        <SellerInfo />}

        {/* Product Detail Component */}
        <ProductDescription />

        {/* Product Reviews Component */}
        <ProductReviews />

        {/* Others Products */}
        <ProductList title="Các sản phẩm khác của Shop" products={[
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
        ]} />

        {/* Suggest Products */}
        <ProductList title="Có thể bạn cũng thích" products={[
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
        ]} />

      </div>
    );
  };
  
  export default ProductDetail; 