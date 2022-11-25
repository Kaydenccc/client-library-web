import './App.css';
import { Routes, Route } from 'react-router-dom';
import Auth from './Pages/auth/Auth';
import ResetPage from './Pages/auth/ResetPage';
import { getToken, getUserData, isLogin } from './features/loginSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import Home from './Pages/Home';
import DashboardMember from './components/DasboardMember';
import Datausers from './components/Datausers';
import Books from './components/Books/Books';
import Register from './components/Register';
import FormAddBook from './components/Form/FormAddBook';
import DetailBook from './components/DetailBook/DetailBook';
import RiwayatTransaksi from './components/RiwayatTransaksi/RiwayatTransaksi';
import FormTransaksi from './components/Form/FormTransaksi';
import FormUpdateTransaksi from './components/Form/FormUpdateTransaksi';
import DetailLog from './components/DetailLog/DetailLog';
import DetailUser from './components/DetailUser/DetailUser';
import Protect from './components/Protect/Protect';
import NotFound from './Pages/NotFound/NotFound';
axios.defaults.withCredentials = true;
export let admin = false;
function App() {
  const { accessToken, user, isLoggedin } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    const _appSigning = localStorage.getItem('_appSigning');

    if (_appSigning) {
      if (user?.user?.email === 'admin@gmail.com' && user?.user?.password === 'admin99') {
        return;
      }
      const getAccessToken = async () => {
        try {
          const res = await axios.get('https://library-perpus.herokuapp.com/api/auth/v1/access', {
            withCredentials: true,
          });

          dispatch(getToken(res.data.ac_token));
        } catch (err) {
          console.log(err);
        }
      };
      getAccessToken();
    }
  }, [dispatch, isLoggedin, user?.user?.email, user?.user?.password]);

  //get user data
  useEffect(() => {
    if (accessToken) {
      const getUser = async () => {
        dispatch(isLogin(true));
        const res = await axios.get('https://library-perpus.herokuapp.com/api/auth/v1/user', {
          headers: {
            Authorization: accessToken,
          },
        });
        dispatch(getUserData(res.data));
      };
      getUser();
    }
  }, [dispatch, accessToken]);

  return (
    <div className="App w-full md:w-full xl:w-[1440px] xl:mx-auto">
      <Routes>
        <Route path="/" element={isLoggedin ? <Home /> : <Auth />}>
          <Route path="/" element={<DashboardMember />} />
          <Route path="data-users" element={<Datausers />} />
          <Route path="daftar-buku" element={<Books />} />
          <Route path="register" element={<Register />} />
          <Route path="update-user/:userIdUpdate" element={<Register />} />
          <Route path="add-book" element={<FormAddBook />} />
          <Route path="add-log" element={<FormTransaksi />} />
          <Route path="add-log/:id" element={<FormTransaksi />} />
          <Route path="update-log/:id" element={<FormUpdateTransaksi />} />
          <Route path="detail-log/:id" element={<DetailLog />} />
          <Route path="detail-book/:id" element={<DetailBook />} />
          <Route path="detail-user/:id" element={<DetailUser />} />
          <Route path="update-book/:id" element={<FormAddBook />} />
          <Route path="riwayat-transaksi" element={<RiwayatTransaksi />} />
        </Route>
        <Route path="protect" element={<Protect />} />
        <Route path="auth/reset/:token" element={<ResetPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
