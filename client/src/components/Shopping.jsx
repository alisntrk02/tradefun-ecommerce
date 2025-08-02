import { useCart } from "../context/CartContext";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
function Shopping() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      item.product && item.product.price
        ? acc + item.product.price * item.quantity
        : acc,
    0
  );

  if (cartItems.length === 0)
    return <h1 className="text-center text-2xl mt-20">Your cart is empty!</h1>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>
        <p
          onClick={clearCart}
          className="w-fit mb-5 font-semibold cursor-pointer text-[#2162a1]"
        >
          Diselect all the products
        </p>
      </div>
      <hr />

      <div className="space-y-6">
        {cartItems.map((item) => {
          if (!item.product) return null;
          return (
            <div
              key={item.product._id}
              className="flex items-center gap-6 p-4 bg-white rounded-lg shadow-md"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-24 h-24 object-contain rounded-md border"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.product.name}</h2>
                <p
                  className={`text-sm font-semibold ${
                    item.product.countInStock > 0
                      ? "text-green-400"
                      : "text-red-600"
                  }`}
                >
                  {item.product.countInStock > 0 ? "In stock" : "Out of stock"}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  {item.quantity > 1 ? (
                    <button
                      onClick={() => decreaseQuantity(item.product)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      &lt;
                    </button>
                  ) : (
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="text-red-500 hover:text-red-700 text-lg"
                    >
                      <TrashIcon className="h-5 w-5  text-black" />
                    </button>
                  )}
                  <span className="text-md font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.product)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    &gt;
                  </button>
                </div>
                <p className="text-md font-medium mt-1">
                  {item.product.price} $
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 p-4 bg-gray-100 rounded-lg shadow-inner flex justify-between items-center">
        <h2 className="text-xl font-semibold">Total:</h2>
        <p className="text-xl font-bold">{totalPrice.toFixed(2)} $</p>
      </div>

      <div className="flex justify-center mt-10">
        <Link
          to="/payment"
          className="bg-green-500 rounded-full py-2 px-5 text-white font-semibold cursor-pointer"
        >
          Pay
        </Link>
      </div>
    </div>
  );
}

export default Shopping;
