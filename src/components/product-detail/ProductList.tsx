import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  sold: string;
}

const ProductList = ({ title, products }: { title: string; products: Product[] }) => {
  return (
    <div className="container mx-auto mt-4 p-4 border border-gray-200 rounded-lg">
      <h2 className="uppercase text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="flex flex-wrap gap-9 justify-center">
        {products.map((product) => (
          <div key={product.id} className="w-[200px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
