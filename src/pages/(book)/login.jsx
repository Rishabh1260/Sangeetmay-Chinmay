import React, { use } from 'react';
import Image from 'next/image';
import InputField from '@/components/InputField';
import {auth, googleProvider} from "../../services/firebase";
import { signInWithPopup } from 'firebase/auth';
import {useRouter} from 'next/navigation';
import addUsertoFirestore from '../../services/userController'



const Login  = () => {

  const router = useRouter();
  

 const handleSignIn = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result?.user;
      addUsertoFirestore(user);
      console.log("Login successful : ",user);
      // router.push('/');
    })
    .catch((error) => {
      console.error("Login error:", error);
      alert("Login error. Please try again later.");
    });
};

  return (
    <div className="flex h-screen relative ">
   
      <img
        src="/Background.jpg" 
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="w-1/2  flex items-center justify-center relative">
        <Image src="/logo.png" width={300} height={300} alt="Sangeetmaychinmay" />
      </div>
      
      <div className="w-1/2 bg-custom-gray flex items-center justify-center ">
        <div className="flex items-center justify-center w-70 h-70 bg-opacity-30 rounded-3xl border border-black border-5 backdrop-blur-2xl">
       
        </div>

        <div className="w-auto h-auto p-12 bg-[#5782c147] rounded-[40px] border-[3px] border-solid border-transparent backdrop-blur-[25px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(25px)_brightness(100%)] [border-image:linear-gradient(to_bottom,rgba(88,130,193,0.49),rgba(88,130,193,0.11))_1]">
          <h2 className="text-2xl m item-center justify-center font-light" >Login</h2>
          <p className='text-[12px] ml-1 font-thin'>Welcome to SangeetmayChinmay </p>
          
        
        
          <div className="mb-2 flex items-center justify-center">
          <InputField/>
          
          </div>
          <div className="m-4 mt-8  flex items-center justify-center">
          <button className="bg-blue-500 text-white  w-28 h-9 rounded-lg  ">
            Login
          </button>
          </div>
          <p className='text-white flex item-center justify-center mb-3 font-light text-sm item-center'>Or</p>
          <div className="relative w-full h-14 mb-8 flex justify-center  ">

            <div className="flex-row w-44 h-10 m-2 bg-white rounded-[10px] border border-solid border-[#bcbec0]" onClick={handleSignIn}>
              <img
                className="absolute w-5 h-5 m-2 text-black "
                alt="Google"
                src="/glogo.svg" 

              />
              
              <p className='text-black pl-10 p-2 font-light text-sm item-center '>Sign in with Google</p>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
