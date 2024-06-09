

import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

// import OtpInput from "otp-input-react";
import { useState, useContext } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../services/firebase";
import {RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import  {useRouter} from 'next/navigation';
import {createContext} from'react';

import dynamic from "next/dynamic"

const OtpInput = dynamic(() => import("otp-input-react"), {ssr : false}); 
export const userContext = createContext();



const Phone = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
 
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(false);


  const router = useRouter();  


  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            if (response) {
              onSignup();
              console.log('reCAPTCHA solved:', response);
            }
          },
          "expired-callback": () => {
            console.log('reCAPTCHA expired');
          },
        },[auth]);
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;
    
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        console.log("OTP sent to number: ", formatPh);
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");

        
      })
      .catch((error) => {
        
        console.log(error);
        alert(error)
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        // setUserUid(res.user.uid);
        
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
   
    <section className=" flex items-center justify-center h-80">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍Login Success
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg- w-full flex gap-1 items-center justify-center py-2.5 text-blue-500 rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="mx-auto p-4 rounded-lg  ">
                  <BsTelephoneFill size={30} color="gray"/>
                </div>
                <label
                  htmlFor=""
                  className=" text-xl text-black font-extralight text-center"
                >
                  Verify with phone number
                </label>
                <PhoneInput country={"in"} color="black" value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  className="bg-blue-500 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
 
  );
};

export default Phone;
