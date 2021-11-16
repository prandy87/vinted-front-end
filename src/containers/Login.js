import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser, setId }) => {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        { email: email, password: passWord }
      );

      if (response.data.token) {
        setUser(response.data.token);
        navigate("/publish");
        setId(response.data._id);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="signup-form">
          <h3>Se Connecter</h3>
          <form>
            <div className="sg-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="sg-box">
              <input
                type="text"
                placeholder="Mot de passe"
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Se Connecter</button>
          </form>
          <Link to={"/signup"}>
            <p className="reminder">Pas encore de compte ? Inscris-toi !</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
