import React, { useState, useEffect } from 'react';
import Card from '../Card';
import { IoIosPeople } from 'react-icons/io';
import Table from '../Table';
import Footer from '../Footer/Footer';
import axios from 'axios';
const Datausers = () => {
  //GET TOTAL USER
  const [totalUsers, setTotalUsers] = useState();
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const getUsers = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/auth/v1/users/pagination', {
          cancelToken: cancelToken.token,
        });
        setTotalUsers(res.data.totalData);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled!');
        } else {
          console.log(err.message);
        }
      }
    };
    getUsers();
    return () => {
      cancelToken.cancel();
    };
  }, []);

  return (
    <div className="flex-[1] flex-col flex bg-slate-200 pt-8 pb-2  px-[8px] md:px-6 overflow-y-scroll">
      <div className="flex md:flex-row flex-col justify-between md:space-y-0 space-y-2 items-start md:items-center text-black/70 mb-4">
        <p className="text-xl font-bold">Data Users</p>
        <p>
          <span className="text-blue-600">Beranda</span> / Data Users
        </p>
      </div>
      <div className="flex flex-col h-auto w-full">
        <Table tableName="Table Data Users" icon={<Card total={totalUsers} className="flex items-center gap-4 text-left justify-between w-fit p-4 " text="Total User" icon={<IoIosPeople className="text-6xl text-white" />} />} />
      </div>
      <Footer />
    </div>
  );
};

export default Datausers;
