import { useEffect, useState } from "react";
import Loading from "./Loading";

function OrderInformation() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/v1/orders/myorders",
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Siparişler alınamadı.");
        }

        const data = await res.json();
        setOrders(data.data?.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Loading />;

  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  if (orders.length === 0) {
    return (
      <div className="flex justify-center mt-5">
        <p className="text-2xl">You don't have any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Your Orders</h2>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 shadow-md rounded-lg p-6"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Order #{order._id.slice(-8).toUpperCase()}
                </h3>
                <p className="text-sm text-gray-500">
                  Placed on{" "}
                  {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                </p>
              </div>

              <div className="text-sm text-gray-600">
                <p>
                  <span className="font-medium">Shipping to:</span>{" "}
                  {order.shippingAddress?.address},{" "}
                  {order.shippingAddress?.city}
                </p>
              </div>

              <div className="text-sm">
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`${
                      order.isDelivered ? "text-green-600" : "text-yellow-600"
                    } font-semibold`}
                  >
                    {order.isDelivered ? "Delivered" : "Processing"}
                  </span>
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-xl font-bold text-green-700">
                  {order.totalPrice.toFixed(2)}$
                </p>
              </div>
            </div>

            <hr className="my-4" />

            <div className="space-y-3">
              {order.orderItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-gray-800"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.qty}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">{item.price}$</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderInformation;
