"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'; // Import CSS for Pagination
import 'swiper/css/autoplay'; // Import CSS for Autoplay
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const HeroSlider: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30} // Jarak antar gambar dalam piksel
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true} // Enable looping
        autoplay={{ 
          delay: 3000, // Auto-slide setiap 3 detik
          disableOnInteraction: false // Slide tetap berjalan meskipun pengguna berinteraksi
        }}
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
            src="/svgs/Hero2.svg"
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
