import { Link, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Menu = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/users/logout");
      console.log("successfully logged out");
      localStorage.removeItem("loggedIn"); // Remove login state from localStorage
      setLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <div className="bg-gatorsBlue text-white flex justify-between items-center py-5">
      <h1 className="text-3xl ml-4 cursor-pointer" onClick={handleLogoClick}>
        Gator Resales
      </h1>
      <nav>
        <ul className="text-xl flex space-x-10 mx-4">
          <li className="rounded-md transition delay-75 ease-in hover:bg-blue-700 p-3">
            <Link to="/">Home</Link>
          </li>
          <li className="rounded-md transition delay-75 ease-in hover:bg-blue-700 p-3">
            <Link to="/buy">Buy</Link>
          </li>
          <li className="rounded-md transition delay-75 ease-in hover:bg-blue-700 p-3">
            <Link to="/sell">Sell</Link>
          </li>
          {!loggedIn ? (
            <>
              <li className="rounded-md transition delay-75 ease-in hover:bg-blue-700 p-3">
                <Link to="/login">Sign in</Link>
              </li>
              <li className="rounded-md transition delay-75 ease-in hover:bg-blue-700 p-3">
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <li className="rounded-md transition delay-75 ease-in hover:bg-gatorsOrange p-3">
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
