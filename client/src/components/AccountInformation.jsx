import axios from "axios";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function AccountInformation() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  if (!user) return <Loading />;

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/v1/users/logout", {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Account</h1>
      <div className="bg-white space-y-4 p-6 rounded shadow-md w-[300px]">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p
          onClick={handleLogout}
          className="text-center text-sm font-semibold cursor-pointer"
        >
          Logout
        </p>
      </div>
    </div>
  );
}

export default AccountInformation;
