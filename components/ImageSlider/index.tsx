// components/ImageSlider.tsx

"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

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
    <div className="relative w-full ">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={5}
        pagination={{ clickable: true }}
        loop={true}
        className="w-{208px} h-[350px]" // Adjusted height
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex flex-col items-center w-[208px]"> {/* Adjusted width */}
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
    </div>
  );
};

export default ImageSlider;
