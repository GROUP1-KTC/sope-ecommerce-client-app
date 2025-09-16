"use client";

import Banner from '~/components/customer/Home/Banner';
import CategorySection from '~/components/customer/Home/CategorySection';
import FlashSaleSection from '~/components/customer/Home/FlashSaleSection';
import MostSearch from '~/components/customer/Home/MostSearchSection';
import SuggestSectionContainer from '~/components/customer/Home/SuggestSectionContainer';
import {
    mostSearchProducts,
} from '~/mock/mockProductData';
import CategoryList from '~/components/customer/CategoryList';
import LiveStreamSection from '~/components/customer/Home/LiveStreamSection';
const title = 'TÌM KIẾM NHIỀU NHẤT';
import { useGetCategoriesQuery } from '~/features/categories/categoryApi';

const HomeCustomer = () => {
    const { data: categories = [] } = useGetCategoriesQuery();

    return (
        <div>
            <Banner />
            <CategorySection categories={categories} />
            <LiveStreamSection />
            <FlashSaleSection />
            <MostSearch products={mostSearchProducts} title={title} />
            <SuggestSectionContainer />
            <CategoryList />
        </div>

    )

}


export default HomeCustomer;
