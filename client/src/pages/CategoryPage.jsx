import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import CategoryBar from "../components/CategoryBar";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import Footer from "../components/Footer";

function CategoryPage() {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState();
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const query = searchParams.toString();

    axios
      .get(
        `http://localhost:3000/api/v1/categorys/${categoryId}/products?${query}`
      )
      .then((res) => setProducts(res.data.data.data))
      .catch((err) => console.error(err));

    axios
      .get(`http://localhost:3000/api/v1/categorys/${categoryId}`)
      .then((res) => setCategoryName(res.data.data.data.name))
      .catch((err) => console.error(err));
  }, [categoryId, searchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryBar />
      <div className="flex  flex-grow">
        <FilterBar />
        <ProductCard products={products} categoryName={categoryName} />
      </div>
      <Footer />
    </div>
  );
}

export default CategoryPage;
