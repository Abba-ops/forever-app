import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Rating } from "react-simple-star-rating";
import StarRating from "../components/StarRating";
import RelatedProduct from "../components/RelatedProduct";

export default function Product() {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [reviewText, setReviewText] = useState("");
  const [userRating, setUserRating] = useState(0);

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === productId);
    if (product) {
      setSelectedProduct(product);
      setMainImage(product.image[0]);
    }
  };

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviewText("");
  };

  return selectedProduct ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {selectedProduct.image.map((item, index) => (
              <img
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={`Product Image ${index + 1}`}
                onClick={() => setMainImage(item)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={mainImage} className="w-full h-auto" alt="Main Product" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{selectedProduct.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <StarRating value={selectedProduct.rating} size={16} />
            <p className="pl-2">({selectedProduct.reviewCount} reviews)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {selectedProduct.price.toFixed(2)}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {selectedProduct.shortDesc}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size:</p>
            <div className="flex gap-2">
              {selectedProduct.sizes.map((sizeOption, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(sizeOption)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    sizeOption === selectedSize ? "border-orange-500" : ""
                  }`}>
                  {sizeOption}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(selectedProduct._id, selectedSize)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 uppercase">
            Add to Cart
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delivery is available for this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <button
            className={`border px-5 py-3 text-sm ${
              activeTab === "description" ? "bg-gray-300" : ""
            }`}
            onClick={() => setActiveTab("description")}>
            Description
          </button>
          <button
            className={`border px-5 py-3 text-sm ${
              activeTab === "reviews" ? "bg-gray-300" : ""
            }`}
            onClick={() => setActiveTab("reviews")}>
            Reviews ({selectedProduct.reviewCount})
          </button>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          {activeTab === "description" ? (
            <p>{selectedProduct.longDesc}</p>
          ) : (
            <div>
              <p>User Reviews</p>
              <form onSubmit={handleReviewSubmit} className="my-4">
                <div className="mb-3">
                  <Rating
                    size={24}
                    transition={true}
                    allowFraction={true}
                    fillColor="#ffae42"
                    className="star-rating"
                    onClick={handleRatingChange}
                  />
                </div>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review..."
                  className="border rounded w-full h-24 p-2"
                  required
                />
                <button
                  type="submit"
                  className="bg-black text-white text-sm active:bg-gray-700 uppercase mt-4 px-6 py-2 transition duration-300">
                  Submit Review
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <RelatedProduct
        category={selectedProduct.category}
        subCategory={selectedProduct.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}
