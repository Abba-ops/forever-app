import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const deliveryFee = 10;

  const backendUrl =
    import.meta.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : "https://forever-backend-w24o.onrender.com";

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    const savedCartData = localStorage.getItem("cartData");
    return savedCartData ? JSON.parse(savedCartData) : {};
  });

  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please specify a size.");
      return;
    }

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    localStorage.setItem("cartData", JSON.stringify(cartData));
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        toast.error("Failed to add item to the cart. Please try again.");
      }
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, sizes) => {
      return (
        total + Object.values(sizes).reduce((sum, count) => sum + count, 0)
      );
    }, 0);
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;

    localStorage.setItem("cartData", JSON.stringify(cartData));
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        toast.error("Failed to update item quantity. Please try again.");
      }
    }
  };

  const getCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const itemInfo = products.find((product) => product._id === itemId);
      return (
        total +
        Object.keys(cartItems[itemId]).reduce((sum, size) => {
          return sum + (itemInfo?.price * cartItems[itemId][size] || 0);
        }, 0)
      );
    }, 0);
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        toast.error("Unable to retrieve products at this time.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching products.");
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.data);
      } else {
        toast.error("Unable to fetch your cart data.");
      }
    } catch (error) {
      toast.error("An error occurred while retrieving your cart.");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);
      getUserCart(savedToken);
    }
  }, [token]);

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
