import axios from 'axios';
import { isLogin } from '../features/loginSlice';
const server_url = 'https://server-library-web-production.up.railway.app';
export const signOut = async (e) => {
  e.preventDefault();
  let dispatch;
  try {
    await axios.get(server_url + '/api/auth/v1/signout');
    localStorage.removeItem('_appSigning');
    dispatch(isLogin(false));
  } catch (err) {
    console.log(err);
  }
};
