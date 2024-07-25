import { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const PayWithPayPal = ({ setShow, show }) => {
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
              value: "20", 
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
      setShow(false);});
  };

useEffect(() => {
    if (success && orderID) {
      nav("/success");
      console.log("Order successful. Your order id is--", orderID);
    }
  }, [success, orderID]);

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AcCbkJmHdEFI38zPEq3vYVy7lrQsGIQ9va2osVxFy97jbXMNf0A7UdhZHLJ4in5-COcFkNaeFrNDi7EO",
      }}
    >
      <div>
        <div className="wrapper"></div>
        <br />
        {show && !success ? (
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={createOrder}
              onApprove={onApprove}
            />
        ) : null}
      </div>
    </PayPalScriptProvider>
  );
};

export default PayWithPayPal;
