import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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
const FormTransaksi = () => {
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(inisialState);
  const [book, setBook] = useState('');
  const { id } = useParams();
  const textareaElemet = useRef();
  const { user } = useSelector((state) => state.login);
  const { bookID, nomor_hp, alamat, nama_peminjam, nim } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    Array.from(document.querySelectorAll('input')).forEach((input) => (input.value = ''));
    textareaElemet.current.value = '';
    setData({ ...data, nama_peminjam: '', nomor_hp: '', alamat: '', nim: '' });
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
      console.log(data);
      await axios.post('https://library-perpus.herokuapp.com/api/log/v1/log/book', data);
      setLoading(false);
      toast('Transaksi berhasil ditambahkan', {
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
        const res = await axios.get(`https://library-perpus.herokuapp.com/api/books/v1/get/book/${id}`, {
          cancelToken: cancelToken.token,
        });
        setBook(res.data.data);
        setData({ ...data, bookID: res.data.data._id, title: res.data.data.title });
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cencelled!');
        } else {
          console.log(err);
        }
      }
    };
    if (pathname === '/add-log/' + id) {
      getLogById();
    }
    return () => {
      cancelToken.cancel();
    };
  }, [pathname, id, data]);

  // PROTECT DATA PERSONALITY OF OTHER USER
  if (!user?.user?.admin) {
    return <Navigate to="/protect" replace />;
  }
  return (
    <form onSubmit={registerHandle} className="px-6 py-11 bg-gradient-to-tr bg-white space-y-3 font-semibold text-[#3d3222]">
      <ToastContainer />
      <h1 className="md:text-4xl text-gray-500 mb-6 pb-6 border-b font-bold text-3xl">Tambah Transaksi</h1>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="bookID">
          Book ID
        </label>
        <input
          onChange={handleChange}
          value={book?._id}
          disabled={pathname === '/add-log/' + id ? true : false}
          className="p-[10px] bg-slate-100 rounded-sm outline-input"
          type="text"
          id="bookID"
          name="bookID"
          placeholder="Masukan id buku"
          required
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="nama_peminjam">
          Nama Peminjam
        </label>
        <input onChange={handleChange} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="nama_peminjam" name="nama_peminjam" placeholder="Masukan nama peminjam" required />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="nim">
          NIM
        </label>
        <input onChange={handleChange} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="nim" name="nim" placeholder="Masukan nim mahasiswa" required />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="nomor_hp">
          Nomor Handphone
        </label>
        <input onChange={handleChange} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="nomor_hp" name="nomor_hp" placeholder="Masukan nomor hanphone" required />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="alamat">
          Alamat Lengkap
        </label>
        <textarea ref={textareaElemet} onChange={handleChange} className="resize-y p-[10px] bg-slate-100 rounded-sm outline-input h-[50px]" placeholder="Masukan Alamat" name="alamat" id="alamat" cols="3" rows="3" required></textarea>
      </div>
      <div className="text-center">
        <button disabled={loading} className="bg-yellow-500 w-full py-2 disabled:opacity-30  text-slate-100 hover:text-slate-50 hover:bg-yellow-400" type="submit">
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default FormTransaksi;
