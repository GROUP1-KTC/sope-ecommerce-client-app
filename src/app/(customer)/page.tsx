import Banner from '~/components/customer/Home/Banner';
import CategorySection from '~/components/customer/Home/CategorySection';
import FlashSaleSection from '~/components/customer/Home/FlashSaleSection';
import MostSearch from '~/components/customer/Home/MostSearchSection';
import SuggestedProductsSection from '~/components/customer/Home/SuggestSection';
import { categories, flashSales, mostSearchProducts } from '~/mock/mockProductData';

const title = "TÌM KIẾM NHIỀU NHẤT";

const HomeCustomer = () => (
    <div>
        <Banner />
      <CategorySection categories={categories} />
      <FlashSaleSection items={flashSales} initialSeconds={3600 + 55} />
      <MostSearch products={mostSearchProducts} title={title} />
      <SuggestedProductsSection products={mostSearchProducts} />
    </div>
);

export default HomeCustomer;
