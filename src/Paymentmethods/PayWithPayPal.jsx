// // import { useState, useEffect } from "react";
// // import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// // import { useNavigate } from "react-router-dom";

// // const PayWithPayPal = ({ setShow, show }) => {
// //   const [success, setSuccess] = useState(false);
// //   const [orderID, setOrderID] = useState(null); 
// //   const nav = useNavigate();

// //   const createOrder = (data, actions) => {
// //     return actions.order
// //       .create({
// //         purchase_units: [
// //           {
// //             description: "Sunflower",
// //             amount: {
// //               currency_code: "USD",
// //               value: "20", 
// //             },
// //           },
// //         ],
// //       })
// //       .then((orderID) => {
// //         setOrderID(orderID);
// //         return orderID;
// //       });
// //   };

  
// //   const onApprove = (data, actions) => {
// //     return actions.order.capture().then(() => {
// //       setSuccess(true);
// //       setShow(false);});
// //   };

// // useEffect(() => {
// //     if (success && orderID) {
// //       nav("/success");
// //       console.log("Order successful. Your order id is--", orderID);
// //     }
// //   }, [success, orderID]);

// //   return (
// //     <PayPalScriptProvider
// //       options={{
// //         "client-id":
// //           "AcCbkJmHdEFI38zPEq3vYVy7lrQsGIQ9va2osVxFy97jbXMNf0A7UdhZHLJ4in5-COcFkNaeFrNDi7EO",
// //       }}
// //     >
// //       <div>
// //         <div className="wrapper"></div>
// //         <br />
// //         {show && !success ? (
// //             <PayPalButtons
// //               style={{ layout: "vertical" }}
// //               createOrder={createOrder}
// //               onApprove={onApprove}
// //             />
// //         ) : null}
// //       </div>
// //     </PayPalScriptProvider>
// //   );
// // };

// // export default PayWithPayPal;

// import { useState, useEffect } from "react";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { useNavigate } from "react-router-dom";
// import { fetchCoupon, validateCoupon, applyDiscount } from '../components/couponUtils';

// const PayWithPayPal = ({ setShow, show,amount }) => {
//   const [success, setSuccess] = useState(false);
//   const [orderID, setOrderID] = useState(null);
//   const [discountedAmount, setDiscountedAmount] = useState(20); // Original amount
//   const [couponCode, setCouponCode] = useState("");
//   const [error, setError] = useState("");
//   const nav = useNavigate();

//   const handleCouponApply = async () => {
//     try {
//       setError(""); // Reset any previous errors
//       if (couponCode) {
//         const coupon = await fetchCoupon(couponCode);
//         validateCoupon(coupon);
//         const newAmount = applyDiscount(20, coupon.discount); // Apply discount on original amount
//         setDiscountedAmount(newAmount);
//       } else {
//         setError("Please enter a valid coupon code.");
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const createOrder = (data, actions) => {
//     return actions.order
//       .create({
//         purchase_units: [
//           {
//             description: "Sunflower",
//             amount: {
//               currency_code: "USD",
//               value: {amount}, // Use the discounted amount
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
//     });
//   };

//   useEffect(() => {
//     if (success && orderID) {
//       nav("/success");
//       console.log("Order successful. Your order id is--", orderID);
//     }
//   }, [success, orderID, nav]);

//   return (
//     <div>
//       {/* <div>
//         <input
//           type="text"
//           value={couponCode}
//           onChange={(e) => setCouponCode(e.target.value)}
//           placeholder="Enter coupon code"
//         />
//         <button onClick={handleCouponApply}>Apply Coupon</button>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div> */}
//       <PayPalScriptProvider
//         options={{
//           "client-id": "AcCbkJmHdEFI38zPEq3vYVy7lrQsGIQ9va2osVxFy97jbXMNf0A7UdhZHLJ4in5-COcFkNaeFrNDi7EO",
//         }}
//       >
//         {show && !success ? (
//           <PayPalButtons
//             style={{ layout: "vertical" }}
//             createOrder={createOrder}
//             onApprove={onApprove}
//           />
//         ) : null}
//       </PayPalScriptProvider>
//     </div>
//   );
// };

// export default PayWithPayPal;

import { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const PayWithPayPal = ({ setShow, show, amount }) => {
  const [success, setSuccess] = useState(false);
  const [orderID, setOrderID] = useState(null);
  const nav = useNavigate();

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: amount.toString(), // Ensure amount is a string
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(() => {
      setSuccess(true);
      setShow(false);
      console.log("Order successful. Your order id is--", data.orderID);
    });
  };

  useEffect(() => {
    if (success && orderID) {
      nav("/success");
    }
  }, [success, orderID, nav]);

  return (
    <PayPalScriptProvider
      options={{
        "client-id": "AcCbkJmHdEFI38zPEq3vYVy7lrQsGIQ9va2osVxFy97jbXMNf0A7UdhZHLJ4in5-COcFkNaeFrNDi7EO",
      }}
    >
      {show && !success ? (
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      ) : null}
    </PayPalScriptProvider>
  );
};

export default PayWithPayPal;
