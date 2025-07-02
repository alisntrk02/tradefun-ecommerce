import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext";
import Loading from "./Loading";
import SearchBar from "./SearchBar";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideSearch = ["/login", "/register"].includes(location.pathname);
  const { user, loading } = useUser();

  const handleSearch = (query) => {
    if (query.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };
  if (loading) return <Loading />;

  return (
    <div className=" bg-[#0f1622]">
      <nav className="flex px-4 py-3 justify-between items-center">
        <div className="text-2xl text-white">
          <a className="font-semibold" href="/">
            TradeFun
          </a>
        </div>

        {!hideSearch && (
          <>
            <div>
              <SearchBar onSearch={handleSearch} />
            </div>

            <div>
              <ul className="flex items-center gap-6 text-white font-medium">
                <li>
                  {user ? (
                    <Link
                      to="/account"
                      className="hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                    >
                      {user.name}
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                    >
                      Login
                    </Link>
                  )}
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    Returns/Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className=" hover:text-blue-400 transition-colors duration-200"
                  >
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}

export default Header;
