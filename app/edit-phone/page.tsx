'use client';

import Navbar from '@/components/navbarUser';
import Image from 'next/image';
import { useState } from 'react';

export default function EditPhone() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
