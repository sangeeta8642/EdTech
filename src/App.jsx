import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
// import Payment from "./components/Payment";
import Signup from "./pages/Signup";
import StripeProvider from "./components/StripeContext";
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
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
