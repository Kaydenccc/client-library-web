import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-gray-800 md:p-0 p-4 text-center absolute top-0 flex-col bottom-0 left-0 w-full text-yellow-500 h-screen flex justify-center items-center">
      <h1 className="text-[5rem] md:text-[10rem] tracking-[1rem]">404 😣</h1>
      <p className="text-[16px] md:text-[18px] font-bold">This page is not found, back to the main page.</p>
      <Link to={'/'} className="py-2 px-6 rounded-sm shadow-md shadow-slate-400 mt-6">
        Go back
      </Link>
    </div>
  );
};

export default NotFound;
