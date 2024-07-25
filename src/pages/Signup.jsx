// import React, { useState } from 'react';
// import { auth, db } from '../firebase';
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { useNavigate } from 'react-router-dom';

// function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [error, setError] = useState(null);
//   const nav=useNavigate()

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       await setDoc(doc(db, "users", user.uid), {
//         name,
//         email,
//       });
//       // Handle successful signup (e.g., redirect to dashboard)
//       alert("signup successful..")
//       nav("/login")
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold">Sign Up</h2>
//       <form onSubmit={handleSignup} className="mt-4">
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="border p-2 w-full mb-4"
//         />
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
//         <button type="submit" className="bg-green-500 text-white p-2 w-full">
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Signup;

// import React, { useState } from 'react';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import { db } from '../firebase'; // Adjust the import path according to your project structure

// const auth = getAuth();

// const Signup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       // Handle successful signup, e.g., redirect or show success message
//       console.log('User signed up successfully');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//         <form onSubmit={handleSignup}>
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
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import { useState } from "react";
import { auth, db } from "../server/firebase"; // Import your Firebase configuration
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
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });
      let data={email}
      nav("/login");
      alert("signup successfull")
      localStorage.setItem("user",JSON.stringify(data))
      // Clear state or redirect
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
      {/* {error && <p>{error}</p>} */}
      <p className='text-2xl'>Already a member? <a href="/login" className='text-green-800'>Login</a></p>

    </form>
    </main>
  );
};

export default Signup;
