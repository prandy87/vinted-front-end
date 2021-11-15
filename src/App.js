import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Offer from "./containers/Offer";
import Header from "./Components/Header";
import NoMatch from "./containers/NoMatch";
import Login from "./containers/Login";
import Publish from "./containers/Publish";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState();
  const [priceMax, setPriceMax] = useState();

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token);
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  const setFilter = (title) => {
    let titleGo = `?title=${title}`;
    // let priceMinGo = `priceMin=${priceMin}`;
    // let priceMaxGo = `priceMax=${priceMax}`;

    return title !== "" ? titleGo : "";
  };

  return (
    <Router>
      <Header
        token={token}
        setUser={setUser}
        title={title}
        setTitle={setTitle}
      />

      <Routes>
        <Route path="/" element={<Home />} setFilter={setFilter} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/publish"
          element={<Publish setUser={setUser} token={token} />}
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
