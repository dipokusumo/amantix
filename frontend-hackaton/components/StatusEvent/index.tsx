import React from 'react';
import Link from 'next/link';

interface StatusEventProps {
  number: number;
  text: string;
  link: string;
  colorClass: string; // Add colorClass prop
}

const StatusEvent: React.FC<StatusEventProps> = ({ number, text, link, colorClass }) => {
  return (
    <Link href={link} legacyBehavior>
      <a className=" bg-white shadow-lg rounded-lg w-[221px] h-[245px] flex flex-col items-center justify-center text-center">
        <div className={`text-[132px] text-gray-400 font-bold`}>{number}</div>
        <div className={`text-lg mt-2 mb-8 ${colorClass}`}>{text}</div>
      </a>
    </Link>
  );
};

export default StatusEvent;
