'use client';

import Navbar from '@/components/navbarUser';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Popup from '@/components/Popup'; // Import Popup component

export default function Profile() {
  const [userId, setUserId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const savedToken = sessionStorage.getItem('token');
        
        if (!savedToken) {
          setError('No token found. Please log in again.');
          router.push('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/users/getuserprofile', {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        const { _id, email, username, phone, image } = response.data;
        setUserId(_id);
        setEmail(email);
        setUsername(username);
        setPhone(phone);
        setImage(image || '');
        setToken(savedToken);

      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to fetch user profile. Please try again later.');
        router.push('/login');
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
  console.log("handleImageUpload called");

  if (!selectedFile) {
    console.log("No file selected.");
    setError('No file selected.');
    return;
  }

  try {
    console.log("File selected:", selectedFile);

    const formData = new FormData();
    formData.append('image', selectedFile);

    console.log("FormData created:", formData);

    const response = await axios.post('http://localhost:5000/api/users/changeimageprofile', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log("Server response:", response);

    const { image } = response.data;
    console.log("Image updated:", image);

    setImage(image);
    setSelectedFile(null);
    setShowPopup(true); // Show the popup after successful upload

    console.log("Popup set to show");
  } catch (error) {
    console.error('Error uploading image:', error);
    setError('Failed to update profile image. Please try again later.');
  }
};


  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleEditPhone = () => {
    router.push(`/edit-phone?phone=${phone}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userName={username} token={token} />
      <div className="flex flex-1 items-center justify-center bg-white px-4">
        <div className="flex flex-col lg:flex-row w-full max-w-7xl bg-white p-8 space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Left side: Image */}
          <div className="flex flex-col items-center lg:items-start lg:w-1/2">
            <div className="w-full max-w-xs lg:max-w-md flex items-center justify-center mb-6">
              <Image
                src={image || '/svgs/profile.svg'}
                alt="Profile Image"
                width={500}
                height={500}
                className="w-full h-auto rounded-full"
                priority
                unoptimized
              />
            </div>
            <div className="flex flex-col justify-center w-full mt-4 space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-2 md:pl-40 lg:justify-center lg:pl-36"
              />
              <button
                className="text-blue-600 hover:text-blue-800 text-xl md:pr-40"
                onClick={handleImageUpload}
              >
                Save Photo
              </button>
            </div>
          </div>

          {/* Right side: Form */}
          <div className="flex flex-col space-y-6 lg:w-1/2 lg:pl-12">
            <h2 className="text-3xl font-semibold text-gray-700">Profile</h2>
            <div className="relative mb-6">
              <input
                id="phone"
                type="tel"
                pattern="[0-9]*"
                className="border-blue-500 shadow appearance-none mt-[1px] border rounded w-full py-4 px-3 pt-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={phone}
                disabled
              />
              <label
                htmlFor="phone"
                className="absolute top-2 left-3 pb-4 text-gray-500 text-sm transform -translate-y-1 scale-75 origin-top-left transition-all duration-300 ease-in-out pointer-events-none"
              >
                Phone Number
              </label>
            </div>

            <div className="relative">
              <input
                id="email"
                type="email"
                className="border-blue-500 shadow appearance-none border rounded w-full py-4 px-3 pt-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                disabled
              />
              <label
                htmlFor="email"
                className="absolute top-2 left-3 pb-4 text-gray-500 text-sm transform -translate-y-1 scale-75 origin-top-left transition-all duration-300 ease-in-out"
              >
                Email
              </label>
            </div>
            <div className="relative">
              <input
                id="username"
                type="text"
                className="border-blue-500 shadow appearance-none border mt-[3px] rounded w-full py-4 px-3 pt-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={username}
                disabled
              />
              <label
                htmlFor="username"
                className="absolute top-2 left-3 pb-4 text-gray-500 text-sm transform -translate-y-1 scale-75 origin-top-left transition-all duration-300 ease-in-out"
              >
                Username
              </label>
            </div>
            <button
        className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={handleEditPhone}
      >
        Edit Phone Number
      </button>
          </div>
        </div>
      </div>

      {showPopup && <Popup onClose={handlePopupClose} />}
    </div>
  );
}
