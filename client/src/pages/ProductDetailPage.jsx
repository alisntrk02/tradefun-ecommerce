import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetail from "../components/ProductDetail";
import Header from "./../components/Header";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";

function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/products/${id}`)
      .then((res) => setProduct(res.data.data.data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div>
      <Header />
      <CategoryBar />
      <ProductDetail product={product} />
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
