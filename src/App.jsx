import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
// import Payment from "./components/Payment";
import Signup from "./pages/Signup";
import StripeProvider from "./components/StripeContext";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";
// import PaymentForm from "./Paymentmethods/PaymentForm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/payment" element={<Payment />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/success" element={<PaymentSuccess/>}/>
          <Route path="/cancel" element={<PaymentCanceled/>}/>
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
