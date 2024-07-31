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
  { imageSrc: '/svgs/img1.svg', description: 'Music Event' },
  { imageSrc: '/svgs/img2.svg', description: 'Music Party' },
  { imageSrc: '/svgs/img3.svg', description: 'Summer Party' },
  { imageSrc: '/svgs/img4.svg', description: 'Music Festival' },
  { imageSrc: '/svgs/img5.svg', description: 'Music Festival' },
  { imageSrc: '/svgs/img1.svg', description: 'Music Event' },
  { imageSrc: '/svgs/img2.svg', description: 'Music Party' },
  { imageSrc: '/svgs/img3.svg', description: 'Summer Party' },
  { imageSrc: '/svgs/img4.svg', description: 'Music Festival' },
  { imageSrc: '/svgs/img5.svg', description: 'Music Festival' },
];

const ImageSlider: React.FC = () => {
  return (
    <div className="relative w-full bg-[#F8F7F3]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20} // Jarak antar gambar dalam piksel
        slidesPerView={7} // Default view for larger screens
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ 
          delay: 2000, // Auto-slide setiap 3 detik
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
              <p className="text-lg font-semibold pt-4">{slide.description}</p>
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

export default ImageSlider;
