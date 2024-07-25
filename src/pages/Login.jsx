import { useState } from "react";
import { auth } from "../server/firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../server/firebase"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        console.log("User data:", userDoc.data());
      } else {
        console.log("No user data found in Firestore.");
      }

      
      alert("Login Successful");
      localStorage.setItem("user", JSON.stringify(userDoc.data()));

      nav("/");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Failed to log in: " + err.message);
      alert(err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-[100vw] h-[100vh] flex justify-center">
      <form
        onSubmit={Login}
        className="flex flex-col items-center justify-evenly w-full lg:w-[50%] h-[50%]"
      >
        <div className="flex w-[80%] justify-start items-start">
          <button className="lg:mr-[160px] md:mr-[160px] sm:mr-[160px] mr-[100px] text-xl" onClick={()=>nav('/')}>Go Back</button>
          <h2 className="text-5xl font-bold ">Login</h2>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-[80%] h-12 bg-slate-400 placeholder:text-black placeholder:text-2xl pl-4 rounded-md text-2xl"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-[80%] h-12 bg-slate-400 placeholder:text-black placeholder:text-2xl pl-4 rounded-md"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-[80%] h-10 bg-green-500 text-2xl rounded-md"
        >
          {loading ? "Logging In..." : "Login"}
        </button>
        <p className="text-2xl">
          Not a member?{" "}
          <a href="/signup" className="text-green-800">
            Signup
          </a>
        </p>
      </form>
    </main>
  );
};

export default Login;
