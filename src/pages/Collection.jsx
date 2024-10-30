import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

export default function Collection() {
  const { products, showSearch, search } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subcategory.includes(item.subCategory)
      );
    }

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilterProducts(productsCopy);
  };

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubcategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubcategory((prev) => [...prev, e.target.value]);
    }
  };

  const sortProducts = () => {
    let filteredCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(filteredCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(filteredCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subcategory, search, showSearch, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60 sm:sticky sm:top-20 self-start">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="uppercase my-2 text-xl flex items-center cursor-pointer gap-2">
          Filters
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt="Dropdown Icon"
          />
        </p>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}>
          <p className="mb-3 text-sm font-medium uppercase">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Men"
                onChange={toggleCategory}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Women"
                onChange={toggleCategory}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Kids"
                onChange={toggleCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}>
          <p className="mb-3 text-sm font-medium uppercase">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Top wear"
                onChange={toggleSubcategory}
              />{" "}
              Top wear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Bottom wear"
                onChange={toggleSubcategory}
              />{" "}
              Bottom wear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Winter wear"
                onChange={toggleSubcategory}
              />{" "}
              Winter wear
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="All" text2="Collections" />
          <select
            className="border-2 border-gray-300 text-sm px-2"
            onChange={(e) => setSortType(e.target.value)}>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((product) => (
            <ProductItem key={product._id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
