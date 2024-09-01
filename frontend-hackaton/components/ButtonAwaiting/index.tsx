// components/ButtonAwaitingConfirmation.js
import React from 'react';
import Image from 'next/image';

const ButtonAwaitingConfirmation = () => {
  return (
    <div className='flex'>
    <button className="bg-gray-700 text-white w-[393px] h-[67px] mr-4 px-4 py-2 rounded-lg">
      Awaiting Confirmation
    </button>
    
    <button className="bg-red-600 text-white p-4 ml-2 rounded-lg">
    <Image
            src="/svgs/iconremove.svg"
            alt="Remove"
            width={402}
            height={558}
            className="w-full h-full"
          />
  </button>
  </div>
  );
};

export default ButtonAwaitingConfirmation;
