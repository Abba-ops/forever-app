import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Orders() {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    if (!token) {
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allOrders = response.data.data.flatMap((order) =>
          order.items.map((item) => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.createdAt,
          }))
        );

        setOrderData(allOrders.reverse());
      } else {
        toast.error("Failed to load orders. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching your orders.");
    }
  };

  useEffect(() => {
    if (!token) {
      toast.warn("Please log in to view your orders.");
    } else {
      loadOrderData();
    }
  }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="border-t pt-16">
      <Title text1="My" text2="Orders" />
      <div>
        {orderData.map((product, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-6 text-sm">
              <img
                alt="product"
                src={product.image[0]}
                className="w-16 sm:w-20"
              />
              <div>
                <p className="sm:text-base font-medium">{product.name}</p>
                <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                  <p>
                    {currency}
                    {product.price}
                  </p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Size: {product.size}</p>
                </div>
                <p className="mt-1">
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(product.date).toDateString()}
                  </span>
                </p>
                <p className="mt-1">
                  Payment Method:{" "}
                  <span className="text-gray-400">{product.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p
                  className={`min-w-2 h-2 rounded-full ${
                    product.status === "Delivered"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}></p>
                <p className="text-sm md:text-base">{product.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className="border px-4 py-2 text-sm font-medium rounded-sm">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
