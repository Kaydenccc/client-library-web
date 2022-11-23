import React from 'react';

const Card = ({ total, text, icon, ...teas }) => {
  return (
    <div {...teas}>
      <div className="h-[80px] w-[80px] rounded-full flex items-center justify-center bg-green-500">{icon}</div>
      <div>
        <h2 className="text-3xl font-bold ">{total}</h2>
        <p className="font-[500]">{text}</p>
      </div>
    </div>
  );
};

export default Card;
