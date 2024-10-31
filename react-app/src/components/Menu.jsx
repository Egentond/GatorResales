import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';


const Menu = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('/users/logout')
    } catch(error) {
      console.error(error);
    }

    setLoggedIn(false); // Log out the user by setting it to false
    navigate('/'); // Redirect to home page when the user gets logged out
  };

  return (
    <div className="bg-gatorsBlue text-white flex justify-between items-center py-5">
      <h1 className="text-3xl ml-4">Gator Resales</h1>
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
            <li className="rounded-md transition delay-75 ease-in hover:bg-red-700 p-3">
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
