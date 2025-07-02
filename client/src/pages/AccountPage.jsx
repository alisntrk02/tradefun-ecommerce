import AccountInformation from "../components/AccountInformation";
import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";
function AccountPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryBar />
      <div className="flex-grow">
        <AccountInformation />
      </div>
      <Footer />
    </div>
  );
}

export default AccountPage;
