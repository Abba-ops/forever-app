import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

export default function BestSeller() {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((product) => product.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"Best"} text2={"Sellers"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Browse our top-selling products that customers love the most.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((product) => (
          <ProductItem key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
}
