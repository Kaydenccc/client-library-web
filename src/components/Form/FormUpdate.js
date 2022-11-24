import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isEmpty, isMatch } from '../../helper/validate';

const inisialState = {
  email: '',
  username: '',
  nim: '',
  angkatan: '',
  profesi: '',
  nomor_hp: '',
  alamat: '',
  password: '',
};
const FormUpdate = () => {
  const [loading, setLoading] = useState(null);
  // const [user, setUser] = useState('');
  const [data, setData] = useState(inisialState);
  const textareaElemet = useRef();
  const selectElemet = useRef();
  const [confirm_pass, setConfirm_pass] = useState('');
  const { password } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    Array.from(document.querySelectorAll('input')).forEach((input) => (input.value = ''));
    textareaElemet.current.value = '';
    selectElemet.current.value = '';
    setData({ ...data, email: '', username: '', profesi: '', nomor_hp: '', alamat: '', password: '', nim: '', angkatan: '' });
    setConfirm_pass('');
    setLoading(false);
  };
  // if update data. get old data user
  const { userIdUpdate } = useParams();
  const { user } = useSelector((state) => state.login);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`https://library-perpus.herokuapp.com/api/auth/v1/user/${userIdUpdate}`);
        // setUser(res.data.data);
        setData({ ...res.data.data });
      } catch (err) {
        return toast(err.response.data.msg, {
          className: 'toast-failed',
          bodyClassName: 'toast-failed',
        });
      }
    };
    getUser();
  }, [userIdUpdate]);
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!isEmpty(password) && !isEmpty(confirm_pass)) {
      if (!isMatch(password, confirm_pass)) {
        return toast('Password is not match.', {
          className: 'toast-failed',
          bodyClassName: 'toast-failed',
        });
      }
    }
    try {
      const res = await axios.put(`https://library-perpus.herokuapp.com/api/auth/v1/user/${userIdUpdate}`, data);
      setData(res.data.data);
      setLoading(false);
      toast(res.data.msg, {
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

  // PROTECT DATA PERSONALITY OF OTHER USER
  if (!user?.user?.admin && userIdUpdate !== user.user?._id) {
    return <Navigate to="/protect" replace />;
  }

  return (
    <form onSubmit={handleUpdateUser} className="px-[8px] md:px-6 py-11 bg-gradient-to-tr bg-white space-y-3 font-semibold text-[#3d3222]">
      <h1 className="text-4xl text-gray-500 mb-6 pb-6 border-b font-bold">Update Account</h1>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="nama">
          Nama Lengkap
        </label>
        <input onChange={handleChange} value={data.username} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="nama" name="username" placeholder="Masukan nama mahasiswa" required />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="email">
          Email
        </label>
        <input onChange={handleChange} value={data.email} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="email" id="email" name="email" placeholder="Masukan email" required />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="nim">
          NIM
        </label>
        <input onChange={handleChange} value={data.nim} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="nim" name="nim" placeholder="Masukan nim mahasiswa" />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="angkatan">
          Angkatan
        </label>
        <input onChange={handleChange} value={data.angkatan} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="angkatan" name="angkatan" placeholder="Angkatan" required />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="profesi">
          Profesi <span className="text-[12px] text-yellow-600">*(Kosongkan jika tidak diubah)</span>
        </label>
        <select ref={selectElemet} onChange={handleChange} name="profesi" id="profesi" value={data.profesi} className="p-[10px] bg-slate-100 rounded-sm outline-input">
          <option value="">--Pilih Profesi--</option>
          <option value="Admin">Admin</option>
          <option value="Dosen">Dosen</option>
          <option value="Mahasiswa">Mahasiswa</option>
        </select>
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="nomor_hp">
          Nomor Handphone
        </label>
        <input onChange={handleChange} value={data.nomor_hp} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="nomor_hp" name="nomor_hp" placeholder="Masukan nomor hanphone" required />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="alamat">
          Alamat Lengkap
        </label>
        <textarea
          ref={textareaElemet}
          value={data.alamat}
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
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="password">
          New password <span className="text-[12px] text-yellow-600">*(Kosongkan jika tidak diubah)</span>
        </label>
        <input onChange={handleChange} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="password" id="password" name="password" placeholder="Masukan password" />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="cf_password">
          Konfirmasi Password
        </label>
        <input onChange={(e) => setConfirm_pass(e.target.value)} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="password" id="cf_password" name="cf_password" placeholder="Masukan konfirmasi password" />
      </div>
      <div className="text-center">
        <button disabled={loading} className="bg-yellow-500 w-full py-2  text-slate-100 disabled:bg-gray-500 hover:text-slate-50 hover:bg-yellow-400" type="submit">
          {loading ? 'Loading...' : 'Update'}
        </button>
      </div>
    </form>
  );
};

export default FormUpdate;
