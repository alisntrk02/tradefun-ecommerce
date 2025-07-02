import CategoryBar from "../components/CategoryBar";
import PopularProducts from "../components/PopularProducts";
import Header from "./../components/Header";
import NewArrivals from "../components/NewArrivals";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";

function MainPage() {
  return (
    <div>
      <Header />
      <CategoryBar />
      <PopularProducts />
      <NewArrivals />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}

export default MainPage;
