import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase/firebase"; // ✅ make sure this points to the correct file

function TestFireStore() {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null)
  const [otp, setOtp] = useState("");



  const handleSendOtp = async() => {

    try{
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {})
      const confirmation = signInWithPhoneNumber(auth, phone, recaptcha)
      setUser(confirmation)
      console.log(confirmation)
    }catch(error){
      console.log(error)
    }
  
  };

  const handleVerifyOtp = async() => {

    try{
     const data = await user.confirm(otp)
     console.log(data)
      console.log("OTP verified successfully")  
    }
    catch(error){
      console.log(error)
    }
  };

  return (
    <div className=" mt-20 flex flex-col items-center justify-center h-screen">
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+91XXXXXXXXXX"
      />
      <div id="recaptcha-container"></div>
      <button onClick={handleSendOtp}>Send OTP</button>

      <div id="recaptcha" ></div>

      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
    </div>
  );
}

export default TestFireStore;
