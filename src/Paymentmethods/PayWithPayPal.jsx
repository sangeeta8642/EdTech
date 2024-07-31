// //Pay with Paypal
// import { useState, useEffect } from "react";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { useNavigate } from "react-router-dom";

// const PayWithPayPal = ({ setShow, show, amount }) => {
//   const [success, setSuccess] = useState(false);
//   const [orderID, setOrderID] = useState(null);
//   const nav = useNavigate();

//   const createOrder = (data, actions) => {
//     return actions.order
//       .create({
//         purchase_units: [
//           {
//             description: "Air Nike Pegasus 41 Electric",
//             amount: {
//               currency_code: "USD",
//               value: amount.toString(),
//             },
//           },
//         ],
//       })
//       .then((orderID) => {
//         setOrderID(orderID);
//         return orderID;
//       });
//   };

//   const onApprove = (data, actions) => {
//     return actions.order.capture().then(() => {
//       setSuccess(true);
//       setShow(false);
//       console.log("Order successful. Your order id is--", data.orderID);
//     });
//   };

//   useEffect(() => {
//     if (success && orderID) {
//       nav("/success");
//     }
//   }, [success, orderID, nav]);

//   return (
//     <PayPalScriptProvider
//       options={{
//         "client-id":
//           "AcCbkJmHdEFI38zPEq3vYVy7lrQsGIQ9va2osVxFy97jbXMNf0A7UdhZHLJ4in5-COcFkNaeFrNDi7EO",
//       }}
//     >
//       {show && !success ? (
//         <PayPalButtons
//           style={{ layout: "vertical" }}
//           createOrder={createOrder}
//           onApprove={onApprove}
//         />
//       ) : null}
//     </PayPalScriptProvider>
//   );
// };

// export default PayWithPayPal;
// src/components/PayWithPayPal.js



// import React from 'react';
// import usePayPal from './hooks/usePayPal';

// const PayWithPayPal = () => {
//   const { handleCreateOrder } = usePayPal();

//   const handlePay = async () => {
//     try {
//       const order = await handleCreateOrder();
//       if (order.id) {
//         window.location.href = order.links.find(link => link.rel === 'approve').href;
//       }
//     } catch (error) {
//       console.error('Error creating PayPal order:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handlePay}>
//         Pay with PayPal
//       </button>
//     </div>
//   );
// };

// export default PayWithPayPal;

// src/components/PayWithPayPal.js
// import React from 'react';
// import usePayPal from './hooks/usePayPal';
// import CapturePayment from './CapturePayment';

// const PayWithPayPal = ({handlePay }) => {

//   return (
//     <div>
//       <button onClick={handlePay}>
//         Pay with PayPal
//         {/* <CapturePayment/> */}
//       </button>
//     </div>
//   );
// };

// export default PayWithPayPal;

import React from 'react';
import axios from 'axios';

const PayPalButton = ({amount}) => {
  const [paymentId, setPaymentId] = React.useState(null);
  const [payerId, setPayerId] = React.useState(null);

  const handlePayment = async () => {
    try {
      // Request an access token
      const tokenResponse = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', 
        'grant_type=client_credentials', 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: 'AXZQLjA_3wIAn7mFP7BIlHLsjowyu0TL31inCkt0XSafQTEca-AQ6GUnlEn6XVYWX-sQ_WgKR2Di14OL',
            password: 'EBG38_32IFq3ypA8mHCcysBYayYtswN3VEW-YPGFGgebcmqiQlrLYo06_voSqpiPRPnnEsyfz00T8aLz',
          }
        }
      );

      const accessToken = tokenResponse.data.access_token;

      // Create Payment
      const paymentResponse = await axios.post('https://api-m.sandbox.paypal.com/v1/payments/payment', 
        {
          intent: 'sale',
          redirect_urls: {
            return_url: `${window.location.origin}/success`,
            cancel_url: `${window.location.origin}/cancel`,
          },
          payer: {
            payment_method: 'paypal',
          },
          transactions: [{
            amount: {
              total: amount,
              currency: 'USD',
            },
            description: 'Test transaction',
          }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          }
        }
      );

      const { id, links } = paymentResponse.data;
      setPaymentId(id);

      // Redirect user to PayPal for approval
      const approvalUrl = links.find(link => link.rel === 'approval_url').href;
      window.location.href = approvalUrl;

    } catch (error) {
      console.error('Payment failed', error);
    }
  };

  const handleSuccess = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const payerId = queryParams.get('PayerID');
      const paymentId = queryParams.get('paymentId');

      if (!payerId || !paymentId) return;

      // Request an access token
      const tokenResponse = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', 
        'grant_type=client_credentials', 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: 'AXZQLjA_3wIAn7mFP7BIlHLsjowyu0TL31inCkt0XSafQTEca-AQ6GUnlEn6XVYWX-sQ_WgKR2Di14OL',
            password: 'EBG38_32IFq3ypA8mHCcysBYayYtswN3VEW-YPGFGgebcmqiQlrLYo06_voSqpiPRPnnEsyfz00T8aLz',
          }
        }
      );

      const accessToken = tokenResponse.data.access_token;

      // Execute Payment
      await axios.post(`https://api-m.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, 
        { payer_id: payerId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          }
        }
      );

      console.log('Payment executed successfully');
      
    } catch (error) {
      console.error('Execution failed', error);
    }
  };

  // Handle the success callback
  React.useEffect(() => {
    if (window.location.pathname === '/success') {
      handleSuccess();
    }
  }, []);

  return (
    <button onClick={handlePayment} className='italic'>Pay with PayPal</button>
  );
};

export default PayPalButton;
