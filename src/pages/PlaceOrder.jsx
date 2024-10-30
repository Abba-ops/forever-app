import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function PlaceOrder() {
  const {
    token,
    navigate,
    backendUrl,
    cartItems,
    setCartItems,
    deliveryFee,
    products,
    getCartAmount,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderItems = [];

      Object.entries(cartItems).forEach(([itemId, sizes]) => {
        Object.entries(sizes).forEach(([size, quantity]) => {
          if (quantity > 0) {
            const itemInfo = structuredClone(
              products.find((item) => item._id === itemId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = quantity;
              orderItems.push(itemInfo);
            }
          }
        });
      });

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      };

      const placeCashOnDeliveryOrder = async () => {
        try {
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.error("Error placing cash on delivery order:", error);
        }
      };

      const placeStripeOrder = async () => {
        const response = await axios.post(
          `${backendUrl}/api/order/stripe`,
          orderData,
          { headers: { token } }
        );

        if (response.data.success) {
          window.location.replace(response.data.session_url);
        } else {
          toast.error("Error processing Stripe payment.");
        }
      };

      if (method === "cod") {
        placeCashOnDeliveryOrder();
      } else if (method === "stripe") {
        placeStripeOrder();
      }
    } catch (error) {
      console.error("Error during order submission:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="text"
            onChange={handleChange}
            name="firstName"
            value={formData.firstName}
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            type="text"
            onChange={handleChange}
            name="lastName"
            value={formData.lastName}
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={formData.email}
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          required
          type="text"
          onChange={handleChange}
          name="street"
          value={formData.street}
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            required
            type="text"
            onChange={handleChange}
            name="city"
            value={formData.city}
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            type="text"
            onChange={handleChange}
            name="state"
            value={formData.state}
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="text"
            onChange={handleChange}
            name="zipcode"
            value={formData.zipcode}
            placeholder="Zip code"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            type="text"
            onChange={handleChange}
            name="country"
            value={formData.country}
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          type="text"
          onChange={handleChange}
          name="phone"
          value={formData.phone}
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>
      <div className="mt-8">
        <CartTotal />
        <div className="mt-12">
          <Title text1={"Payment"} text2={"Method"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}></p>
              <img
                alt="stripe logo"
                className="h-5 mx-4"
                src={assets.stripe_logo}
              />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}></p>
              <img
                alt="razorpay logo"
                className="h-5 mx-4"
                src={assets.razorpay_logo}
              />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}></p>
              <p className="uppercase text-gray-500 text-sm font-medium mx-4">
                Cash on Delivery
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm uppercase">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
