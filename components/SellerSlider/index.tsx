"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; // Import CSS for Autoplay
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

interface SlideData {
  imageSrc: string;
  description: string;
}

const slides: SlideData[] = [
  { imageSrc: '/svgs/img1.svg', description: 'Need Confirmation' },
  { imageSrc: '/svgs/img2.svg', description: 'Accepted' },
  { imageSrc: '/svgs/img3.svg', description: 'Rejected' },
];

const SellerSlider: React.FC = () => {
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
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex flex-col items-center w-full max-w-[208px]"> {/* Adjusted width */}
              <img
                src={slide.imageSrc}
                alt={`Image ${index + 1}`}
                className="object-cover w-full h-[293px]"
              />
              <p className={`flex text-lg font-semibold pt-4 ${slide.description === 'Accepted' ? 'text-green-500' : slide.description === 'Rejected' ? 'text-red-500' : 'text-gray-500'}`}>
                <img 
                  src={slide.description === 'Accepted' ? 'svgs/bullet1.svg' : slide.description === 'Rejected' ? 'svgs/bullet2.svg' : 'svgs/bullet.svg'} 
                  alt="bullet" 
                  className='mr-2' 
                />
                {slide.description}
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
