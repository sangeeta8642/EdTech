import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PropTypes from 'prop-types';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe("pk_test_51PgA8B2Ny1hH9rMOtpJehsn4t9co11VxL3po9Xli4TRTXO2677L1Edt6LMk2be2Af60Sohz0uzhHgumNBagYC5EO00JzADife5");

function StripeProvider({ children }) {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}

// Add PropTypes validation
StripeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StripeProvider;
