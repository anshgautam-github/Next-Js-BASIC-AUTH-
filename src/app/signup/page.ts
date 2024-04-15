"use client";
import React, { useState,useEffect } from 'react'
import { toast } from "react-hot-toast"; //librarry for giving popup for eeror/ success
import axios from "axios";  //we can send request from fetch too , but axios provide error handling state
import {useRouter} from "next/navigation";
import Link from "next/link";

function page() {

  const router = useRouter(); /// basically userouter ->> hook 

  const [user,setUser]=useState({
    email: "",
    password:"",
    username:"",
  })

  const [buttonDisabled,setButtonDisabled]=useState(false);
  const [loading, setLoading] = useState(false);

  //when user enters a on signup button
  const onSignup = async () => {
    try {

      setLoading(true)
     const response= await axios.post("/api/users/signup", user) //sending a post request format-> (url, data)
    
     console.log("Signup success", response.data);
     router.push('/login')    //after signup we are redirecting user to the login page with the help of the router hook we imported

    
    } catch  (error:any) {
      console.log("Signup failed", error.message); 
      toast.error(error.message);
  }finally {
      setLoading(false);
  }
  }

//now we want button to become active when only user fills all the three details 
  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
        setButtonDisabled(false);
    } else {
        setButtonDisabled(true);
    }
}, [user]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading? "Processing" : "Signup"}</h1>
      <hr />
      
      <label htmlFor="username">username</label>
      
      <input 
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      id="username"
      value={user.username}
      onChange={(e)=>setUser({...user, username:e.target.value})}
      type="text" 
      placeholder="username"/>

<label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />


      <button
      onClick={onSignup}
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled? "no Signup" : "Signup"}
      </button>

      <Link href="/login">Visit login page</Link>

    </div>
  )
}

export default page
