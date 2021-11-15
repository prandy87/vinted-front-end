import { Link } from "react-router-dom";
import logo from "../Assets/Images/Vinted-logo.svg.png";
import { useNavigate } from "react-router-dom";

const Header = ({ token, setUser, setTitle }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="header">
        <span className="logo-container">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </span>
        <span>
          <input
            className="header-search-bar"
            type="text"
            placeholder="Recherche des articles"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </span>
        <span>
          {token ? (
            <button
              onClick={() => {
                setUser(null);
                navigate("/");
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <Link to={"/login"}>
                <button>Se connecter</button>
              </Link>
              <Link to={"/signup"}>
                <button>S'Inscrire</button>
              </Link>
            </>
          )}
        </span>
        <Link to={"/publish"}>
          <button>Vends tes articles !</button>
        </Link>
      </div>
    </>
  );
};

export default Header;
