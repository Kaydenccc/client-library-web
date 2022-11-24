import React, { useEffect, useState } from 'react';
import { IoIosPeople } from 'react-icons/io';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Table = ({ tableName = 'Data Users', icon }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [userId, setUserId] = useState('');
  const [search, setSearch] = useState('');
  const [skip, setSkip] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const getUsers = async () => {
      try {
        if (filter === 'all') {
          const res = await axios.get(`https://library-perpus.herokuapp.com/api/auth/v1/users/pagination?skip=${skip}`, {
            cancelToken: cancelToken.token,
          });
          if (res.data.data.length === 0) {
            setMessage('Upss, Not found the book');
            return;
          }
          setUsers([...users, ...res.data.data]);
          return;
        } else {
          const res = await axios.get('https://library-perpus.herokuapp.com/api/auth/v1/users', {
            cancelToken: cancelToken.token,
          });
          if (res.data.data.length === 0) {
            setMessage('Upss, Not found the book');
            return;
          }
          let filterUsers;
          switch (filter) {
            case 'admin':
              filterUsers = res.data.data.filter((user) => user.admin === true);
              break;
            case 'dosen':
              filterUsers = res.data.data.filter((user) => user.profesi.toLowerCase() === 'dosen');
              break;
            case 'mahasiswa':
              filterUsers = res.data.data.filter((user) => user.profesi.toLowerCase() === 'mahasiswa');
              break;
            default:
          }
          setUsers(filterUsers);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled!');
        }
        console.log(err.message);
      }
    };
    getUsers();
    return () => {
      cancelToken.cancel();
    };
  }, [userId, dispatch, filter]);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://library-perpus.herokuapp.com/api/auth/v1/user/${id}`);
    } catch (err) {
      console.log(err);
    }
    setUserId(id);
  };

  const searchUser = async (e) => {
    e.preventDefault();
    setUsers('');
    try {
      const res = await axios.get(`https://library-perpus.herokuapp.com/api/auth/v1/search/${search}`);
      setMessage(null);
      setUsers(res.data.data);
    } catch (err) {
      if (err.response.status === 404) {
        setMessage('Upss, Not found the book');
      }
      console.log(err);
    }
    setSearch('');
  };

  //HANDLE SCROLL
  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    if (offsetHeight + scrollTop >= scrollHeight - 100) {
      setSkip(users?.length);
    }
  };
  return (
    <div className="h-full flex flex-col">
      <div className="w-full flex md:flex-row flex-col items-start md:items-center justify-between mb-3">
        <h3 className="text-lg font-semibold flex justify-start gap-2 items-center ">
          <IoIosPeople className="text-2xl" />
          {tableName}
        </h3>

        <form onSubmit={searchUser} className="flex md:w-fit w-full gap-2 md:flex-row flex-col items-start md:items-center  font-semibold">
          <button type="submit">Search by name: </button>
          <input onChange={(e) => setSearch(e.target.value)} value={search} className="px-[10px] md:w-fit w-full py-1 placeholder:text-[14px]" type="text" placeholder="Search user" />
        </form>
      </div>
      {pathname === '/data-users' ? (
        <div className="w-full flex flex-col overflow-hidden bg-white shadow-sm md:py-0 py-6">
          <div className="flex px-[8px] md:px-4  justify-between md:flex-row  flex-col items-center">
            {icon}
            <button onClick={() => navigate('/register')} className="px-4 mt-4 self-start md:self-center md:text-[16px] text-[14px] mr-4 h-fit bg-blue-500 hover:bg-blue-400 text-white py-2 rounded-md shadow-sm font-medium">
              Add User
            </button>
          </div>
          <label htmlFor="filter" className="p-2 block  w-fit">
            Filter:{' '}
            <select
              onChange={(e) => {
                setUsers([]);
                setFilter(e.target.value);
              }}
              className="border-2 md:text-[18] text-[12px] px-2 py-[3px]  p-2 "
              name="filter"
              id="filter"
            >
              <option value="all">Semua</option>
              <option value="admin">Admin</option>
              <option value="dosen">Dosen</option>
              <option value="mahasiswa">Mahasiswa</option>
            </select>
          </label>
        </div>
      ) : null}
      <div className="flex-1 flex w-full whitespace-nowrap flex pb-6 md:pb-0 flex-col h-full bg-white p-2 md:p-6   shadow-sm overflow-hidden overflow-x-auto scroll-thumb">
        <table className="w-[1150px] md:w-full">
          <thead className="   ">
            <tr className="text-left flex mr-[10px] p-2 border-b">
              <th className="flex-[0.5] overflow-hidden">No.</th>
              <th className="flex-[1]">Nim</th>
              <th className="flex-[0.8]">Nama</th>
              <th className="flex-[1]">Email</th>
              <th className="flex-[0.7]">Angkatan</th>
              <th className="flex-[0.5]">Profesi</th>
              <th className="flex-[0.5]">Action</th>
            </tr>
          </thead>
          <tbody onScroll={handleScroll} className="w-full h-full min-h-[500px] md:h-auto flex flex-[1] flex-col scroll-smooth overflow-y-auto scroll-thumb ">
            {users?.length > 0 ? (
              users.map((user, i) => (
                <tr key={i} className=" table-row row cursor-pointer">
                  <td onClick={() => navigate('/detail-user/' + user._id)} className="flex-[0.5]">
                    {i + 1}
                  </td>
                  <td onClick={() => navigate('/detail-user/' + user._id)} className="flex-[1]">
                    {user.nim}
                  </td>
                  <td onClick={() => navigate('/detail-user/' + user._id)} className="flex-[0.8]">
                    {user.username}
                  </td>
                  <td onClick={() => navigate('/detail-user/' + user._id)} className="flex-[1]">
                    {user.email}
                  </td>
                  <td onClick={() => navigate('/detail-user/' + user._id)} className="flex-[0.7]">
                    {user.angkatan}
                  </td>
                  <td onClick={() => navigate('/detail-user/' + user._id)} className="flex-[0.5]">
                    {user.profesi}
                  </td>
                  <td className="flex-[0.5] flex gap-2 items-center">
                    <AiFillEdit onClick={() => navigate('/update-user/' + user._id)} className="text-blue-500 cursor-pointer" />
                    <MdDelete onClick={() => deleteUser(user._id)} className="text-red-500 cursor-pointer" />
                  </td>
                </tr>
              ))
            ) : message ? (
              <tr>
                <td>"Upss, Data not found"</td>
              </tr>
            ) : (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
