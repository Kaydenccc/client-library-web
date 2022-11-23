import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Book = ({ _id, image, title, category, releaseAt, deleteBook }) => {
  const { user } = useSelector((state) => state.login);
  const navigate = useNavigate();

  return (
    <div className={`max-w-[100.66px] md:max-w-[200.66px] h-auto md:max-h-[307.55px] border-4 flex justify-center border-gray-700 relative overflow-hidden rounded-md cursor-pointer`}>
      <img className="w-full object-cover " src={image} alt={title} />
      <div
        onClick={() => navigate(`/detail-book/${_id}`)}
        className="absolute flex flex-col w-full justify-between bottom-0 p-2 left-0 top-0 right-0 hover:bg-circle opacity-0 hover:opacity-100  transition-all duration-500 text-white font-semibold"
      >
        <div className="flex-1">
          <div>
            <p className="text-xl text-ellipsis overflow-hidden whitespace-nowrap">{title}</p>
            <p>{category}</p>
          </div>
          <p>{releaseAt}</p>
        </div>
      </div>
      <div className="flex-1 flex items-end absolute left-0 bottom-0 p-2 ">
        {!user?.user?.admin ? null : (
          <p className="">
            <span onClick={() => deleteBook(_id)} className="text-red-400  text-[12px] md:text-[16px]">
              delete
            </span>
            /
            <span onClick={() => navigate('/update-book/' + _id)} className="  text-blue-400 text-[12px] md:text-[16px]">
              edit
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Book;
