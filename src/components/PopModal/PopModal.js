import React from 'react';

const PopModal = ({ setIsDelete, text }) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm absolute top-0 left-0 bottom-0 right-0 w-full h-full z-[1000]">
      <div className="md:w-[70%] md:h-[80%] w-full h-full">
        <p>{text}</p>
        <div>
          <button onClick={() => setIsDelete(true)}>Delete</button>
          <button onClick={() => setIsDelete(true)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PopModal;
