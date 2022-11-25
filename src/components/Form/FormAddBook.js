import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { isEmpty } from '../../helper/validate';
import { BiImageAdd } from 'react-icons/bi';
import imageBook from '../../assets/book.png';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// CATEFORIES
const categories = ['Umum', 'Seni & Musik', 'Biografi', 'Bisnis', 'Komik', 'Komputer & Teknologi', 'Pendidikan & Referensi', 'Cooking', 'Hiburan', 'Sejarah', 'Self-Help', 'Agama', 'Medis', 'Sains'];
const inisialState = {
  title: '',
  category: '',
  image: null,
  releaseAt: '',
  isbn: '',
  jumlah_buku: '',
  jumlah_halaman: '',
  penerbit: '',
  author: '',
  description: '',
};
const FormAddBook = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { user } = useSelector((state) => state.login);
  const [loading, setLoading] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [data, setData] = useState(inisialState);
  const textareaElemet = useRef();
  const selectElemet = useRef();
  const { title, category, image, releaseAt, isbn, jumlah_buku, jumlah_halaman, penerbit, author, description } = data;
  // GET DATA BOOK BY ID PARAM
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const getById = async () => {
      try {
        const res = await axios.get(`https://library-perpus.herokuapp.com/api/books/v1/get/book/${id}`, {
          cancelToken: cancelToken.token,
        });
        setData(res.data.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled!');
        } else {
          console.log(err);
        }
      }
    };
    getById();
    return () => {
      cancelToken.cancel();
    };
  }, [id]);
  const handleChange = (e) => {
    if (e.target.files?.length > 0) {
      setData({ ...data, [e.target.name]: e.target.files[0] });
      const file = e.target.files[0];
      setPreviewAvatar(URL.createObjectURL(file));
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };
  const handleReset = () => {
    Array.from(document.querySelectorAll('input')).forEach((input) => (input.value = ''));
    textareaElemet.current.value = '';
    selectElemet.current.value = '';
    setData({ ...data, title: '', category: '', image: null, releaseAt: '', isbn: '', jumlah_buku: '', jumlah_halaman: '', penerbit: '', author: '', description: '' });
    setPreviewAvatar(null);
    setLoading(false);
  };
  const addBookHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (pathname === '/add-book') {
      // check field
      if (isEmpty(title) || isEmpty(category) || isEmpty(releaseAt) || isEmpty(jumlah_buku) || isEmpty(jumlah_halaman) || isEmpty(penerbit) || isEmpty(author) || isEmpty(description)) {
        setLoading(false);
        return toast('Please fill in all fields.', {
          className: 'toast-failed',
          bodyClassName: 'toast-failed',
        });
      }
      try {
        if (image) {
          const formdata = new FormData();
          formdata.append('image', image);
          formdata.append('title', title);
          formdata.append('category', category);
          formdata.append('releaseAt', releaseAt);
          formdata.append('isbn', isbn);
          formdata.append('jumlah_buku', jumlah_buku);
          formdata.append('jumlah_halaman', jumlah_halaman);
          formdata.append('penerbit', penerbit);
          formdata.append('author', author);
          formdata.append('description', description);
          await axios.post('https://library-perpus.herokuapp.com/api/books/v1/add/book', formdata, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          await axios.post('https://library-perpus.herokuapp.com/api/books/v1/add/book', data);
        }
        toast('Add book successfully', {
          className: 'toast-success',
          bodyClassName: 'toast-success',
        });
        setLoading(false);
      } catch (err) {
        setLoading(false);
        return toast(err.response.data.msg, {
          className: 'toast-failed',
          bodyClassName: 'toast-failed',
        });
      }
    } else {
      try {
        if (image) {
          const formdata = new FormData();
          formdata.append('image', image);
          formdata.append('title', title);
          formdata.append('category', category);
          formdata.append('releaseAt', releaseAt);
          formdata.append('isbn', isbn);
          formdata.append('jumlah_buku', jumlah_buku);
          formdata.append('jumlah_halaman', jumlah_halaman);
          formdata.append('penerbit', penerbit);
          formdata.append('author', author);
          formdata.append('description', description);
          await axios.put(`https://library-perpus.herokuapp.com/api/books/v1/update/book/${id}`, formdata, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          await axios.put(`https://library-perpus.herokuapp.com/api/books/v1/update/book/${id}`, data);
        }
        setLoading(false);
        toast('Update successfully', {
          className: 'toast-success',
          bodyClassName: 'toast-success',
        });
      } catch (err) {
        setLoading(false);
        return toast('Update Failed', {
          className: 'toast-failed',
          bodyClassName: 'toast-failed',
        });
      }
    }

    handleReset();
  };
  console.log('PREVIEW: ', previewAvatar);
  // PROTECT DATA PERSONALITY OF OTHER USER
  if (!user?.user?.admin && id !== user?.user?._id) {
    return <Navigate to="/protect" replace />;
  }
  return (
    <div className="flex-[1] flex-col flex bg-slate-200 py-8 px-[8px] md:px-6 overflow-y-scroll">
      <ToastContainer />

      {pathname === '/update-book/' + id ? (
        <form onSubmit={addBookHandle} className="px-6 py-11 bg-gradient-to-tr bg-white space-y-3 font-semibold text-[#3d3222]">
          <h1 className="text-4xl text-gray-500 mb-6 pb-6 border-b font-bold">{pathname === '/add-book' ? 'Add' : 'Update'} Book</h1>
          <div className="flex flex-col space-y-1  w-fit">
            <label htmlFor="image">Pilih Gambar</label>
            <label className="cursor-pointer relative" htmlFor="image">
              <BiImageAdd className="absolute top-0 right-[-10px] font-extrabold text-2xl text-yellow-500" />
              <img src={image} alt="book file upload" className="w-[100px] h-auto " />
            </label>
            <input onChange={handleChange} className="p-[10px] hidden bg-slate-100 rounded-sm outline-input" type="file" id="image" name="image" />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="cursor-pointer" htmlFor="title">
              Title
            </label>
            <input onChange={handleChange} value={title} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="title" name="title" placeholder="Masukan judul buku" required />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="cursor-pointer" htmlFor="author">
              Penulis
            </label>
            <input onChange={handleChange} value={author} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="author" name="author" placeholder="Masukan nama penulis" />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="cursor-pointer" htmlFor="penerbit">
              Penerbit
            </label>
            <input onChange={handleChange} value={penerbit} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="penerbit" name="penerbit" placeholder="Masukan nama penerbit" />
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex flex-col space-y-1">
              <label className="cursor-pointer" htmlFor="category">
                Category
              </label>
              <select ref={selectElemet} value={category} onChange={handleChange} name="category" id="category" className="p-[10px] bg-slate-100 rounded-sm outline-input">
                <option value="">--Pilih Kategori--</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="cursor-pointer" htmlFor="releaseAt">
              Publish
            </label>
            <input onChange={handleChange} value={releaseAt} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="releaseAt" name="releaseAt" placeholder="Masukan waktu publish" required />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="cursor-pointer" htmlFor="isbn">
              ISBN
            </label>
            <input onChange={handleChange} value={isbn} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="isbn" name="isbn" placeholder="Isbn" />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="cursor-pointer" htmlFor="jumlah_buku">
              Jumlah buku
            </label>
            <input onChange={handleChange} value={jumlah_buku} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="jumlah_buku" name="jumlah_buku" placeholder="Masukan jumlah buku" required />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="cursor-pointer" htmlFor="jumlah_halaman">
              Jumlah Halaman
            </label>
            <input onChange={handleChange} value={jumlah_halaman} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="jumlah_halaman" name="jumlah_halaman" placeholder="Masukan jumlah halaman" required />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="cursor-pointer" htmlFor="description">
              Deskripsi Buku
            </label>
            <textarea
              ref={textareaElemet}
              onChange={handleChange}
              className="resize-y p-[10px] bg-slate-100 rounded-sm outline-input h-[50px]"
              value={description}
              placeholder="Masukan deskripsi"
              name="description"
              id="description"
              cols="10"
              rows="10"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button className="bg-yellow-500 w-full py-2  text-slate-100 hover:text-slate-50 hover:bg-yellow-400" type="submit">
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={addBookHandle} className="px-6 py-11 bg-gradient-to-tr bg-white space-y-3 font-semibold text-[#3d3222]">
          <h1 className="text-4xl text-gray-500 mb-6 pb-6 border-b font-bold">{pathname === '/daftar-buku' ? 'Add' : 'Update'} Book</h1>
          <div className="flex flex-col space-y-1  w-fit">
            <label htmlFor="image">Pilih Gambar</label>
            <label className="cursor-pointer relative" htmlFor="image">
              <BiImageAdd className="absolute top-0 right-[-10px] font-extrabold text-2xl text-yellow-500" />
              <img src={previewAvatar ? previewAvatar : imageBook} alt="book file upload" className="w-[100px] h-auto " />
            </label>
            <input onChange={handleChange} className="p-[10px] hidden bg-slate-100 rounded-sm outline-input" type="file" id="image" name="image" />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="cursor-pointer" htmlFor="title">
              Title
            </label>
            <input onChange={handleChange} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="title" name="title" placeholder="Masukan judul buku" required />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="cursor-pointer" htmlFor="author">
              Penulis
            </label>
            <input onChange={handleChange} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="author" name="author" placeholder="Masukan nama penulis" />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="cursor-pointer" htmlFor="penerbit">
              Penerbit
            </label>
            <input onChange={handleChange} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="penerbit" name="penerbit" placeholder="Masukan nama penerbit" />
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex flex-col space-y-1">
              <label className="cursor-pointer" htmlFor="category">
                Category
              </label>
              <select ref={selectElemet} onChange={handleChange} name="category" id="category" className="p-[10px] bg-slate-100 rounded-sm outline-input">
                <option value="">--Pilih Kategori--</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="cursor-pointer" htmlFor="releaseAt">
              Publish
            </label>
            <input onChange={handleChange} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="releaseAt" name="releaseAt" placeholder="Masukan waktu publish" required />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="cursor-pointer" htmlFor="isbn">
              ISBN
            </label>
            <input onChange={handleChange} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="isbn" name="isbn" placeholder="Isbn" />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="cursor-pointer" htmlFor="jumlah_buku">
              Jumlah buku
            </label>
            <input onChange={handleChange} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="jumlah_buku" name="jumlah_buku" placeholder="Masukan jumlah buku" required />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="cursor-pointer" htmlFor="jumlah_halaman">
              Jumlah Halaman
            </label>
            <input onChange={handleChange} className="p-[10px] bg-slate-100 rounded-sm outline-input" type="text" id="jumlah_halaman" name="jumlah_halaman" placeholder="Masukan jumlah halaman" required />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="cursor-pointer" htmlFor="description">
              Deskripsi Buku
            </label>
            <textarea
              ref={textareaElemet}
              onChange={handleChange}
              className="resize-y p-[10px] bg-slate-100 rounded-sm outline-input h-[50px]"
              placeholder="Masukan deskripsi"
              name="description"
              id="description"
              cols="3"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button disabled={loading} className="bg-yellow-500 w-full py-2 disabled:bg-gray-500 text-slate-100 hover:text-slate-50 hover:bg-yellow-400" type="submit">
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FormAddBook;
