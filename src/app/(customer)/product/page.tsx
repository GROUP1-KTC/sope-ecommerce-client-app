import Banner from '~/components/customer/Home/Banner';
import MallCategory from './MallCategory';
import TopTrending from './TopTrending';
import ProductFromCategory from './ProductFromCategory';
const Product = () => {
    return (
        <div className="">
            {/* Banner */}
            <Banner />
            {/* NAVER (Mall) */}
            <MallCategory />
            {/* PRODUCT TREND  */}
            <TopTrending />

            <ProductFromCategory />
        </div>
    );
};

export default Product;
