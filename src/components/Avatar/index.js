import React from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCloseSide } from '../../features/routeSlice';
const Avatar = () => {
  const { closeSide } = useSelector((state) => state.route);
  const { user } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div
        onClick={() => {
          dispatch(setCloseSide());
          navigate('/detail-user/' + user.user?._id);
        }}
        className={`w-full p-6 flex md:hidden items-center gap-3 text-white cursor-pointer ${closeSide && 'visi-hidden'}`}
      >
        <div className="w-[80px] rounded-full overflow-hidden bg-slate-400">
          <img className="w-full h-full object-cover" src={user.user?.image} alt={user.user?.username} />
        </div>
        {/* <img className="w-[100px] rounded-full overflow-hidden" src="https://res.cloudinary.com/diqsivizd/image/upload/v1668267193/LIBRARY/user_image/pngegg_qhoull.png" alt="avatar" /> */}
        <div className="w-full">
          <p className="font-bold text-lg flex items-center m-0 ">
            {user.user?.username} <FaUserEdit className="inline-block ml-3 " />
          </p>
          <p className="text-white/70 hover:text-white m-0 ">{user.user?.profesi}</p>
        </div>
      </div>
      <div
        onClick={() => {
          navigate('/detail-user/' + user.user?._id);
        }}
        className={`w-full p-6 hidden md:flex items-center gap-3 text-white cursor-pointer ${closeSide && 'visi-hidden'}`}
      >
        <div className="w-[80px] rounded-full overflow-hidden bg-slate-400">
          <img className="w-full h-full object-cover" src={user.user?.image} alt={user.user?.username} />
        </div>
        {/* <img className="w-[100px] rounded-full overflow-hidden" src="https://res.cloudinary.com/diqsivizd/image/upload/v1668267193/LIBRARY/user_image/pngegg_qhoull.png" alt="avatar" /> */}
        <div className="w-full">
          <p className="font-bold text-lg flex items-center m-0 ">
            {user.user?.username} <FaUserEdit className="inline-block ml-3 " />
          </p>
          <p className="text-white/70 hover:text-white m-0 ">{user.user?.profesi}</p>
        </div>
      </div>
    </>
  );
};

export default Avatar;
