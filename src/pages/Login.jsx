

import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';

import dynamic from "next/dynamic"
import {googleProvider,app} from "../services/firebase";
import { signInWithPopup} from 'firebase/auth';
import { useRouter } from 'next/router'
import addUsertoFirestore from '../services/userController'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth';  
import '@/app/globals.css';





const Phone = dynamic(() => import("@/components/Phone"), {ssr : false}); 

const Login  = () => {

  const router = useRouter();

  const auth = getAuth();
  

  const [user, setUser] = useState('');




 const handleSignIn = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result?.user;
      addUsertoFirestore(user);
      console.log("Login successful");
      
      // sessionStorage.setItem('user', JSON.stringify(user));
      setUser(user);
     

      if(user.email === 'sangeetmaychinmay@gmail.com'){
        router.push('/AdminPanel');
      }
      else{
        console.log("user : ",user);
        

        router.push({
          pathname: '/form',
          query: {
            uid: user.uid,
            displayName: user.displayName,
            Email: user.email,
          },// Pass user object as a query parameter
        });
      }
      
    })
    .catch((error) => {
      console.error("Login error:", error);
      alert("Login error. Please try again later.");
    });
  };
  
 




  return (
    <div className="flex h-screen w-screen relative ">
   
      <img
        src="/Background.jpg" 
        alt="Background"
        className="absolute inset-0 w-screen h-screen object-cover"
      />
      
      <div className="w-1/2  flex items-center justify-center relative">
        <Image src="/logo.png" width={300} height={300} alt="Sangeetmaychinmay" />
      </div>
      
      <div className="w-1/2 bg-custom-gray flex items-center justify-center ">
       

        <div className="w-10/12 h-5/6 p-12 bg-[#5782c147] rounded-3xl  border-solid  backdrop-blur-[25px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(25px)_brightness(100%)] [border-image:linear-gradient(to_bottom,rgba(88,130,193,0.49),rgba(88,130,193,0.11))_1]">
          <h2 className="text-2xl m item-center justify-center font-light text-black" >Login</h2>
          <p className='text-[12px]  font-thin text-black'>Welcome to SangeetmayChinmay </p>
          
          <div className="mb-5 flex-rowvalue items-center justify-center">
          {/* <InputField/> */}
          <Phone />
          <p className='text-white flex item-center justify-center mb-3 font-light text-sm item-center'>Or</p>
          <div className="relative w-full h-14 mb-8 flex justify-center  ">

            <div className="flex-row w-auto h-10 m-2 bg-white rounded-[10px] border border-solid border-[#bcbec0] " onClick={handleSignIn} style={{ cursor: 'pointer' }}>
              <img
                className="absolute w-5 h-5 m-2 text-black "
                alt="Google"
                src="/glogo.svg" 

              />
              
              <p className='text-black pl-10 p-2  font-light text-sm item-center'>Sign in with Google</p>
             
            </div>
          </div>


          
          </div>
         
          
        </div>
      </div>
    </div>
  );
};

export default Login;


