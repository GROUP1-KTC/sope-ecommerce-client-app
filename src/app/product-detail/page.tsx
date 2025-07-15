import ProductDescription from '~/components/product-detail/ProductDescription';
import ProductInfo from '~/components/product-detail/ProductInfo';
import ProductList from '~/components/product-detail/ProductList';
import ProductReviews from '~/components/product-detail/ProductReviews';
import SellerInfo from '~/components/product-detail/SellerInfo';
import { productData } from '~/mock/mockProductData';

const ProductDetail = () => {
    const {
        mainProduct,
        relatedProducts,
        suggestedProducts,
        breadcrumb,
        priceDetail,
        shopProducts,
        productOptions,
        sellerInfo,
        shopVouchers,
        promotionCombo,
        productDetail,
        shipInfomation,
        policy,
        reviews,
    } = productData;

    return (
        <div className="w-4/5 mx-auto ">
            <h1 className="text-s mb-4 mt-4">{breadcrumb}</h1>
            <ProductInfo
                product={mainProduct}
                priceDetail={priceDetail}
                productOptions={productOptions}
                shopVouchers={shopVouchers}
                promotionCombo={promotionCombo}
                shipInformation={shipInfomation}
                policy={policy}
            />
            {/* Related Products List */}
            <ProductList
                title="Sản phẩm liên quan"
                products={relatedProducts}
            />
            {/* Seller Info Component */ <SellerInfo sellerInfo={sellerInfo} />}
            {/* Product Detail Component */}
            <ProductDescription
                productDetail={productDetail}
                breadcrumb={breadcrumb}
            />

            {/* Product Reviews Component */}
            <ProductReviews reviews={reviews} />

            {/* Others Products */}
            <ProductList
                title="Các sản phẩm khác của Shop"
                products={shopProducts}
            />

            {/* Suggest Products */}
            <ProductList
                title="Có thể bạn cũng thích"
                products={suggestedProducts}
            />
        </div>
    );
};

export default ProductDetail;
