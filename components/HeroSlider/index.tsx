// components/HeroSlider.tsx

"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'; // Import CSS for Pagination
import { Navigation, Pagination } from 'swiper/modules';

const HeroSlider: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        loop={true} // Enable looping
        className="w-full h-full"
      >
        <SwiperSlide>
          <img
            src="/svgs/Hero.png"
            alt="Hero Image 1"
            className="object-cover w-full h-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/svgs/Hero.png"
            alt="Hero Image 2"
            className="object-cover w-full h-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/svgs/Hero.png"
            alt="Hero Image 3"
            className="object-cover w-full h-full"
          />
        </SwiperSlide>
        {/* Add more SwiperSlide components as needed */}
      </Swiper>
      <style jsx global>{`
        /* Custom styles for Swiper pagination bullets */
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

export default HeroSlider;
