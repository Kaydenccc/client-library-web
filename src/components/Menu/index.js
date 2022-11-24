import React, { useEffect, useState } from 'react';
import { ImBooks, ImHome2, ImFolderOpen } from 'react-icons/im';
import { MdLibraryBooks } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { setCloseSide } from '../../features/routeSlice';

const menuItems = [
  { text: 'Dashboard', route: '/', icon: <ImHome2 className="inline-block text-2xl" /> },
  { text: 'Data Users', route: '/data-users', icon: <ImFolderOpen className="inline-block text-2xl" /> },
  { text: 'Daftar Buku', route: '/daftar-buku', icon: <ImBooks className="inline-block text-2xl" /> },
  { text: 'Riwayat Transaksi', route: '/riwayat-transaksi', icon: <MdLibraryBooks className="inline-block text-2xl" /> },
];
const menuItemsForMember = [
  { text: 'Dashboard', route: '/', icon: <ImHome2 className="inline-block text-2xl" /> },
  { text: 'Daftar Buku', route: '/daftar-buku', icon: <ImBooks className="inline-block text-2xl" /> },
  { text: 'Riwayat Transaksi', route: '/riwayat-transaksi', icon: <MdLibraryBooks className="inline-block text-2xl" /> },
];
const Menu = () => {
  const { pathname } = useLocation();
  const [active, setActive] = useState(pathname);
  const { closeSide } = useSelector((state) => state.route);
  const { user } = useSelector((state) => state.login);
  const activeStyle = 'bg-slate-800 text-white';
  const dispatch = useDispatch();
  useEffect(() => {
    setActive(pathname);
  }, [pathname]);
  return (
    <ul className="text-white/70 ">
      {user?.user?.admin
        ? menuItems.map((menu) => (
            <Link
              to={menu.route}
              key={menu.text}
              className={`${active === menu.route ? activeStyle : ''} text-lg ${closeSide ? 'justify-center' : 'px-6'} cursor-pointer flex  items-center gap-6 hover:text-white hover:bg-slate-800 py-4 w-full `}
              onClick={() => dispatch(setCloseSide())}
            >
              {menu.icon}
              {!closeSide && menu.text}
            </Link>
          ))
        : menuItemsForMember.map((menu) => (
            <Link
              to={menu.route}
              key={menu.text}
              className={`${active === menu.route ? activeStyle : ''} text-lg ${closeSide ? 'justify-center' : 'px-6'} cursor-pointer flex  items-center gap-6 hover:text-white hover:bg-slate-800 py-4 w-full `}
              onClick={() => dispatch(setCloseSide())}
            >
              {menu.icon}
              {!closeSide && menu.text}
            </Link>
          ))}
    </ul>
  );
};

export default Menu;
