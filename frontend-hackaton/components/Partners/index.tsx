// components/Partners.tsx

"use client";

const partners = [
  { imageSrc: '/svgs/partner1.svg', alt: 'Partner 1' },
  { imageSrc: '/svgs/partner2.svg', alt: 'Partner 2' },
  { imageSrc: '/svgs/partner3.svg', alt: 'Partner 3' },
  { imageSrc: '/svgs/partner4.svg', alt: 'Partner 4' },
  { imageSrc: '/svgs/partner5.svg', alt: 'Partner 5' },
  { imageSrc: '/svgs/partner6.svg', alt: 'Partner 6' },
  { imageSrc: '/svgs/partner7.svg', alt: 'Partner 7' },
];

const Partners: React.FC = () => {
  return (
    <div className="bg-gray-100 rounded-full p-6">
      <div className="flex justify-center space-x-6 mb-4">
        {partners.map((partner, index) => (
          <div key={index} className="flex gap-8 items-center justify-center bg-[#E2E2E2] rounded-full p-4 shadow-md">
            <img
              src={partner.imageSrc}
              alt={partner.alt}
              className="object-contain h-[160px] w-[160px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
