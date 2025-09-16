'use client';

import { useGetInitProductsQuery, useGetInitProductsForGuestQuery } from '~/features/products/productApi';
import SuggestSection from './SuggestSection';
import { ProductSummary } from '~/types/products/product';

const SuggestSectionContainer = () => {
  const { data: userData, isLoading: isUserLoading } = useGetInitProductsQuery();
  const { data: guestData, isLoading: isGuestLoading } = useGetInitProductsForGuestQuery(undefined, {
    skip: !!userData && userData.length > 0, 
  });

  if (isUserLoading || isGuestLoading) return <p>Loading...</p>;

  const products: ProductSummary[] = (userData && userData.length > 0 ? userData : guestData)?.map(p => ({
    productId: p.productId,
    name: p.name,
    slug: p.slug || '',
    minPrice: p.minPrice,
    defaultImage: p.defaultImage || '/images/fallback.png',
    averageRating: p.averageRating ?? 0,
    totalSold: Number(p.totalSold) || 0,
    totalStock: p.totalStock ?? 0,
  })) ?? [];

  return <SuggestSection products={products} />;
};

export default SuggestSectionContainer;
