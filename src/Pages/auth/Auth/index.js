import React, { useState } from 'react';
import Forgot from '../../../components/Forgot';
import Login from '../../../components/Login';
import imageBg from '../../../assets/bgRegister.jpg';
const Auth = () => {
  const [forgot, setForgot] = useState(false);
  return (
    <div className="w-full flex md:flex-row flex-col h-screen overflow-hidden bg-[#FEFEFE]">
      <div className="flex-[1]">
        <img src={imageBg} className="w-full h-full object-contain" alt="background register" />
      </div>
      {forgot ? <Forgot setForgot={setForgot} /> : <Login setForgot={setForgot} />}
    </div>
  );
};

export default Auth;
