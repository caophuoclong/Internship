import React from 'react';

export default function DialPad({ handleClick }) {
  const NumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'];
  return (
    <div className="my-4 flex flex-wrap w-[90%] mx-auto justify-center gap-x-8 gap-y-2">
      {NumberList.map((number) => (
        <button
          key={number}
          onClick={() => handleClick(number)}
          className="w-[70px] h-[70px] text-3xl text-white font-bold"
        >
          {number}
        </button>
      ))}
    </div>
  );
}
