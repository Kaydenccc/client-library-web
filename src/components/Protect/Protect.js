import React from 'react';
import { useNavigate } from 'react-router-dom';

const Protect = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen md:static absolute top-0 left-0 bottom-0 right-0 w-full flex items-center justify-center font-semibold text-yellow-500">
      <div className="bg-gray-500 p-4 shadow-2xl rounded-md md:w-[80%] w-full h-full md:h-[80%] text-[16px] md:text-3xl flex flex-col items-center justify-center">
        <p className="text-center">Upss, You dont have permission to access this page 😩</p>
        <p className="text-[16px] md:text-2xl">Back to previous page </p>{' '}
        <span className="bg-gray-700 w-[130px] text-center cursor-pointer hover:bg-black text-slate-200 rounded-md  p-2 mt-2 text-[14px] md:text-xl" onClick={() => navigate(-1)}>
          Go back
        </span>
      </div>
    </div>
  );
};

export default Protect;
