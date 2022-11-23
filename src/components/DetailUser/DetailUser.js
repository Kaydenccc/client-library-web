import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TableTransaksiPribadi from '../Table/TableTransaksiPribadi';

const DetailUser = () => {
  // GET URL PARAMS
  const { id } = useParams();
  const [data, setData] = useState();
  const { user } = useSelector((state) => state.login);
  const navigate = useNavigate();
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const getUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/auth/v1/user/${id}`, {
          cancelToken: cancelToken.token,
        });
        setData(res.data.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled!');
        } else {
          console.log(err);
        }
      }
    };
    getUsers();
    return () => {
      cancelToken.cancel();
    };
  }, [id]);

  console.log('user', user);
  // PROTECT DATA PERSONALITY OF OTHER USER
  if (!user?.user?.admin && id !== user?.user._id) {
    return <Navigate to="/protect" replace />;
  }
  return (
    <div className="h-full flex-col flex bg-slate-200 py-8 px-[8px] md:px-6 overflow-y-scroll">
      <div className="w-full gap-4 pb-11 bg-gradient-to-tr rounded-tl-[5rem] bg-white font-semibold text-[#3d3222] ">
        <div className="min-h-[150px] md:min-h-[250px] w-full bg-gradient-to-t from-gray-500 to-gray-400 rounded-tl-[5rem]  px-6"></div>
        <div className="flex md:flex-row flex-col space-y-8 md:space-y-0 px-2 md:px-6 justify-between items-start md:items-center">
          <div className="flex items-center gap-4">
            <div className="md:h-[150px] h-[80px] w-[80px] md:w-[150px] rounded-full overflow-hidden border-[5px] border-white -mt-8 bg-slate-400">
              <img className="" src={data?.image} alt="Profile user" />
            </div>
            <div className="space-y-0 md:space-y-2 overflow-hidden">
              <p className="text-xl md:text-4xl font-bold">{data?.username}</p>
              <p className="text-[12px] md:text-xl text-ellipsis whitespace-nowrap ">{data?.email}</p>
            </div>
          </div>
          <button onClick={() => navigate('/update-user/' + data?._id)} className="text-[14px] md:text-[16] px-4 mr-4 h-fit bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md shadow-sm font-medium">
            Edit Profile
          </button>
        </div>
        <div className="flex md:flex-row flex-col px-[8px] md:px-6 mt-12 gap-4">
          <div className="flex-[0.2] space-y-8">
            <div className="w-full space-y-1">
              <p className="font-bold tracking-widest">Username</p>
              <p className="pb-2 border-b-2">{data?.username}</p>
            </div>
            <div className="w-full space-y-1">
              <p className="font-bold tracking-widest">Email</p>
              <p className="pb-2 border-b-2">{data?.email}</p>
            </div>
            <div className="w-full space-y-1">
              <p className="font-bold tracking-widest">NIM</p>
              <p className="pb-2 border-b-2">{data?.nim}</p>
            </div>
            <div className="w-full space-y-1">
              <p className="font-bold tracking-widest">Profesi</p>
              <p className="pb-2 border-b-2">{data?.profesi}</p>
            </div>

            <div className="w-full space-y-1">
              <p className="font-bold tracking-widest">Alamat</p>
              <p className="pb-2 border-b-2">{data?.alamat}</p>
            </div>
          </div>
          <div className="flex-[0.8] shadow-sm overflow-hidden overflow-x-auto scroll-thumb">
            <TableTransaksiPribadi />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
