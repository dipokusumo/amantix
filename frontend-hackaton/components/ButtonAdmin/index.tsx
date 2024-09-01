// components/ButtonAwaitingConfirmation.js
import React from 'react';
import Image from 'next/image';

const ButtonAwaitingConfirmation = () => {
  return (
    <div className='flex'>
    <button className="bg-green-400 text-black w-[234px] h-[67px] px-4 py-2 mr-4 rounded-lg text-xl">
      Accepted
    </button>
    
    <button className="bg-red-600 text-white p-4 ml-2 rounded-lg">
    <Image
            src="/svgs/rejectadmin.svg"
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
