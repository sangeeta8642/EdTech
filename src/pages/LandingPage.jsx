import { useState } from "react";
import PayWithPayPal from "../Paymentmethods/PayWithPayPal";
import PayWithStripe from "../Paymentmethods/PayWithStripe";
import shoe from "../assets/shoe.png";
import Navbar from "../components/Navbar";

function LandingPage() {
  const [show, setShow] = useState(false);

  return (
    <main>
     <Navbar/>
      <div className="container mx-auto p-4 flex justify-center items-center flex-col ">
        <h1 className="text-7xl font-bold">Welcome to the EdTech Platform</h1>
       
        <div className="mt-8 flex">
          <div className="product-img">
            <img
              src={shoe}
              alt="Air Nike Pegasus 41 Electric"
              height="420"
              width="400"
            />
          </div>
          <div className="product-info mt-7 flex flex-col gap-5">
            <div className="product-text">
              <h2 className="text-2xl font-bold">
                Air Nike Pegasus 41 Electric
              </h2>
              <h3 className="capitalize text-xl text-slate-500 font-semibold">
                meet the next generation of Air{" "}
              </h3>
            </div>
            <p className="text-xl text-slate-500 font-bold"> Price : $10</p>

            <p className="text-xl text-black font-bold">
              Check Out Product With :
            </p>
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
          </div>
        </div>

       
      </div>
    </main>
  );
}

export default LandingPage;
