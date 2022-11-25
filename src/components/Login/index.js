import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { isEmail, isEmpty } from '../../helper/validate';
import { useDispatch } from 'react-redux';
import { getUserData, isLogin } from '../../features/loginSlice';

const ACCET_ADMIN = {
  email: 'admin@gmail.com',
  password: 'admin99',
  admin: true,
  username: 'Admin',
  profesi: 'Admin',
  image: 'https://res.cloudinary.com/diqsivizd/image/upload/v1668267193/LIBRARY/user_image/pngegg_qhoull.png',
};
const inisialState = {
  email: '',
  password: '',
};
const Login = ({ setForgot }) => {
  const [data, setData] = useState(inisialState);
  const [loading, setLoading] = useState(null);
  const { email, password } = data;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email === ACCET_ADMIN.email && password === ACCET_ADMIN.password) {
      dispatch(getUserData(ACCET_ADMIN));
    }
    if (isEmpty(email) || isEmpty(password)) {
      // check field
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
    try {
      const res = await axios.post('https://library-perpus.herokuapp.com/api/auth/v1/login', data);
      localStorage.setItem('_appSigning', true);
      setLoading(false);
      toast(res.data.msg, {
        className: 'toast-success',
        bodyClassName: 'toast-success',
      });
      dispatch(isLogin(true));
    } catch (err) {
      setLoading(false);
      if (err.response)
        return toast(err.response.data.msg, {
          className: 'toast-failed',
          bodyClassName: 'toast-failed',
        });
    }
    handleReset();
  };

  const handleReset = () => {
    Array.from(document.querySelectorAll('input')).forEach((input) => (input.value = ''));
    setData({ ...data, email: '', password: '' });
  };
  return (
    <>
      <ToastContainer />
      <form onSubmit={loginHandle} className="px-3 pt-11 pb-16 md:py-11 flex-[0.5] bg-gradient-to-tr from-[rgb(248,248,248)] via-[rgb(136,247,255)] to-[rgb(76,226,237)] h-full space-y-3 font-semibold text-[#3d3222]">
        <h1 className="text-4xl mb-6 pb-6 border-b  font-bold">Login Auth</h1>
        <div className="flex  flex-col space-y-1">
          <label htmlFor="email">Email</label>
          <input onChange={handleChange} className="p-[10px] rounded-sm outline-input" type="email" id="nama" name="email" placeholder="Masukan email" />
        </div>

        <div className="flex  flex-col space-y-1">
          <label htmlFor="password">Password</label>
          <input onChange={handleChange} className="p-[10px] rounded-sm outline-input" type="password" id="password" name="password" placeholder="Masukan password" />
        </div>

        <div className="text-center space-y-3">
          <button disabled={loading} className="bg-yellow-500 disabled:bg-gray-500 w-full py-2 text-slate-200 active:text-slate-50" type="submit">
            {loading ? 'Loading...' : 'Login'}
          </button>
          <p>
            Forgot password ?{' '}
            <span onClick={() => setForgot(true)} className="text-yellow-500 cursor-pointer">
              Click Here
            </span>
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
