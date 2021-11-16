import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ title, price }) => {
  const stripe = useStripe();
  const element = useElements();

  return (
    <div>
      <div className="container bg-form">
        <h3>Acheter cet article :</h3>
        <div className="right-box">
          <h4>Produit : {title}</h4>
          <h4>Prix : {price}</h4>
          <h4>Total : </h4>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
