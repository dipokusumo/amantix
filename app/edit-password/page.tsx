'use client';

import Navbar from '@/components/navbarUser';
import Image from 'next/image';
import { useState } from 'react';

export default function EditPass() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
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
            <div className="flex justify-center w-full mt-4 md:ml-[90px] lg:justify-start">
              <button className="text-blue-600 hover:text-blue-800 text-xl" disabled>
                Change Profile
              </button>
            </div>
          </div>

          {/* Right side: Form */}
          <div className="flex flex-col space-y-6 lg:w-1/2 lg:pl-12">
            <h2 className="text-3xl font-semibold text-gray-700">Edit Password</h2>
            <div className="relative mb-6">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder=" "
                className="border-blue-500 shadow appearance-none border mt-[3px] rounded w-full py-4 px-3 pt-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <label
                htmlFor="password"
                className="absolute top-1 left-3 pb-4 mt-1 text-gray-500 text-sm transform -translate-y-1 scale-75 origin-top-left transition-all duration-300 ease-in-out pointer-events-none"
              >
                Password
              </label>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="relative mb-6">
              <input
                id="newpassword"
                type={showNewPassword ? 'text' : 'password'}
                placeholder=" "
                className="border-blue-500 shadow appearance-none border mt-[3px] rounded w-full py-4 px-3 pt-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <label
                htmlFor="newpassword"
                className="absolute top-1 left-3 pb-4 mt-1 text-gray-500 text-sm transform -translate-y-1 scale-75 origin-top-left transition-all duration-300 ease-in-out pointer-events-none"
              >
                New Password
              </label>
              <button
                type="button"
                onClick={toggleNewPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="flex justify-center items-center">
              <button className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
