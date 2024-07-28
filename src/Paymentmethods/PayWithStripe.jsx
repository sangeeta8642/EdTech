// import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_51PgA8B2Ny1hH9rMOtpJehsn4t9co11VxL3po9Xli4TRTXO2677L1Edt6LMk2be2Af60Sohz0uzhHgumNBagYC5EO00JzADife5');

// const PayWithStripe = () => {
//   const handleClick = async () => {
//     const stripe = await stripePromise;

//     const { error } = await stripe.redirectToCheckout({
//       lineItems: [
//         {
//           price: 'price_1PgMNo2Ny1hH9rMO1lEwES2Z',
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       successUrl: window.location.origin + '/success',
//       cancelUrl: window.location.origin + '/cancel',
//     });

//     if (error) {
//       console.error('Error redirecting to checkout:', error);
//     }
//   };

//   return (
//     <button role="link" onClick={handleClick} className='bg-green-600 w-full h-14 rounded-full text-white text-2xl italic font-semibold'>
//        Stripe
//     </button>
//   );
// };

// export default PayWithStripe;

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  fetchCoupon,
  validateCoupon,
  applyDiscount,
} from "../components/couponUtils";

// const stripePromise = loadStripe('your_stripe_public_key');
const stripePromise = loadStripe(
  "pk_test_51PgA8B2Ny1hH9rMOtpJehsn4t9co11VxL3po9Xli4TRTXO2677L1Edt6LMk2be2Af60Sohz0uzhHgumNBagYC5EO00JzADife5"
);

const PayWithStripe = ({ product }) => {
  // const [amount, setAmount] = useState(20); // Original amount
  const [couponCode, setCouponCode] = useState("");
  // const [product, setProduct] = useState("");
  const [error, setError] = useState("");

  // useEffect(() => {
  //   // Update the product price ID based on the coupon application state
  //   if (coupon) {
  //     setProduct("price_1PhPRN2Ny1hH9rMOyfTKvlCt");
  //   } else {
  //     setProduct("price_1PhPZV2Ny1hH9rMOKWbGeEr2");
  //   }
  // }, [coupon]); 

  const handleCouponApply = async () => {
    try {
      setError(""); // Reset any previous errors
      if (couponCode) {
        const coupon = await fetchCoupon(couponCode);
        validateCoupon(coupon);
        const newAmount = applyDiscount(amount, coupon.discount);
        setAmount(newAmount);
      } else {
        setError("Please enter a valid coupon code.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClick = async () => {
    const stripe = await stripePromise;

    // const priceId = coupon? "price_1PhPZV2Ny1hH9rMOKWbGeEr2" : "price_1PhPRN2Ny1hH9rMOyfTKvlCt"

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: product,
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: window.location.origin + "/success",
      cancelUrl: window.location.origin + "/cancel",
    });

    if (error) {
      console.error("Error redirecting to checkout:", error);
    }
  };

  return (
    <div>
      {/* <input
        type="text"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        placeholder="Enter coupon code"
      />
      <button onClick={handleCouponApply}>Apply Coupon</button>
      {error && <p style={{ color: "red" }}>{error}</p>} */}
      <button
        role="link"
        onClick={handleClick}
        className="bg-green-600 w-full h-14 rounded-full text-white text-2xl italic font-semibold hover:bg-white hover:text-green-600 hover:border-2 hover:border-green-600"
      >
        Pay with Stripe
      </button>
    </div>
  );
};

export default PayWithStripe;
