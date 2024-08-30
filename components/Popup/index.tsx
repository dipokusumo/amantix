import Image from 'next/image';

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-12 rounded-lg shadow-lg">
        <div className="mb-4 flex justify-center">
          <Image
            src="/svgs/succes.svg"
            alt="Success"
            width={300}
            height={300}
            className="w-full h-auto animate-zoom-in-out"
          />
        </div>
        <div className="text-center mb-4">
          <p className="text-gray-700">Profile image updated successfully!</p>
        </div>
        <div className="text-center">
          <button
            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={onClose}
          >
            OK!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
