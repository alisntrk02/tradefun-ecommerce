import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import OrderInformation from "../components/OrderInformation";

function OrdersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryBar />
      <div className="flex-grow">
        <OrderInformation />
      </div>
      <Footer />
    </div>
  );
}

export default OrdersPage;
