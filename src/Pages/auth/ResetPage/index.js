import React from 'react';
import Reset from '../../../components/Reset';
import imageBg from '../../../assets/bgRegister.jpg';
const ResetPage = () => {
  return (
    <div className="w-full flex md:flex-row flex-col h-screen overflow-hidden bg-[#FEFEFE]">
      <div className="flex-[1]">
        <img priority src={imageBg} className="w-full h-full object-contain" alt="background register" />
      </div>
      {/* {forgot ? <Forgot setForgot={setForgot} /> : <Login setForgot={setForgot} />} */}
      <Reset />
    </div>
  );
};

export default ResetPage;
