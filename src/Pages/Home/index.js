import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import { HiOutlineLogout, HiOutlineMenu } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { setCloseSide } from '../../features/routeSlice';

import { Outlet } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const { closeSide } = useSelector((state) => state.route);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:4000/api/auth/v1/signout');
      localStorage.clear();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className={`${closeSide ? 'w-full' : 'md:flex-[0.85]'} w-full  flex flex-col`}>
        <nav className="w-full p-6 text-xl flex items-center justify-between shadow-md">
          <HiOutlineMenu className="text-2xl cursor-pointer hover:opacity-70" onClick={() => dispatch(setCloseSide())} />
          <p className="flex items-center justify-center gap-3 cursor-pointer">
            <a href="/" onClick={handleLogout}>
              <HiOutlineLogout className="text-2xl flex justify-center items-center" />
            </a>
          </p>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
