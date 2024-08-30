'use client';

import Navbar from '@/components/navbarUser';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';


export default function EditPhone() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [image, setImage] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [Googleusername, setGoogleUsername] = useState('');
  const [GoogleuserId, setGoogleUserId] = useState('');
  const [Googleimage, setGoogleImage] = useState('');
  const [Googlerole, setGoogleRole] = useState('');
  const [Googletoken, setGoogleToken] = useState('');

  // State for managing login errors
  const [error, setError] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if Google login data is present in URL query parameters
    const Googletoken = searchParams.get('token') || '';  // Default to empty string if null
    const GoogleuserId = searchParams.get('id') || '';    // Default to empty string if null
    const Googleusername = searchParams.get('username') || '';  // Default to empty string if null
    const Googleimage = searchParams.get('image') || '';  // Default to empty string if null
    const Googlerole = searchParams.get('role') || '';    // Default to empty string if null
  
    if (Googletoken && GoogleuserId && Googleusername) {
      // If Google login data is present, use it
      setGoogleUserId(GoogleuserId);
      setGoogleUsername(Googleusername);
      setGoogleImage(Googleimage);
      setGoogleRole(Googlerole);
      setGoogleToken(Googletoken);
  
      // Save Google login data to sessionStorage
      sessionStorage.setItem('userId', GoogleuserId);
      sessionStorage.setItem('username', Googleusername);
      sessionStorage.setItem('image', Googleimage);
      sessionStorage.setItem('role', Googlerole);
      sessionStorage.setItem('token', Googletoken);
  
      // Clean up the URL query parameters
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState(null, '', cleanUrl);
    } else {
      // If no Google login data, fall back to traditional login data from sessionStorage
      const savedUsername = sessionStorage.getItem('username') || '';
      const savedUserId = sessionStorage.getItem('userId') || '';
      const savedImage = sessionStorage.getItem('image') || '';
      const savedRole = sessionStorage.getItem('role') || '';
      const savedToken = sessionStorage.getItem('token') || '';
  
      if (savedUsername) {
        setUsername(savedUsername);
        setUserId(savedUserId);
        setImage(savedImage);
        setRole(savedRole);
        setToken(savedToken);
      } else {
        setError('No user data found in sessionStorage or query parameters. Please log in again.');
        router.push('/login');
      }
    }
  }, [searchParams, router]);

  // Function to handle input changes and enforce numeric-only input
  const handlePhoneNumberChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
    setPhoneNumber(numericValue);
    if (numericValue) {
      setErrorMessage(''); // Clear the error message if input is not empty
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (!phoneNumber) {
      setErrorMessage('Phone number cannot be empty'); // Set the error message if input is empty
    } else {
      // Handle form submission if the phone number is valid
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userName={username} token={token} />
      <div className="flex flex-1 items-center justify-center bg-white px-4">
        <div className="flex flex-col lg:flex-row w-full max-w-7xl bg-white p-8 space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Left side: SVG Image */}
          <div className="flex flex-col items-center lg:items-start lg:w-1/2">
            <div className="w-full max-w-xs lg:max-w-md flex items-center justify-center mb-6">
              <Image
                src="/svgs/profile.svg"
                alt="Profile Image"
                width={500}
                height={500}
                className="w-full h-auto md:mr-[122px]"
              />
            </div>
            {/* Container for centering the button */}
          </div>
          {/* Right side: Form */}
          <div className="flex flex-col space-y-6 lg:w-1/2 lg:pl-12">
            <h2 className="text-3xl font-semibold text-gray-700">Edit Phone Number</h2>
            <div className="relative">
              <input
                id="newphone"
                type="tel"
                placeholder="081317157363"
                inputMode="numeric"
                pattern="[0-9]*"
                value={phoneNumber}
                onChange={handlePhoneNumberChange} // Enforces numeric-only input
                className={`border shadow appearance-none mt-[1px]  rounded w-full py-4 px-3 pt-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errorMessage ? 'border-red-500' : 'border-blue-500'
                }`}
              />
              <label
                htmlFor="newphone"
                className="absolute top-2 left-3 pb-4 text-gray-500 text-sm transform -translate-y-1 scale-75 origin-top-left transition-all duration-300 ease-in-out pointer-events-none"
              >
               Old Phone Number
              </label>
              {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              )}
            </div>

            <div className="relative">
              <input
                id="newphone"
                type="tel"
                placeholder="081317157363"
                inputMode="numeric"
                pattern="[0-9]*"
                value={phoneNumber}
                onChange={handlePhoneNumberChange} // Enforces numeric-only input
                className={`border shadow appearance-none mt-[1px]  rounded w-full py-4 px-3 pt-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errorMessage ? 'border-red-500' : 'border-blue-500'
                }`}
              />
              <label
                htmlFor="newphone"
                className="absolute top-2 left-3 pb-4 text-gray-500 text-sm transform -translate-y-1 scale-75 origin-top-left transition-all duration-300 ease-in-out pointer-events-none"
              >
               New Phone Number
              </label>
              {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              )}
            </div>

            <div className="flex justify-center items-center">
              <button
                className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleSubmit}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
