import React, { useEffect, useState } from 'react';
import { IoIosPeople } from 'react-icons/io';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TableTransaksi = ({ tableName = 'Data Users', icon }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [transaksi, setTransaksi] = useState(null);
  const [userId, setUserId] = useState('');
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const getTransaksi = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/log/v1/log/books', {
          cancelToken: cancelToken.token,
        });
        let filterUsers;
        filterUsers = res.data.data;
        setTransaksi(filterUsers);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled!');
        }
        console.log(err.message);
      }
    };
    getTransaksi();
    return () => {
      cancelToken.cancel();
    };
  }, [userId, dispatch]);

  const deleteLog = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/log/v1/log/book/${id}`);
    } catch (err) {
      console.log(err);
    }
    setUserId(id);
  };

  const searchUser = async (e) => {
    e.preventDefault();
    setTransaksi('');
    try {
      const res = await axios.get(`http://localhost:4000/api/log/v1/log/search/${search}`);
      setMessage(null);
      console.log(res.data.data);
      setTransaksi(res.data.log);
    } catch (err) {
      console.log(err);
      if (err.response?.status === 404) {
        setMessage('Upss, Not found the book');
      }
      console.log(err);
    }
    setSearch('');
  };
  // CREATE DEADLINE TIME
  const deadline = (time) => {
    return new Date(Math.ceil(new Date(time).getTime() + 1000 * 3600 * 24 * 7)).toDateString();
  };
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="w-full md:flex-row flex-col flex items-start md:items-center justify-between mb-3">
        <h3 className="text-lg font-semibold flex justify-start gap-2 items-center ">
          <IoIosPeople className="text-2xl" />
          {tableName}
        </h3>

        {user?.user?.admin && (
          <form onSubmit={searchUser} className="flex gap-2 items-center flex-col md:w-fit w-full md:flex-row font-semibold">
            <button className="self-start" type="submit">
              <p className="font-bold">Search by Kode Transaksi:</p>{' '}
            </button>
            <input onChange={(e) => setSearch(e.target.value)} value={search} className="px-[10px] md:w-fit w-full text-[16px] text-[12px] py-1 placeholder:text-[14px]" type="text" placeholder="Search log" />
          </form>
        )}
      </div>
      {pathname === '/riwayat-transaksi' ? (
        <div className="w-full flex flex-col overflow-hidden bg-white shadow-sm ">
          <div className="flex px-4 md:flex-row flex-col justify-between items-center">
            {icon}
            {user?.user?.admin ? (
              <button onClick={() => navigate('/add-log')} className="px-4 mr-4 h-fit text-[14px] self-start md:mt-0 mt-6 md:text-[16px] bg-blue-500 hover:bg-blue-400 text-white py-2 rounded-md shadow-sm font-medium">
                Tambah Transaksi
              </button>
            ) : (
              <form onSubmit={searchUser} className="flex md:my-0 my-4 md:flex-row flex-col gap-2 items-start md:items-center font-semibold">
                <button type="submit">
                  <p className="font-bold self-start">Search by Kode Transaksi:</p>{' '}
                </button>
                <input onChange={(e) => setSearch(e.target.value)} value={search} className="px-[10px] self-start  bg-slate-200 py-1 placeholder:text-[14px]" type="text" placeholder="Search log" />
              </form>
            )}
          </div>
        </div>
      ) : null}
      <div className="flex-1 flex w-full whitespace-nowrap flex flex-col h-full bg-white p-2 md:p-6 shadow-sm overflow-hidden overflow-x-auto scroll-thumb">
        <table className="w-[1032px] h-[500px] md:h-auto md:w-full">
          <thead className="">
            <tr className="text-left flex mr-[10px] p-2 border-b">
              <th className="flex-[0.5] overflow-hidden">No.</th>
              <th className="flex-[1]">Kode Transaksi</th>
              <th className="flex-[1]">Nim</th>
              <th className="flex-[0.8]">Nama</th>
              <th className="flex-[1]">Buku</th>
              <th className="flex-[1]">Tgl. Peminjaman</th>
              <th className="flex-[1]">Tenggat Waktu</th>
              {user?.user?.admin && <th className="flex-[0.5]">Action</th>}
            </tr>
          </thead>
          <tbody className="w-auto md:w-full h-full flex flex-[1] flex-col  overflow-y-auto scroll-thumb ">
            {transaksi ? (
              transaksi.map((trans, i) => (
                <tr key={i} className=" table-row row cursor-pointer">
                  <td onClick={() => user?.user?.admin && navigate('/detail-log/' + trans._id)} className="flex-[0.5]">
                    {i + 1}
                  </td>
                  <td onClick={() => user?.user?.admin && navigate('/detail-log/' + trans._id)} className="flex-[1]">
                    {trans.kodeTransaksi}
                  </td>
                  <td onClick={() => user?.user?.admin && navigate('/detail-log/' + trans._id)} className="flex-[1]">
                    {trans.nim}
                  </td>
                  <td onClick={() => user?.user?.admin && navigate('/detail-log/' + trans._id)} className="flex-[0.8]">
                    {trans.nama_peminjam}
                  </td>
                  <td onClick={() => user?.user?.admin && navigate('/detail-log/' + trans._id)} className="flex-[1]">
                    {trans.title}
                  </td>
                  <td onClick={() => user?.user?.admin && navigate('/detail-log/' + trans._id)} className="flex-[1]">
                    {new Date(trans.createdAt).toDateString()}
                  </td>
                  <td onClick={() => user?.user?.admin && navigate('/detail-log/' + trans._id)} className="flex-[1]">
                    {deadline(trans.updatedAt)}
                  </td>
                  {user?.user?.admin && (
                    <td className="flex-[0.5] flex gap-2 items-center">
                      <AiFillEdit onClick={() => navigate('/update-log/' + trans._id)} className="text-blue-500 cursor-pointer" />
                      <MdDelete onClick={() => deleteLog(trans._id)} className="text-red-500 cursor-pointer" />
                    </td>
                  )}
                </tr>
              ))
            ) : message ? (
              <tr>
                <td>{message}</td>
              </tr>
            ) : (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableTransaksi;
