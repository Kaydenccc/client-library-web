import React, { useEffect } from 'react';
import Card from '../Card';
import { GiWhiteBook } from 'react-icons/gi';
import { IoIosPeople, IoIosBookmarks } from 'react-icons/io';
import Table from '../Table';
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getTotalBooks, getTotalTransaksi, getTotalUser } from '../../features/totalSlice';
import BooksMember from '../Books/BooksMember';
const DashboardMember = () => {
  const { totalUsers, totalTransaksi, totalBooks } = useSelector((state) => state.total);
  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  //GET TOTAL USERS
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get('https://library-perpus.herokuapp.com/api/auth/v1/users/pagination');
        dispatch(getTotalUser(res.data.totalData));
      } catch (err) {
        console.log(err.message);
      }
    };
    getUsers();
  }, [dispatch]);
  // GET TOTAL TRANSAKSI
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get('https://library-perpus.herokuapp.com/api/log/v1/log/pagination');
        dispatch(getTotalTransaksi(res.data.totalData));
      } catch (err) {
        console.log(err.message);
      }
    };
    getUsers();
  }, [dispatch]);
  // GET TOTAL BOOK
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get('https://library-perpus.herokuapp.com/api/books/v1/get/pagination');
        dispatch(getTotalBooks(res.data.totalData));
      } catch (err) {
        console.log(err.message);
      }
    };
    getUsers();
  }, [dispatch]);
  return (
    <div className="flex-[1] w-full h-auto flex-col flex bg-slate-200 pt-8 pb-2 px-[8px] md:px-6 overflow-y-scroll">
      <div className="flex justify-between flex-col space-y-2 md:space-y-0 md:flex-row items-center text-black/70">
        <p className="text-xl font-bold">Selamat datang Kayden di Perpustakaan digital</p>
        <p className="w-full md:w-fit">
          <span className="text-blue-600 ">Beranda</span> / Dashboard
        </p>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-2 md:gap-6 my-8">
        <Card total={totalUsers} text="Total User" className="flex text-right items-center justify-between flex-[1] bg-slate-50 shadow-md p-4" icon={<IoIosPeople className="text-6xl text-white" />} />
        <Card total={totalBooks} text="Total Buku" className="flex text-right items-center justify-between flex-[1] bg-slate-50 shadow-md p-4" icon={<GiWhiteBook className="text-6xl text-white" />} />
        <Card total={totalTransaksi} text="Peminjaman" className="flex text-right items-center justify-between flex-[1] bg-slate-50 shadow-md p-4" icon={<IoIosBookmarks className="text-6xl text-white" />} />
      </div>
      {!user?.user?.admin ? (
        <BooksMember />
      ) : (
        <div className="flex flex-col h-full w-full">
          <Table />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default DashboardMember;
