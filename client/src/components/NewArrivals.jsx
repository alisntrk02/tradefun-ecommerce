import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function NewArrivals() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchNew = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/products/new-arrivals"
      );
      setProducts(res.data.data);
    };

    fetchNew();
  }, []);

  return (
    <div className="px-5 py-5">
      <h1 className="font-medium text-2xl mb-4">New Arrivals</h1>
      <div className="flex space-x-15 overflow-x-auto">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="w-[160px] flex-shrink-0 bg-white border ml-5 border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-3"
          >
            <div className="w-full h-[120px] flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h1 className="text-sm font-medium mt-2 line-clamp-2 h-[40px]">
              {product.name}
            </h1>
            <p className="text-xs text-gray-600 mt-1">
              ⭐ {product.rating?.toFixed(1) || "0"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NewArrivals;
