import React from 'react';
import { useNavigate } from 'react-router-dom';

const Protect = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex items-center justify-center font-semibold text-yellow-500">
      <div className="bg-gray-500 shadow-2xl rounded-md w-[80%] h-[80%] text-3xl flex flex-col items-center justify-center">
        <p>Upss, You dont have permission to access this page 😩</p>
        <p className="text-2xl">Back to previous page </p>{' '}
        <span className="bg-gray-700 w-[130px] text-center cursor-pointer hover:bg-black text-slate-200 rounded-md  p-2 mt-2 text-xl" onClick={() => navigate(-1)}>
          Go back
        </span>
      </div>
    </div>
  );
};

export default Protect;
