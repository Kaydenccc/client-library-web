import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const DetailLog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState('');
  //GET URL PARAM {id}
  const { id } = useParams();
  // func delete log
  const deleteLog = async () => {
    setLoading(true);
    try {
      await axios.delete(`https://library-perpus.herokuapp.com/api/log/v1/log/book/${id}`);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    navigate('/riwayat-transaksi');
  };
  // FECTH DATA
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const fetch = async () => {
      try {
        const res = await axios.get(`https://library-perpus.herokuapp.com/api/log/v1/log/book/${id}`, {
          cancelToken: cancelToken.token,
        });
        setData(res.data.log);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled!');
        } else {
          console.log(err);
        }
      }
    };
    fetch();
    return () => {
      cancelToken.cancel();
    };
  }, [id]);
  return (
    <div className="flex-[1] flex-col flex bg-slate-200 pt-8 pb-2 px-6 overflow-y-scroll">
      <div className="flex h-full w-full gap-4 px-6 py-11 bg-gradient-to-tr  bg-white font-semibold text-[#3d3222] ">
        <div className="space-y-4 h-full w-1/2  flex flex-col items-center">
          <img className="w-[50%] " src={data?.data_book?.image} alt={data?.title + ' image'} />
          <button disabled={loading} onClick={deleteLog} className="px-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md shadow-sm font-medium">
            {loading ? 'Loading...' : 'Delete Transaksi'}
          </button>
        </div>
        <div className="space-y-2 w-1/2 overflow-y-scroll scroll-thumb flex-1">
          <span className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Data Transaksi</h1>
          </span>
          <img className="h-[150px]" src={data.data_user?.image} alt={data.data_user?.username} />
          <div>
            <span className="block">
              <h2 className="text-green-500">
                <strong>Kode Transaksi:</strong> {data.kodeTransaksi}
              </h2>
              <h2 className="">
                <strong>Judul Buku:</strong> {data.title}
              </h2>
              <h2 className="">
                <strong>Jumlah Halaman:</strong> {data.data_book?.jumlah_halaman}
              </h2>
              <h2 className="">
                <strong>Nama Peminjam:</strong> {data.nama_peminjam}
              </h2>
              <h2 className="">
                <strong>NIM:</strong> {data.nim}
              </h2>
              <h2 className="">
                <strong>Profesi:</strong> {data.profesi}
              </h2>
              <h2 className="">
                <strong>Nomor Handphone:</strong> {data.nomor_hp}
              </h2>
              <h2 className="">
                <strong>Alamat:</strong> {data.alamat}
              </h2>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailLog;
