import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router";
import CheckoutForm from "../Components/CheckoutForm";

const Payment = () => {
  const location = useLocation();
  //   const { title } = location.state;
  //   const { price } = location.state;
  const stripePromise = loadStripe("pk_live_aM4dCEo3abEVFfdFAlMTBNAV");
  console.log(location);
  return (
    <>
      <Elements stripe={stripePromise}>
        {/* <CheckoutForm title={title} price={price} /> */}
      </Elements>
    </>
  );
};

export default Payment;
