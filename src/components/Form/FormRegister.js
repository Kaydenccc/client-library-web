import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isEmail, isEmpty, isLength, isMatch } from '../../helper/validate';
const server_url = 'https://server-library-web-production.up.railway.app';
const inisialState = {
  email: '',
  username: '',
  nim: '',
  angkatan: '',
  profesi: '',
  nomor_hp: '',
  alamat: '',
  password: '',
  image: null,
};
const FormRegister = () => {
  const { user } = useSelector((state) => state.login);
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(inisialState);
  const textareaElemet = useRef();
  const selectElemet = useRef();
  const [confirm_pass, setConfirm_pass] = useState('');
  const { email, username, profesi, nomor_hp, alamat, password, angkatan, nim } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    Array.from(document.querySelectorAll('input')).forEach((input) => (input.value = ''));
    textareaElemet.current.value = '';
    selectElemet.current.value = '';
    setData({ ...data, password: '', email: '', username: '', profesi: '', nomor_hp: '', alamat: '', nim: '', angkatan: '' });
    setConfirm_pass('');

    setLoading(false);
  };
  const registerHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    // check field
    if (isEmpty(email) || isEmpty(password) || isEmpty(username) || isEmpty(profesi) || isEmpty(nomor_hp) || isEmpty(alamat) || isEmpty(angkatan) || isEmpty(nim)) {
      setLoading(false);
      return toast('Please fill in all fields.', {
        className: 'toast-failed',
        bodyClassName: 'toast-failed',
      });
    }
    // chech email
    if (!isEmail(email)) {
      setLoading(false);
      return toast('Please enter a valid email address.', {
        className: 'toast-failed',
        bodyClassName: 'toast-failed',
      });
    }
    // check password
    if (isLength(password)) {
      setLoading(false);
      return toast('Password must be at least 6 characters.', {
        className: 'toast-failed',
        bodyClassName: 'toast-failed',
      });
    }
    // check match password
    if (!isMatch(password, confirm_pass)) {
      setLoading(false);
      return toast('Password is not match.', {
        className: 'toast-failed',
        bodyClassName: 'toast-failed',
      });
    }
    try {
      const res = await axios.post(server_url + '/api/auth/v1/register', data);
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
  if (user?.user?.admin !== undefined) {
    if (!user?.user?.admin) {
      return <Navigate to="/protect" replace />;
    }
  }
  return (
    <form onSubmit={registerHandle} className="px-6 py-11 bg-gradient-to-tr bg-white space-y-3 font-semibold text-[#3d3222]">
      <h1 className="text-3xl md:text-4xl text-gray-500 mb-6 pb-6 border-b font-bold">Register Account</h1>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="nama">
          Nama Lengkap
        </label>
        <input onChange={handleChange} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="nama" name="username" placeholder="Masukan nama mahasiswa" required />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="email">
          Email
        </label>
        <input onChange={handleChange} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="email" id="email" name="email" placeholder="Masukan email" required />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="nim">
          NIM / NIP
        </label>
        <input onChange={handleChange} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="nim" name="nim" placeholder="Masukan nim mahasiswa" required />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="angkatan">
          Angkatan
        </label>
        <input onChange={handleChange} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="angkatan" name="angkatan" placeholder="Angkatan" required />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="profesi">
          Profesi
        </label>
        <select ref={selectElemet} onChange={handleChange} name="profesi" id="profesi" className="p-[10px] bg-slate-100 rounded-sm outline-input">
          <option value="">--Pilih Profesi--</option>
          <option value="Dose">Dosen</option>
          <option value="Mahasiswa">Mahasiswa</option>
        </select>
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
        <textarea ref={textareaElemet} onChange={handleChange} className="resize-y p-[10px] bg-slate-100 rounded-sm outline-input h-[50px]" placeholder="Masukan Alamat" name="alamat" id="alamat" cols="10" rows="10" required></textarea>
      </div>
      <div className="flex flex-col space-y-1">
        <label className="cursor-pointer" htmlFor="password">
          Password
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
        <button disabled={loading} className="bg-yellow-500 w-full py-2 disabled:bg-gray-500 text-slate-100 hover:text-slate-50 hover:bg-yellow-400" type="submit">
          {loading ? 'Loading...' : 'Register'}
        </button>
      </div>
    </form>
  );
};

export default FormRegister;
