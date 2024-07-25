// import React, { useState } from 'react';
// import { auth } from '../firebase';
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const nav=useNavigate()

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       // Handle successful login (e.g., redirect to dashboard)
//       alert("login successful..")
//         nav("/")
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold">Login</h2>
//       <form onSubmit={handleLogin} className="mt-4">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 w-full mb-4"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 w-full mb-4"
//         />
//         {error && <p className="text-red-500">{error}</p>}
//         <button type="submit" className="bg-blue-500 text-white p-2 w-full">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// // export default Login;

// import React, { useState } from "react";
// import { auth } from "../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const handleLogin = async (e) => {
//     e.preventDefault(); // Prevent form from submitting the traditional way
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       // Handle successful login (e.g., redirect to dashboard)
//       alert("login successful..");
//       nav("/");
//     } catch (error) {
//       setError(error.message); // Set error message if login fails
//       alert("login failed")
//       console.log(error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold">Login</h2>
//       <form onSubmit={handleLogin} className="mt-4">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 w-full mb-4"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 w-full mb-4"
//         />
//         {error && <p className="text-red-500">{error}</p>}
//         <button type="submit" className="bg-blue-500 text-white p-2 w-full">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;

// import React, { useState } from 'react';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import { db } from '../firebase'; // Adjust the import path according to your project structure

// const auth = getAuth();

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       // Handle successful login, e.g., redirect or show success message
//       console.log('User logged in successfully');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//             />
//           </div>
//           {error && <p className="text-red-500 mb-4">{error}</p>}
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import { useState } from 'react';
// import { auth } from '../server/firebase'; // Import your Firebase configuration
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const nav=useNavigate()

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Sign in with email and password
//       await signInWithEmailAndPassword(auth, email, password);

//       // Clear state or redirect
//       alert("login Succssfll")
//       nav("/")
//       setEmail('');
//       setPassword('');
//     } catch (err){
//       setError('Failed to log in: ' + err.message);
//       alert(err.message)
//       console.log(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Login</h2>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       <button type="submit" disabled={loading}>
//         {loading ? 'Logging In...' : 'Login'}
//       </button>
//       {error && <p>{error}</p>}
//     </form>
//   );
// };

// export default Login;

import { useState } from "react";
import { auth } from "../server/firebase"; // Import your Firebase configuration
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../server/firebase"; // Import your Firestore configuration

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Optionally, fetch user data from Firestore if needed
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        console.log("User data:", userDoc.data());
      } else {
        console.log("No user data found in Firestore.");
      }

      // Clear state or redirect
      alert("Login Successful");
      // let data=userCredential.user.email
      // console.log(data);
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
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-evenly w-[50%] h-[50%]"
      >
        <div className="flex w-[80%] justify-start items-start">
          <button className="mr-[100px] text-xl" onClick={()=>nav('/')}>Go Back</button>
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
        {/* {error && <p>{error}</p>} */}
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
