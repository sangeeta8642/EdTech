//Pay with Paypal
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
            description: "Air Nike Pegasus 41 Electric",
            amount: {
              currency_code: "USD",
              value: amount.toString(),
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
        "client-id":
          "AcCbkJmHdEFI38zPEq3vYVy7lrQsGIQ9va2osVxFy97jbXMNf0A7UdhZHLJ4in5-COcFkNaeFrNDi7EO",
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
