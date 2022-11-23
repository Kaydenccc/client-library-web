import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Book from '../Book/Book';
// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper';
// CATEGORY
const BooksMember = () => {
  const dispatch = useDispatch();
  const [bookId, setBookId] = useState('');
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const getBoosks = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/books/v1/get/books`);
        setBooks(res.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getBoosks();
  }, [bookId, dispatch]);

  // DELETE BOOK
  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/books/v1/delete/book/${id}`);
      toast('Delete Success', {
        className: 'toast-success',
        bodyClassName: 'toast-success',
      });
      setBookId(id);
    } catch (err) {
      toast('Delete Failed', {
        className: 'toast-failed',
        bodyClassName: 'toast-failed',
      });
      console.log(err);
    }
  };
  return (
    <div className=" h-auto bg-white pb-6   shadow-sm">
      <div className="flex justify-between bg-green-500 items-center py-4 p-6 shadow border-b-2">
        <h1 className="py-2 text-2xl md:text-3xl font-semibold text-white  w-fit">BARU DITAMBAHKAN</h1>
      </div>
      <div className="w-full flex justify-center pt-6 px-[8px] md:px-6 drop-shadow-lg">
        <Swiper
          className="mySwiper"
          slidesPerView={6}
          spaceBetween={30}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {books ? (
            books.map((buku) => (
              <SwiperSlide className="swiper-wrapper " key={buku._id}>
                <Book deleteBook={deleteBook} {...buku} />
              </SwiperSlide>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default BooksMember;
