import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";
import photo from "../Assets/Images/banner-wide.jpeg";

const Home = ({ title, setTitle, token }) => {
  const [data, setData] = useState();
  const [isLoadind, setIsLoading] = useState(true);

  const setFilter = (title) => {
    let titleGo = `?title=${title}`;
    // let priceMinGo = `priceMin=${priceMin}`;
    // let priceMaxGo = `priceMax=${priceMax}`;

    return titleGo;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/" + setFilter(title)
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [title]);

  return isLoadind ? (
    <span>Chargement en cours...</span>
  ) : (
    <>
      <div className="banner">
        <img src={photo} alt="" />
        <img
          src="https://www.vinted.fr/assets/hero-block/tear-d431548c90905ad757632e4c3075d9473e38c7c6642721efeae9413afb9387a2.svg"
          alt=""
        />
        <div className="banner-box">
          <h2>Prêts à faire du tri dans vos placards ?</h2>
          {token ? (
            <Link to={"/publish"}>
              <button>Vends maintenant</button>
            </Link>
          ) : (
            <Link to={"/signup"}>
              <button>Vends maintenant</button>
            </Link>
          )}

          <p>Découvrir comment ça marche</p>
        </div>
      </div>

      <div className="container">
        <div>
          <h2>Articles </h2>
          <div>
            <div className="products">
              {data.offers.map((elem, index) => {
                return (
                  <>
                    <Link to={`/offer/${elem._id}`}>
                      <span className="user-name-top">
                        <img src={elem.owner.account.avatar} alt="" />{" "}
                        {elem.owner.account.username}
                      </span>
                      <div key={elem._id} className="product-box">
                        <img src={elem.product_image} alt="product-small" />

                        <div>
                          <div className="price">{elem.product_price} €</div>
                          <div className="desc">{elem.product_name}</div>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
