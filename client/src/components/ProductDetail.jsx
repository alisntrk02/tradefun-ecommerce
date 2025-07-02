import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

import Loading from "./Loading";
import { useUser } from "../context/UserContext";

function ProductDetail({ product }) {
  const { addToCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  if (!product) return <Loading />;

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="max-w-2xl  mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-[400px] h-[400px] object-contain rounded-md shadow-md"
          />
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="flex items-center space-x-4">
            <p className="text-2xl text-gray-800 font-semibold flex items-baseline">
              {product.price}
              <span className="text-sm ml-1">$</span>
            </p>
            <p
              className={`text-md font-semibold ${
                product.countInStock > 0 ? "text-green-500" : "text-red-600"
              }`}
            >
              {product.countInStock > 0 ? "In stock" : "Out of stock"}
            </p>
          </div>
          <p className="text-sm text-gray-600">
            ⭐ ({product.rating || "(0)"})
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-20 bg-[#ff7b00] text-white font-medium py-2 px-8 rounded cursor-pointer"
          >
            🛒 Add to cart
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2">Product Description</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );
}

export default ProductDetail;
