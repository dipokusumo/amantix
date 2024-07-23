// components/Offer.tsx

"use client";

interface OfferData {
  imageSrc: string;
  title: string;
}

const offers: OfferData[] = [
  { imageSrc: '/svgs/logo3.svg', title: 'LATEST INFORMATION ABOUT EVENTS AND ACTIVITIES AT PARAMADINA UNIVERSITY' },
  { imageSrc: '/svgs/logo3.svg', title: 'A CHOICE OF THE LATEST INTERESTING AND MEMORABLE CAMPUS EVENTS FOR YOU!' },
  { imageSrc: '/svgs/logo3.svg', title: 'PURCHASE CAMPUS EVENT TICKET DIRECTLY FROM THE APPLICATION WITH A FAST AND EASY PROCESS.' },
];

const Offer: React.FC = () => {
  return (
    <div className="flex justify-between space-x-6">
      {offers.map((offer, index) => (
        <div key={index} className="flex bg-white shadow-md rounded-lg overflow-hidden py-8 w-1/3">
          <img
            src={offer.imageSrc}
            alt={`Offer ${index + 1}`}
            className="w-1/3 object-cover mr-6"
          />
          <div className="p-4 w-2/3">
            <h2 className="text-xl font-bold">{offer.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Offer;
