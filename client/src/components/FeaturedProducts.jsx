import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/products/featured"
      );
      setProducts(res.data.data);
    };
    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col items-center mt-20 py-5">
      <h1 className="text-4xl font-semibold mb-5">Featured Products</h1>
      <div className="w-128 border-b-4 border-blue-500 mb-10"></div>
      <div className="grid grid-cols-6 gap-20">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="w-[200px] flex-shrink-0 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-200 p-4"
          >
            <div className="w-full h-[150px] flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h1 className="mt-3 text-center text-base font-medium line-clamp-2 h-[48px]">
              {product.name}
            </h1>
            <p className="text-sm text-gray-700 text-center mt-1">
              ⭐ {product.rating?.toFixed(1) || "0"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
