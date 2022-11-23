import axios from 'axios';
import React, { useEffect } from 'react';
import { IoIosBookmarks } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getTotalTransaksi } from '../../features/totalSlice';
import Card from '../Card';
import Footer from '../Footer/Footer';
import TableTransaksi from '../Table/TableTransaksi';

const RiwayatTransaksi = () => {
  const { totalTransaksi } = useSelector((state) => state.total);
  const dispatch = useDispatch();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const getLogs = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/log/v1/log/pagination`, {
          cancelToken: cancelToken.token,
        });
        dispatch(getTotalTransaksi(res.data.totalData));
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled!');
        } else {
          console.log(err);
        }
      }
    };
    getLogs();
    return () => {
      cancelToken.cancel();
    };
  }, [dispatch]);
  return (
    <div className="flex-[1] flex-col flex bg-slate-200 pt-8 pb-2 px-[8px] md:px-6 overflow-y-scroll">
      <div className="flex md:flex-row flex-col justify-between items-start md:space-y-0 space-y-2 md:items-center text-black/70 mb-4">
        <p className="text-xl font-bold">Riwayat Transaksi</p>
        <p>
          <span className="text-blue-600">Beranda</span> / Riwayat Transaksi
        </p>
      </div>
      <div className="flex flex-col h-full w-full ">
        <TableTransaksi
          tableName="Table Transaksi"
          icon={<Card total={totalTransaksi} className="flex items-center gap-4 text-left justify-between w-fit p-4 mt-4" text="Total User" icon={<IoIosBookmarks className="text-6xl text-white" />} />}
        />
      </div>
      <Footer />
    </div>
  );
};

export default RiwayatTransaksi;
