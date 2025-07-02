import { Link } from "react-router-dom";

function ProductCard({ products, categoryName }) {
  if (!products || products.length === 0)
    return (
      <div className="flex justify-center flex-grow mt-10">
        <h1 className="text-2xl text-center">There is no product!</h1>
      </div>
    );
  return (
    <div className="px-5 py-5">
      <h1 className="font-medium text-2xl mb-4">{categoryName}</h1>
      <div className="grid grid-cols-6 gap-10 space-x-10 ">
        {products?.map((product) => (
          <Link
            to={`/products/${product._id}`}
            key={product._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer min-w-[220px] max-w-[220px] flex flex-col p-4 mx-2"
          >
            <div className="flex justify-center items-center h-40 mb-4">
              <img
                className="max-h-full object-contain"
                src={product.image}
                alt={product.name}
              />
            </div>
            <h2 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h2>
            <p className="text-lg font-bold text-yellow-600 mb-1">
              ${product.price}
            </p>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-yellow-400 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.463a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.463c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L3.607 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
              <span className="text-gray-700 text-sm">
                {product.rating?.toFixed(1) || "0"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
