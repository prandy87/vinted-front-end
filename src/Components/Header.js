import { Link } from "react-router-dom";
import logo from "../Assets/Images/Vinted-logo.svg.png";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { Range } from "react-range";

class SuperSimple extends React.Component {
  state = { values: [50] };
  render() {
    return (
      <Range
        step={0.1}
        min={0}
        max={100}
        values={this.state.values}
        onChange={(values) => this.setState({ values })}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "100%",
              backgroundColor: "#ccc",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "42px",
              width: "42px",
              backgroundColor: "#999",
            }}
          />
        )}
      />
    );
  }
}

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
        <div className={SuperSimple}></div>
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
            <span className="deconnect-btn">
              <button
                onClick={() => {
                  setUser(null);
                  navigate("/");
                }}
              >
                Se déconnecter
              </button>
            </span>
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
        {token ? (
          <Link to={"/publish"}>
            <button>Vends tes articles !</button>
          </Link>
        ) : (
          <Link to={"/login"}>
            <button>Vends tes articles</button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Header;
