import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

export default function RelatedProduct({ category, subCategory }) {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const productsCopy = products
        .filter((product) => product.category === category)
        .filter((product) => product.subCategory === subCategory)
        .slice(0, 5);
      setRelated(productsCopy);
    }
  }, [products]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"Related"} text2={"Products"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item) => (
          <ProductItem key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
}
