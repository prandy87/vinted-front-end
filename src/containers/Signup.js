import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        { username: userName, email: email, password: passWord }
      );
      console.log(response.data);
      setUser(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte");
        alert(errorMessage ? errorMessage : "Cet email a déjà un compte");
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="signup-form">
          <h3>S'inscrire</h3>
          <form>
            <div className="sg-box">
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
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
            <button onClick={handleSubmit}>S'inscire</button>
          </form>
          <Link to={"/Login"}>
            <p className="reminder">Tu as déjà un compte ? Connecte-toi !</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
