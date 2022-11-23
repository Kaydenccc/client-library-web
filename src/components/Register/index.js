import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer.js';
import FormRegister from '../Form/FormRegister.js';
import FormUpdate from '../Form/FormUpdate.js';

const Register = ({ text }) => {
  const { pathname } = useLocation();
  const { userIdUpdate } = useParams();
  return (
    <div className="flex-[1] flex-col flex bg-slate-200 py-8 px-[8px] md:px-6 overflow-y-scroll">
      <ToastContainer />
      {pathname === '/register' ? <FormRegister /> : null}
      {pathname === '/update-user/' + userIdUpdate ? <FormUpdate /> : null}
      <Footer />
    </div>
  );
};

export default Register;
