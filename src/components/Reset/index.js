import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { isEmpty, isLength, isMatch } from '../../helper/validate';

const Reset = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [cf_password, setCf_password] = useState('');
  const { token } = useParams();
  console.log(token);
  console.log(password);
  console.log(cf_password);
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isEmpty(password) || isEmpty(cf_password)) {
      setLoading(false);
      return toast('Please fill in all fields.', {
        className: 'toast-failed',
        bodyClassName: 'toast-failed',
      });
    }
    // CHECK LENGTH OF PASS
    if (isLength(password)) {
      setLoading(false);
      return toast('Password must be at least 6 characters.', {
        className: 'toast-failed',
        bodyClassName: 'toast-failed',
      });
    }
    // CHECK PASS AND CONFIR PASS IS MATCH
    if (!isMatch(password, cf_password)) {
      setLoading(false);
      return toast('Password is not match.', {
        className: 'toast-failed',
        bodyClassName: 'toast-failed',
      });
    }
    try {
      await axios.put(
        'http://localhost:4000/api/auth/v1/reset-password',
        { password },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLoading(false);
      handleReset();
      toast('Password was successfully changed 😉', {
        className: 'toast-success',
        bodyClassName: 'toast-success',
      });
    } catch (err) {
      setLoading(false);
      toast(err.response.data.msg, {
        className: 'toast-failed',
        bodyClassName: 'toast-failed',
      });
    }
  };

  const handleReset = () => {
    Array.from(document.querySelectorAll('input')).forEach((input) => (input.value = ''));
    setPassword('');
    setCf_password('');
  };
  return (
    <>
      <ToastContainer />
      <form onSubmit={handleResetPassword} className="px-3 pt-11 pb-16 md:py-11 flex-[0.5] bg-gradient-to-tr from-[rgb(248,248,248)] via-[rgb(136,247,255)] to-[rgb(76,226,237)] h-full space-y-3 font-semibold text-[#3d3222]">
        <h1 className="text-4xl mb-6 pb-6 border-b  font-bold">Reset Password</h1>

        <div className="flex  flex-col space-y-1">
          <label htmlFor="password">New Password</label>
          <input onChange={(e) => setPassword(e.target.value)} className="p-[10px] rounded-sm outline-input" type="password" id="password" name="password" placeholder="Masukan password" />
        </div>
        <div className="flex  flex-col space-y-1">
          <label htmlFor="confirm">Confirm Password</label>
          <input onChange={(e) => setCf_password(e.target.value)} className="p-[10px] rounded-sm outline-input" type="password" id="confirm" name="confirm" placeholder="Konfirmasi password" />
        </div>

        <div className="text-center space-y-3">
          <button className="bg-yellow-500 w-full py-2 text-slate-200 active:text-slate-50" type="submit">
            {loading ? 'Loading...' : 'Reset'}
          </button>
          <span className="block">
            Back to login?{' '}
            <button onClick={() => navigate('/')} className="text-yellow-500 inline-block cursor-pointer font-bold underline">
              Click here
            </button>
          </span>
        </div>
      </form>
    </>
  );
};

export default Reset;
