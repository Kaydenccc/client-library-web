import React, { useEffect, useState } from 'react';
import { IoIosPeople } from 'react-icons/io';
import axios from 'axios';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const server_url = 'https://server-library-web-production.up.railway.app';
const TableTransaksiPribadi = ({ tableName = 'Data Transaksi' }) => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [transaksi, setTransaksi] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const getTransaksi = async () => {
      try {
        const res = await axios.get(server_url + '/api/log/v1/log/books');
        let filterUsers = res.data?.data.filter((trans) => trans.data_user._id === id);
        setTransaksi(filterUsers);
      } catch (err) {
        console.log(err);
      }
    };
    getTransaksi();
  }, [dispatch, id]);

  // CREATE DEADLINE TIME
  const deadline = (time) => {
    return new Date(Math.ceil(new Date(time).getTime() + 1000 * 3600 * 24 * 7)).toDateString();
  };
  return (
    <div className="h-full md:w-auto w-fit flex flex-col border-2">
      <div className="w-full flex items-center justify-between mb-3 p-2">
        <h3 className="text-lg font-semibold flex justify-start gap-2 items-center ">
          <IoIosPeople className="text-2xl" />
          {tableName}
        </h3>
      </div>
      <div className="flex-1 flex w-full whitespace-nowrap flex flex-col h-full bg-white p-2 md:p-6 shadow-sm overflow-hidden overflow-x-auto scroll-smooth scroll-thumb">
        <table className="w-[1000px] h-[500px] md:h-auto md:w-full">
          <thead className="">
            <tr className="text-left flex p-2 border-b">
              <th className="flex-[0.5] overflow-hidden">No.</th>
              <th className="flex-[1]">Kode Transaksi</th>
              <th className="flex-[0.8]">Nama</th>
              <th className="flex-[1]">Buku</th>
              <th className="flex-[1]">Tgl. Peminjaman</th>
              <th className="flex-[1]">Tenggat Waktu</th>
            </tr>
          </thead>
          <tbody className="w-full h-full flex flex-[1] flex-col">
            {transaksi ? (
              transaksi?.length > 0 ? (
                transaksi.map((trans, i) => (
                  <tr key={i} className=" table-row row cursor-pointer">
                    <td className="flex-[0.5]">{i + 1}</td>
                    <td className="flex-[1]">{trans.kodeTransaksi}</td>

                    <td className="flex-[0.8]">{trans.nama_peminjam}</td>
                    <td className="flex-[1]">{trans.title}</td>

                    <td className="flex-[1]">{new Date(trans.createdAt).toDateString()}</td>
                    <td className="flex-[1]">{deadline(trans.updatedAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Kosong</td>
                </tr>
              )
            ) : (
              <tr>
                <td>Loading</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableTransaksiPribadi;
