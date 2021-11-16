import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router";
import CheckoutForm from "../Components/CheckoutForm";

const Payment = ({ id }) => {
  const location = useLocation();
  const { title } = location.state;
  const { price } = location.state;
  const { picture } = location.state;
  const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");
  console.log(location);
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm title={title} price={price} id={id} picture={picture} />
      </Elements>
    </>
  );
};

export default Payment;
