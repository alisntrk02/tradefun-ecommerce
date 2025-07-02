import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Payment() {
  const { cartItems, clearCart } = useCart();
  const [form, setForm] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems, navigate]);

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const taxPrice = Number((itemsPrice * 0.18).toFixed(2));
  const totalPrice = itemsPrice + taxPrice;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const inputFields = [
    { name: "address", placeholder: "Address" },
    { name: "city", placeholder: "City" },
    { name: "postalCode", placeholder: "Postal Code" },
    { name: "country", placeholder: "Country" },
  ];

  const handlePayment = async () => {
    const requiredFields = ["address", "city", "postalCode", "country"];
    for (let field of requiredFields) {
      if (!form[field]) {
        alert("Please fill in all required fields.");
        return;
      }
    }

    setLoading(true);

    const body = {
      orderItems: cartItems.map((item) => ({
        name: item.product.name,
        qty: item.quantity,
        image: item.product.image,
        price: item.product.price,
        product: item.product._id,
      })),
      shippingAddress: {
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country,
      },
      paymentMethod: "Credit Card",
      itemsPrice,
      taxPrice,
      totalPrice,
    };

    try {
      const res = await fetch("http://localhost:3000/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        clearCart();
        navigate("/");
      } else {
        alert("Order could not be created: " + data.message);
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("An error occurred during payment. Please try again.");
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl font-semibold text-green-600">
          Payment Successful!
        </h2>
        <p>
          Your order has been placed. It will be delivered within 5 minutes.
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <div className="space-y-3">
            {inputFields.map((field) => (
              <input
                key={field.name}
                name={field.name}
                placeholder={field.placeholder}
                className="w-full p-2 border rounded"
                onChange={handleChange}
              />
            ))}
          </div>

          <div className="flex items-center justify-between mt-6">
            <h3 className="font-semibold text-lg">Your Cart:</h3>
            <h3 className="font-semibold text-lg">
              Total: {totalPrice.toFixed(2)}$
            </h3>
          </div>

          <ul className="divide-y mt-2">
            {cartItems.map((item) => (
              <li key={item.product._id} className="py-2 flex justify-between">
                <span>
                  {item.product.name} x{item.quantity}
                </span>
                <span>{(item.product.price * item.quantity).toFixed(2)}$</span>
              </li>
            ))}
          </ul>

          <div className="mt-2 text-sm text-gray-700">
            <span className="font-semibold">Tax (18%):</span>{" "}
            {taxPrice.toFixed(2)}$
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Processing Payment..." : "Complete Payment"}
          </button>
        </div>

        <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-lg relative">
          <h3 className="text-lg mb-4 font-semibold">Card Preview</h3>

          <div className="bg-gradient-to-r from-[#2e2e2e] to-[#5b5b5b] p-5 rounded-xl h-56 flex flex-col justify-between shadow-inner">
            <div className="flex justify-between text-xs opacity-70">
              <span>Card Number</span>
              <span>CVC</span>
            </div>
            <div className="text-lg tracking-widest font-mono">
              **** **** **** 1234
            </div>
            <div className="flex justify-between text-sm">
              <div>JOHN DOE</div>
              <div>12/27</div>
            </div>
          </div>

          <p className="text-sm text-gray-400 mt-4 italic">
            *This is a fake card preview. No actual payment info is needed.
          </p>
        </div>
      </div>
    </>
  );
}

export default Payment;
