import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isUserActive, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  };

  if (isUserActive === true) {
    return (
      <div className="navbar-wrapper">
        <div className="navbar">
          <Link className="navbar-link" to="/">
            Home
          </Link>
          <Link className="navbar-link" to="/games">
            Games Gallery
          </Link>
          <Link className="navbar-link" to="/my-profile">
            My profile
          </Link>
          <button className="button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar-wrapper">
        <div className="navbar">
          <Link className="navbar-link" to="/">
            Home
          </Link>
          <Link className="navbar-link" to="/games">
            Games Gallery
          </Link>
          <div className="access-btns">
            <Link className="navbar-link" to="/signup">
              Registro
            </Link>
            <Link className="navbar-link" to="/login">
              Acceder
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
