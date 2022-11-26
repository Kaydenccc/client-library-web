import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { GiWhiteBook } from 'react-icons/gi';
import { ImBooks } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { getTotalBooks } from '../../features/totalSlice';
import BookMember from '../Book/BookMember';
import Card from '../Card';
import PopModal from '../PopModal/PopModal';

// CATEGORY
const categories = ['Umum', 'Seni & Musik', 'Biografi', 'Bisnis', 'Komik', 'Komputer & Teknologi', 'Pendidikan & Referensi', 'Cooking', 'Hiburan', 'Sejarah', 'Self-Help', 'Agama', 'Medis', 'Sains'];
const Books = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [reload, setReload] = useState(false);
  const [books, setBooks] = useState([]);
  const selectElemet = useRef();
  const [filter, setFilter] = useState('All');
  const { totalBooks } = useSelector((state) => state.total);
  const [skip, setSkip] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const [isEnd, setIsEnd] = useState(false);
  const { user } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const booksHeight = useRef();

  const [id, setId] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const [openPop, setOpenPop] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const getBoosks = async () => {
      setIsEnd(false);
      try {
        const res = await axios.get(`https://library-perpus.herokuapp.com/api/books/v1/get/pagination?skip=${skip}&perPage=${perPage}`, {
          cancelToken: cancelToken.token,
        });
        dispatch(getTotalBooks(res.data.totalData));
        if (res.data.data.length === 0) {
          return setIsEnd(true);
        }
        if (filter === 'All') {
          setBooks([...books, ...res.data.data]);
        } else {
          let filterBooks = res.data.data.filter((user) => user.category === filter);
          setIsEnd(true);
          setBooks(filterBooks);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled!');
        } else {
          console.log(err.message);
        }
      }
    };
    const offsetHeight = booksHeight.current.offsetHeight;
    if (offsetHeight > 1023.59) {
      setPerPage(20);
    }
    getBoosks();
    return () => {
      cancelToken.cancel();
    };
  }, [reload, dispatch, filter, skip, perPage]);

  // DELETE BOOK
  const deleteBook = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`https://library-perpus.herokuapp.com/api/books/v1/delete/book/${id}`);
      setIsDelete(false);
      setOpenPop(false);
      setLoading(false);
      setReload(!reload);
      toast('Delete Success', {
        className: 'toast-success',
        bodyClassName: 'toast-success',
      });
    } catch (err) {
      setOpenPop(false);
      setLoading(false);
      toast('Delete Failed', {
        className: 'toast-failed',
        bodyClassName: 'toast-failed',
      });
      console.log(err);
    }
  };

  useEffect(() => {
    if (isDelete) {
      deleteBook(id);
    }
  }, [id, isDelete]);
  // SEARCH BOOK
  const searchBook = async (e) => {
    e.preventDefault();
    setBooks('');
    try {
      const res = await axios.get(`https://library-perpus.herokuapp.com/api/books/v1/get/search/${search}`);
      if (res.data.data.length > 1) {
        setMessage(null);
        setBooks([...res.data.data].reverse());
      } else {
        setMessage('You have seen all of book');
      }
    } catch (err) {
      console.log(err);
    }
    setSearch('');
  };

  //HANDLE SCROLL
  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    if (offsetHeight + scrollTop >= scrollHeight - 500) {
      setSkip(books?.length);
    }
  };

  return (
    <div onScroll={handleScroll} ref={booksHeight} className="flex-[1] flex-col flex bg-slate-200 pt-8 pb-2 px-[8px] md:px-6 overflow-y-auto scroll-smooth scroll-thumb-sm md:scroll-thumb">
      {openPop ? <PopModal loading={loading} setIsDelete={setIsDelete} setOpenPop={setOpenPop} text="Are you sure to delete this ?" /> : null}
      <>
        <ToastContainer />
        <div className="flex justify-between items-start md:space-y-0 space-y-2 md:items-center md:flex-row flex-col text-black/70 mb-4">
          <p className="text-xl font-bold">Daftar Buku</p>
          <p>
            <span className="text-blue-600">Beranda</span> / Daftar Buku
          </p>
        </div>
        <div className="w-full flex items-end  md:items-center justify-between mb-3">
          <h3 className="text-lg font-semibold flex justify-start gap-2 items-center ">
            <ImBooks className="text-2xl" />
          </h3>

          <form onSubmit={searchBook} className="flex gap-2 md:items-center items-end md:flex-row flex-col  font-semibold">
            <button type="submit">Search by title: </button>
            <input
              onChange={(e) => {
                setBooks([]);
                setSearch(e.target.value);
              }}
              value={search}
              className="px-[10px] py-1 placeholder:text-[14px]"
              type="text"
              placeholder="Search book"
            />
          </form>
        </div>
      </>
      <div className="flex flex-col h-auto w-full bg-white pb-6 px-2 md:px-6 shadow-sm">
        <div className="flex md:flex-row flex-col justify-between items-center py-4 my-4 border-b-2">
          <Card total={totalBooks} className="flex items-center  gap-4 text-left justify-between w-fit p-4 " text="Total buku" icon={<GiWhiteBook className="text-6xl text-white" />} />
          <div className="flex md:w-fit w-full md:justify-between md:flex-row-reverse flex-col-reverse  gap-4 items-start md:items-center">
            <label htmlFor="filter" className="p-2 block w-fit">
              <strong className="tracking-wide">Filter:</strong>{' '}
              <select
                ref={selectElemet}
                onChange={(e) => {
                  setBooks([]);
                  setFilter(e.target.value);
                }}
                name="category"
                id="category"
                className="p-[5px] md:p-[10px] bg-slate-100 rounded-sm outline-input"
              >
                <option value="All">Semua</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </label>
            {user?.user?.admin && (
              <button onClick={() => navigate('/add-book')} className="px-4 mt-4 md:mt-0 self-start md:self-center md:text-[16px] text-[14px] mr-4 h-fit bg-blue-500 hover:bg-blue-400 text-white py-2 rounded-md shadow-sm font-medium">
                Add Book
              </button>
            )}
          </div>
        </div>
        <div className={`grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 gap-y-2 overflow-hidden`}>{books?.length > 0 ? books.map((buku) => <BookMember setId={setId} setOpenPop={setOpenPop} key={buku._id} {...buku} />) : null}</div>
        <div className="text-center w-full p-2">{isEnd ? <p>No more book!</p> : <p>Loading..</p>}</div>
      </div>
    </div>
  );
};

export default Books;
