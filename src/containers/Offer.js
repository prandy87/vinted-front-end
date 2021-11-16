import { Link } from "react-router-dom";
import axios from "axios";

import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const Offer = ({ token }) => {
  const { id } = useParams();

  const [data, setData] = useState();
  const [isLoadind, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoadind ? (
    <span>Chargement en cours...</span>
  ) : (
    <>
      <div className="offer">
        <div className="left-box">
          <img
            src={data.product_pictures.map((elem) => {
              return elem.secure_url;
            })}
            alt="current-product-larger"
          />
        </div>
        <div className="right-box">
          <div>
            <h2>{data.product_price} €</h2>

            <div className="product-details">
              {data.product_details.map((elem, index) => {
                const keys = Object.keys(elem);
                return (
                  <>
                    <p key={index}>
                      <span>{keys[0]}</span> : {elem[keys[0]]}
                    </p>
                  </>
                );
              })}
            </div>
            <div className="product-details">
              <h3>{data.product_name}</h3>
              <p>{data.product_description}</p>
              <div>{data.owner.account.username}</div>
            </div>
            <div>
              {token ? (
                <Link
                  to={"/payment"}
                  state={{
                    title: data.product_name,
                    price: data.product_price,
                    picture: data.product_pictures.secure_url,
                  }}
                >
                  <button>Acheter</button>
                </Link>
              ) : (
                <Link to={"/login"}>
                  <button>Acheter</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offer;
