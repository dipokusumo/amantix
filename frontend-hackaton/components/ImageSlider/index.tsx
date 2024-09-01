"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';

interface SlideData {
  name: ReactNode;
  _id: string;
  imageSrc: string;
  eventName: string;
}

interface ImageSliderProps {
  role?: 'user' | 'seller' | 'admin'; // Tambahkan prop role
}

// const slides: SlideData[] = [
//   { imageSrc: '/svgs/img1.svg', description: 'Music Event' },
//   { imageSrc: '/svgs/img2.svg', description: 'Music Party' },
//   { imageSrc: '/svgs/img3.svg', description: 'Summer Party' },
//   { imageSrc: '/svgs/img4.svg', description: 'Music Festival' },
//   { imageSrc: '/svgs/img5.svg', description: 'Music Festival' },
//   { imageSrc: '/svgs/img1.svg', description: 'Music Event' },
//   { imageSrc: '/svgs/img2.svg', description: 'Music Party' },
//   { imageSrc: '/svgs/img3.svg', description: 'Summer Party' },
//   { imageSrc: '/svgs/img4.svg', description: 'Music Festival' },
//   { imageSrc: '/svgs/img5.svg', description: 'Music Festival' },
// ];

const ImageSlider: React.FC<ImageSliderProps> = ({ role }) => {
  const [slides, setSlides] = useState<SlideData[]>([] as SlideData[]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/event/dashboard')
      .then((response) => {
        setSlides(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (id: string) => {
    sessionStorage.setItem("eventId", id);
    window.location.href = "/event-detail";
  };

  return (
    <div className="relative w-full bg-[#F8F7F3]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={7}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ 
          delay: 2000,
          disableOnInteraction: false
        }}
        breakpoints={{
          430: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 7,
          },
        }}
        className="w-full h-[350px]"
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index}>
            <button
              onClick={() => handleSubmit(slides[index]._id)} // Mengambil ID dari slides
            >
              <div className="relative flex flex-col items-center w-full max-w-[208px] cursor-pointer">
              <Image
                src="/svgs/img1.svg"
                alt={`Image ${index + 1}`}
                className="object-cover w-full h-[293px]"
                width={208}
                height={293}
/>
                <p className="text-lg font-semibold pt-4">{item.name}</p>
              </div>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      {role === 'user' && (
        <div className="absolute bottom-4 right-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Lihat Detail
          </button>
        </div>
      )}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: white !important;
        }
        .swiper-pagination-bullet-active {
          background-color: white !important;
        }
      `}</style>
    </div>
  );
};

export default ImageSlider;
