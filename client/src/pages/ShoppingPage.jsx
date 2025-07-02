import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Shopping from "../components/Shopping";

function ShoppingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryBar />
      <div className="flex-grow">
        <Shopping />
      </div>
      <Footer />
    </div>
  );
}

export default ShoppingPage;
