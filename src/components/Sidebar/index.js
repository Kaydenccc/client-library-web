import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../Avatar';
import Menu from '../Menu';
import { RiCloseFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { setCloseSide } from '../../features/routeSlice';
const Sidebar = ({ log }) => {
  const { closeSide } = useSelector((state) => state.route);
  const dispatch = useDispatch();
  return (
    <>
      {closeSide ? (
        <nav className={`h-full bg-slate-700 w-[80px] fixed md:static  left-[-100vh] top-0 z-[99]`}>
          <div className="p-6 bg-slate-500 text-center">
            <h2 className={`${closeSide && 'visi-hidden'} text-white font-semibold text-xl tracking-widest`}>PERPUSTAKAAN</h2>
          </div>
          <div className="w-full">
            <Avatar />
            <Menu />
          </div>
        </nav>
      ) : (
        <nav className={`h-full bg-slate-700 fixed md:static z-[99] ${closeSide ? 'left-[-100vh]' : 'left-0'} top-0 md:block ${log ? '' : 'flex-[0.18]'}`}>
          <div className="p-6 flex items-center bg-slate-500 text-center ">
            <h2 className="text-white first-letter: font-semibold text-xl tracking-widest">PERPUSTAKAAN</h2>
            <RiCloseFill onClick={() => dispatch(setCloseSide())} className="right-[-50px] relative block md:hidden ml-[-10px] text-2xl text-white bg-slate-500" />
          </div>
          <div className="w-full">
            <Avatar />
            <Menu />
          </div>
        </nav>
      )}
    </>
  );
};

export default Sidebar;
