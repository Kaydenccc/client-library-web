import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { isEmail } from '../../helper/validate';

const server_url = 'https://server-library-web.vercel.app';
const Forgot = ({ setForgot }) => {
  const [loading, setLoading] = useState(null);
  const [email, setEmail] = useState('');
  const handleForgotPass = async (e) => {
    e.preventDefault();
    setLoading(true);
    // chech email
    if (!isEmail(email)) {
      setLoading(false);
      return toast('Please enter a valid email address.', {
        className: 'toast-failed',
        bodyClassName: 'toast-failed',
      });
    }
    try {
      await axios.post(server_url + `/api/auth/v1/forgot-password`, { email });
      setLoading(false);
      handleReset();
      toast('We send you an email, Please check your email 📧', {
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
  };
  const handleReset = () => {
    Array.from(document.querySelectorAll('input')).forEach((input) => (input.value = ''));
    setEmail('');
  };
  return (
    <>
      <ToastContainer />
      <form onSubmit={handleForgotPass} className="px-3 pt-11 pb-16 md:py-11 flex-[0.5] bg-gradient-to-tr from-[rgb(248,248,248)] via-[rgb(136,247,255)] to-[rgb(76,226,237)] h-full space-y-3 font-semibold text-[#3d3222]">
        <h1 className="text-4xl mb-6 pb-6 border-b  font-bold">Enter your email</h1>
        <div className="flex  flex-col space-y-1">
          <label htmlFor="email">Email</label>
          <input onChange={(e) => setEmail(e.target.value)} className="p-[10px] rounded-sm outline-input" type="email" id="email" name="email" placeholder="Masukan email" />
        </div>

        <div className="text-center space-y-3">
          <button disabled={loading} className="bg-yellow-500 disabled:bg-gray-600 w-full py-2 text-slate-200 active:text-slate-50" type="submit">
            {loading ? 'Loading...' : 'Send'}
          </button>
          <p>
            Remember password ?{' '}
            <span onClick={() => setForgot(false)} className="text-yellow-500 cursor-pointer underline">
              Click Here
            </span>
          </p>
        </div>
      </form>
    </>
  );
};

export default Forgot;
