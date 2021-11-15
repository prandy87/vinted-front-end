import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import photo from "../Assets/Images/banner-wide.jpeg";

const Home = ({ setFilter }) => {
  const [data, setData] = useState();
  const [isLoadind, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoadind ? (
    <span>Chargement en cours...</span>
  ) : (
    <>
      <div className="banner">
        <img src={photo} alt="" />
        <div className="banner-box">
          <h2>Prêts à faire du tri dans vos placards ?</h2>
          <button>Vends maintenant</button>
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
                  <Link to={`/offer/${elem._id}`}>
                    <div key={elem._id} className="product-box">
                      <img
                        src={elem.product_image.secure_url}
                        alt="product-small"
                      />

                      <div>
                        <span>{elem.product_name}</span>
                        <span>{elem.product_price}</span>
                      </div>
                    </div>
                  </Link>
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
