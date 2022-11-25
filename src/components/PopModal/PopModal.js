import React from 'react';

const PopModal = ({ setIsDelete, text, loading }) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm flex justify-center items-center absolute top-0 left-0 bottom-0 right-0 w-full h-full z-[1000]">
      {!loading ? (
        <div className="md:w-[70%] md:h-[80%] w-full h-full bg-white/70 text-center ">
          <p>{text}</p>
          <div>
            <button className="font-semibold text-center bg-red-600 text-white py-2 px-6 rounded-sm shadow-md cursor-pointer" onClick={() => setIsDelete(true)}>
              Delete
            </button>
            <button className="font-semibold text-center bg-blue-600 text-white py-2 px-6 rounded-sm shadow-md cursor-pointer" onClick={() => setIsDelete(true)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <h4>Loading</h4>
      )}
    </div>
  );
};

export default PopModal;
