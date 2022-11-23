import axios from 'axios';
import { isLogin } from '../features/loginSlice';

export const signOut = async (e) => {
  e.preventDefault();
  let dispatch;
  try {
    await axios.get('http://localhost:4000/api/auth/v1/signout');
    localStorage.removeItem('_appSigning');
    dispatch(isLogin(false));
  } catch (err) {
    console.log(err);
  }
};
