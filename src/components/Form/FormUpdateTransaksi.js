import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { isEmpty } from '../../helper/validate';

const inisialState = {
  bookID: '',
  nama_peminjam: '',
  nim: '',
  nomor_hp: '',
  alamat: '',
};
const FormUpdateTransaksi = () => {
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(inisialState);
  const { id } = useParams();
  const textareaElemet = useRef();
  const { bookID, nomor_hp, alamat, nama_peminjam, nim } = data;
  const { user } = useSelector((state) => state.login);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    Array.from(document.querySelectorAll('input')).forEach((input) => (input.value = ''));
    textareaElemet.current.value = '';
    setData({ ...data, bookID: '', nama_peminjam: '', nomor_hp: '', alamat: '', nim: '' });
    setLoading(false);
  };
  const registerHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    // check field
    if (isEmpty(bookID) || isEmpty(nama_peminjam) || isEmpty(nomor_hp) || isEmpty(alamat) || isEmpty(nim)) {
      setLoading(false);
      return toast('Please fill in all fields.', {
        className: 'toast-failed',
        bodyClassName: 'toast-failed',
      });
    }

    try {
      await axios.put('https://library-perpus.herokuapp.com/api/log/v1/log/book/' + id, data);
      setLoading(false);
      toast('Transaksi berhasil diupdate', {
        className: 'toast-success',
        bodyClassName: 'toast-success',
      });
    } catch (err) {
      setLoading(false);
      return toast(err.response.data.msg, {
        className: 'toast-failed',
        bodyClassName: 'toast-failed',
      });
    }
    handleReset();
  };

  //GET PATHNAME
  const { pathname } = useLocation();
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const getLogById = async () => {
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
    getLogById();
    return () => {
      cancelToken.cancel();
    };
  }, [pathname, id]);

  // PROTECT DATA PERSONALITY OF OTHER USER
  if (!user?.user?.admin) {
    return <Navigate to="/protect" replace />;
  }
  return (
    <form onSubmit={registerHandle} className="md:px-[8px] px-6 py-11 bg-gradient-to-tr bg-white space-y-3 font-semibold text-[#3d3222]">
      <ToastContainer />
      <h1 className="text-3xl md:text-4xl text-gray-500 mb-6 pb-6 border-b font-bold">Tambah Transaksi</h1>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="bookID">
          Book ID
        </label>
        <input onChange={handleChange} value={data?.bookID} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="bookID" name="bookID" placeholder="Masukan id buku" required />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="nama_peminjam">
          Nama Peminjam
        </label>
        <input onChange={handleChange} value={data?.nama_peminjam} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="nama_peminjam" name="nama_peminjam" placeholder="Masukan nama peminjam" required />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="nim">
          NIM / NIP
        </label>
        <input onChange={handleChange} value={data?.nim} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="nim" name="nim" placeholder="Masukan nim mahasiswa" required />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="nomor_hp">
          Nomor Handphone
        </label>
        <input onChange={handleChange} value={data?.nomor_hp} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="nomor_hp" name="nomor_hp" placeholder="Masukan nomor hanphone" required />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="alamat">
          Alamat Lengkap
        </label>
        <textarea
          ref={textareaElemet}
          value={data?.alamat}
          onChange={handleChange}
          className="resize-y p-[10px] bg-slate-100 rounded-sm outline-input h-[50px]"
          placeholder="Masukan Alamat"
          name="alamat"
          id="alamat"
          cols="3"
          rows="3"
          required
        ></textarea>
      </div>
      <div className="text-center">
        <button disabled={loading} className="bg-yellow-500 w-full py-2 disabled:opacity-30 disabled:bg-gray-500 text-slate-100 hover:text-slate-50 hover:bg-yellow-400" type="submit">
          {loading ? 'Loading...' : 'Register'}
        </button>
      </div>
    </form>
  );
};

export default FormUpdateTransaksi;
