"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; // Import CSS for Autoplay
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SellerSliderProps {
  eventList: any[]; // or whatever type eventList should be
}

const SellerSlider: React.FC<SellerSliderProps> = ({ eventList }) => {
  return (
    <div className="relative w-full bg-[#F8F7F3]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20} // Jarak antar gambar dalam piksel
        slidesPerView={7} // Default view for larger screens
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ 
          delay: 2000, // Auto-slide setiap 2 detik
          disableOnInteraction: false // Slide tetap berjalan meskipun pengguna berinteraksi
        }}
        breakpoints={{
          430: { // Small screens
            slidesPerView: 2,
          },
          768: { // Medium screens
            slidesPerView: 2,
          },
          1024: { // Large screens
            slidesPerView: 7,
          },
        }}
        className="w-full h-[350px]" // Adjust height
      >
        {eventList.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex flex-col items-center w-full max-w-[208px]"> {/* Adjusted width */}
            <Image
              src="/svgs/img1.svg"
              alt={`Image ${index + 1}`}
              className="object-cover w-full h-[293px]"
              width={100}
              height={100}
              />
              <p className={`flex text-lg font-semibold pt-4 ${item.isConfirm === 'accepted' ? 'text-green-500' : item.isConfirm === 'rejected' ? 'text-red-500' : 'text-gray-500'}`}>
              <Image
                  src={item.isConfirm === 'accepted' ? '/svgs/bullet1.svg' : item.isConfirm === 'rejected' ? '/svgs/bullet2.svg' : '/svgs/bullet.svg'}
                  alt="bullet"
                  className='mr-2'
                  width={10}
                  height={10}
              />
                {item.isConfirm}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: white !important; /* Change bullet color to white */
        }
        .swiper-pagination-bullet-active {
          background-color: white !important; /* Ensure the active bullet is also white */
        }
      `}</style>
    </div>
  );
};

export default SellerSlider;
