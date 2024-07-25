import { useState } from "react";
import { auth, db } from "../server/firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav=useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });
      let data={email}
      nav("/login");
      alert("signup successfull")
      localStorage.setItem("user",JSON.stringify(data))
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Failed to sign up: " + err.message);
      alert(err.message)
      console.log(err.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='w-[100vw] h-[100vh] flex justify-center'>
    <form onSubmit={handleSignup} className='flex flex-col items-center justify-evenly w-[50%] h-[50%]' >
    <div className="flex w-[80%] justify-start items-start">
          <button className="mr-[130px] text-xl" onClick={()=>nav('/')}>Go Back</button>
      <h2 className='text-5xl font-bold '>Sign Up</h2>
        </div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className='w-[80%] h-12 bg-slate-400 placeholder:text-black placeholder:text-2xl pl-4 rounded-md text-2xl'

      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className='w-[80%] h-12 bg-slate-400 placeholder:text-black placeholder:text-2xl pl-4 rounded-md text-2xl'

      />
      <button type="submit" disabled={loading} className='w-[80%] h-10 bg-green-500 text-2xl rounded-md'>
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
      <p className='text-2xl'>Already a member? <a href="/login" className='text-green-800'>Login</a></p>

    </form>
    </main>
  );
};

export default Signup;
