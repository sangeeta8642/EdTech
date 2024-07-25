import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PgA8B2Ny1hH9rMOtpJehsn4t9co11VxL3po9Xli4TRTXO2677L1Edt6LMk2be2Af60Sohz0uzhHgumNBagYC5EO00JzADife5');

const PayWithStripe = () => {
  const handleClick = async () => {
    const stripe = await stripePromise;
    
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'price_1PgMNo2Ny1hH9rMO1lEwES2Z', 
          quantity: 1,
        },
      ],
      mode: 'payment',
      successUrl: window.location.origin + '/success',
      cancelUrl: window.location.origin + '/cancel',
    });

    if (error) {
      console.error('Error redirecting to checkout:', error);
    }
  };

  return (
    <button role="link" onClick={handleClick} className='bg-green-600 w-full h-14 rounded-full text-white text-2xl italic font-semibold'>
       Stripe
    </button>
  );
};

export default PayWithStripe;
