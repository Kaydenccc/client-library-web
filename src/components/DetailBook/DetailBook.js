import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const server_url = 'https://server-library-web.vercel.app';
const DetailBook = () => {
  const { user } = useSelector((state) => state.login);
  const [data, setData] = useState('');
  //GET URL PARAM {id}
  const { id } = useParams();

  // FECTH DATA
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const fetch = async () => {
      try {
        const res = await axios.get(server_url + `/api/books/v1/get/book/${id}`, {
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
    fetch();
    return () => {
      cancelToken.cancel();
    };
  }, [id]);
  const navigate = useNavigate();
  return (
    <div className="flex-[1]  flex-col flex bg-slate-200 pt-4 md:pt-8 pb-2 px-[8px] md:px-6 overflow-y-auto">
      <div className="flex h-auto md:h-full w-full gap-4 px-2 md:px-6 py-11 bg-gradient-to-tr md:flex-row flex-col bg-white font-semibold text-[#3d3222] ">
        <div className="space-y-4 h-full w-full md:w-1/2  flex flex-col items-center">
          <img className="w-[50%] " src={data?.image} alt={data?.title + ' image'} />
          {user?.user.admin ? (
            <button onClick={() => navigate('/add-log/' + id)} className="px-4 w-full bg-blue-500 hover:bg-blue-400 text-white py-2 rounded-md shadow-sm font-medium">
              Tambahkan ke Transaksi
            </button>
          ) : (
            <div className="px-4 w-full bg-gray-500 text-center text-white py-2 rounded-md shadow-sm font-bold tracking-wider">AVAILABLE {data.available}</div>
          )}
        </div>
        <div className="space-y-2 w-full md:w-1/2 h-full md:overflow-y-auto scroll-thumb ">
          <span className="flex justify-between items-center">
            <h1 className="text-xl md:text-4xl font-bold">{data.title}</h1>
          </span>
          <span className="block text-[14px]">
            <h2 className="text-green-500">
              <strong>Book ID:</strong> {data._id}
            </h2>
            <h2 className="">
              <strong>Penulis:</strong> {data.author}
            </h2>
            <h2 className="">
              <strong>Kategori:</strong> {data.category}
            </h2>
            <h2 className="">
              <strong>Published:</strong> {data.releaseAt}
            </h2>
            <h2 className="">
              <strong>Penerbit:</strong> {data.penerbit}
            </h2>
            <h2 className="">
              <strong>ISBN:</strong> {data.isbn}
            </h2>
            <h2 className="">
              <strong>Jumlah Halaman:</strong> {data.jumlah_halaman}
            </h2>
            <h2 className="">
              <strong>available:</strong> {data.available}/{data.jumlah_buku}
            </h2>
            <p className="text-justify pr-1">
              <strong>Deskripsi:</strong> {data.description}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailBook;
