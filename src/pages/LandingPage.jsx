import { useState } from "react";
import PayWithPayPal from "../Paymentmethods/PayWithPayPal";
import StripeProvider from "../components/StripeContext";
import PayWithStripe from "../Paymentmethods/PayWithStripe";
import shoe from "../assets/shoe.png";

function LandingPage() {
  const [show, setShow] = useState(false);

  return (
    <div className="container mx-auto p-4 flex justify-center items-center flex-col ">
      <h1 className="text-7xl font-bold">Welcome to the EdTech Platform</h1>
      {/* <p className="mt-4 text-4xl font-semibold"> */}
        {/* The best place to learn and grow. */}
      {/* </p> */}
      <div className="mt-8 flex">
        <div className="product-img">
          <img
            // src="https://cdn.pixabay.com/photo/2021/08/15/06/54/sunflower-6546993_1280.jpg"
            src={shoe}
            alt="Air Nike Pegasus 41 Electric"
            height="420"
            width="400"
          />
        </div>
        <div className="product-info mt-7 flex flex-col gap-5">
          <div className="product-text">
            <h2 className="text-2xl font-bold">Air Nike Pegasus 41 Electric</h2>
            <h3 className="capitalize text-xl text-slate-500 font-semibold">
              meet the next generation of Air{" "}
            </h3>
          </div>
          {/* <div className="product-price-btn"> */}
          <p className="text-xl text-slate-500 font-bold"> Price : $10</p>

          <p className="text-xl text-black font-bold">Check Out Product With :</p>
          {/* <br /> */}
          <button
            className="bg-yellow-600 h-14 rounded-full text-white text-2xl italic font-semibold"
            type="button"
            onClick={() => setShow(!show)}
          >
            Pay pal
          </button>
          <div className="flex flex-col">
            <PayWithPayPal amount="10.00" setShow={setShow} show={show} />
            <PayWithStripe />
          </div>
          {/* </div> */}
        </div>
      </div>

      {/* <StripeProvider> */}
      {/* </StripeProvider> */}
    </div>
  );
}

export default LandingPage;
