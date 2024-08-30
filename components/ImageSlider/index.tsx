"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';

interface SlideData {
  imageSrc: string;
  description: string;
}

interface ImageSliderProps {
  role?: 'user' | 'seller' | 'admin'; // Tambahkan prop role
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

const ImageSlider: React.FC<ImageSliderProps> = ({ role }) => {
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
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link href="/event-detail">
              <div className="relative flex flex-col items-center w-full max-w-[208px] cursor-pointer">
                <img
                  src={slide.imageSrc}
                  alt={`Image ${index + 1}`}
                  className="object-cover w-full h-[293px]"
                />
                <p className="text-lg font-semibold pt-4">{slide.description}</p>
              </div>
            </Link>
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
