import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";

function SearchPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    if (!query) {
      setProducts([]);
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:3000/api/v1/products`, {
        params: {
          name: query,
        },
      })
      .then((res) => {
        setProducts(res.data.data.data);
      })
      .catch((error) => {
        console.error("Arama hatası:", error);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryBar />
      <div className="flex-grow p-5">
        {loading && <p>Loading...</p>}
        {!loading && products.length === 0 && (
          <div className="flex justify-center items-center ">
            <p className="text-xl text-[#585858]">Product not found.</p>
          </div>
        )}

        {products.length > 0 && (
          <ProductCard
            products={products}
            categoryName={`Search results for "${query}"`}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SearchPage;
