import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";

const CheckoutForm = ({ title, price, picture, id }) => {
  const stripe = useStripe();
  const element = useElements();
  const userId = id;
  const navigate = useNavigate();

  const [completed, setCompleted] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cardElement = element.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: userId,
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        { token: stripeToken, title: title, amount: price }
      );
      console.log(response.data);
      if (response.data.status === "succeeded") {
        setCompleted("Paiement validé");
        alert("Paiement validé");
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="container bg-form">
        <h3>
          Acheter cet article : <img src={picture} alt="" />
        </h3>
        <div className="right-box">
          <h4>
            {title} : {price} €
          </h4>

          <h3>Frais de protection acheteurs : </h3>
          <h3>Frais de port : </h3>
          <h2>Total : {price} €</h2>
          <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit">Régler ma commande</button>
            <span>{completed}</span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
