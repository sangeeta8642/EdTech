// import { useState, useEffect } from "react";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// const PayPalButton = () => {
//     const [show, setShow] = useState(false);
//     const [success, setSuccess] = useState(false);
//     const [orderID, setOrderID] = useState(null); // Change default value to null

//     // Creates a PayPal order
//     const createOrder = (data, actions) => {
//         return actions.order.create({
//             purchase_units: [
//                 {
//                     description: "Sunflower",
//                     amount: {
//                         currency_code: "USD",
//                         value: "20", // Make sure value is a string
//                     },
//                 },
//             ],
//         }).then((orderID) => {
//             setOrderID(orderID);
//             return orderID;
//         });
//     };

//     // Check Approval
//     const onApprove = (data, actions) => {
//         return actions.order.capture().then(() => {
//             setSuccess(true);
//         });
//     };

//     // Use useEffect with orderID as a dependency
//     useEffect(() => {
//         if (success && orderID) {
//             alert("Payment successful!!");
//             console.log('Order successful. Your order id is--', orderID);
//         }
//     }, [success, orderID]); // Add orderID to dependencies

//     return (
//         <PayPalScriptProvider options={{ "client-id": "AcCbkJmHdEFI38zPEq3vYVy7lrQsGIQ9va2osVxFy97jbXMNf0A7UdhZHLJ4in5-COcFkNaeFrNDi7EO" }}>
//             <div>
//                 <div className="wrapper">
//                     <div className="product-img">
//                         <img
//                             src="https://cdn.pixabay.com/photo/2021/08/15/06/54/sunflower-6546993_1280.jpg"
//                             alt="SunFlower"
//                             height="320"
//                             width="300" />
//                     </div>
//                     <div className="product-info">
//                         <div className="product-text">
//                             <h1>Sunflower</h1>
//                         </div>
//                         <div className="product-price-btn">
//                             <p>$20</p>
//                             <br></br>
//                             <button className='buy-btn' type="button" onClick={() => setShow(true)}>
//                                 Buy now
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <br></br>
//                 {show ? (
//                     <PayPalButtons
//                         style={{ layout: "vertical" }}
//                         createOrder={createOrder}
//                         onApprove={onApprove}
//                     />
//                 ) : null}
//             </div>
//         </PayPalScriptProvider>
//     );
// }

// export default PayPalButton;
import { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayWithPayPal = ({setShow, show}) => {
   
    const [success, setSuccess] = useState(false);
    const [orderID, setOrderID] = useState(null); // Change default value to null

    // Creates a PayPal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "Sunflower",
                    amount: {
                        currency_code: "USD",
                        value: "20", // Make sure value is a string
                    },
                },
            ],
        }).then((orderID) => {
            setOrderID(orderID);
            return orderID;
        });
    };

    // Check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(() => {
            setSuccess(true);
            setShow(false); // Hide the PayPal buttons after success
        });
    };

    // Use useEffect with orderID as a dependency
    useEffect(() => {
        if (success && orderID) {
            alert("Payment successful!!");
            console.log('Order successful. Your order id is--', orderID);
        }
    }, [success, orderID]); // Add orderID to dependencies

    return (
        <PayPalScriptProvider options={{ "client-id": "AcCbkJmHdEFI38zPEq3vYVy7lrQsGIQ9va2osVxFy97jbXMNf0A7UdhZHLJ4in5-COcFkNaeFrNDi7EO" }}>
            <div>
                <div className="wrapper">
                   
                </div>
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
