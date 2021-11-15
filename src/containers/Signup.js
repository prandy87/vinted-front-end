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
        alert(errorMessage);
      }
    }
  };

  return (
    <>
      <div className="container">
        <h3>S'inscrire</h3>
        <div className="form">
          <form action="">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Mot de passe"
              value={passWord}
              onChange={(e) => setPassWord(e.target.value)}
            />
            <button onClick={handleSubmit}>S'inscire</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
