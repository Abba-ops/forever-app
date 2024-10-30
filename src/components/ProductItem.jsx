import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

export default function ProductItem({ _id, image, name, price }) {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${_id}`}>
      <div className="overflow-hidden">
        <img
          alt={name}
          src={image[0]}
          className="hover:scale-110 transition ease-in-out"
        />
      </div>
      <p className="pt-3 pb-1 text-sm font-semibold">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price.toFixed(2)}
      </p>
    </Link>
  );
}
