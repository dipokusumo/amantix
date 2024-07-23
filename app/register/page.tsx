'use client'

import React from 'react';
import Head from 'next/head';

export default function RegisterPage() {
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  return (
    <div className="min-h-screen flex relative">
      <Head>
        <title>Register</title>
      </Head>
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="text-center">
          <img src="/svgs/Logo.svg" alt="Logo" className="w-full h-full mx-auto mb-4" />
        </div>
      </div>
      <div className="w-1/2 bg-[#F8F7F3] flex flex-col items-center justify-center relative">
        <h2 className="absolute top-4 left-4 text-3xl font-bold text-blue-600">Register</h2>
        <div className="max-w-md w-full p-8">
          <div className="absolute top-0 right-0">
            <img src="/svgs/tixlog.svg" alt="Logo" className="w-32 h-32" />
          </div>
          <form>
            <div className="relative mb-6">
              <input
                id="username"
                type="text"
                placeholder=" "
                className="border-blue-500 shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <label
                htmlFor="username"
                className="absolute top-1 left-3 mb-4 text-gray-500 text-sm transform -translate-y-1 scale-75 origin-top-left transition-all duration-300 ease-in-out pointer-events-none"
              >
                Username
              </label>
            </div>
            <div className="relative mb-6">
              <input
                id="phone"
                type="tel"
                placeholder=" "
                pattern="[0-9]*"
                onInput={handlePhoneInput} // Menangani event input
                className="border-blue-500 shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <label
                htmlFor="phone"
                className="absolute top-1 left-3 mb-4 text-gray-500 text-sm transform -translate-y-1 scale-75 origin-top-left transition-all duration-300 ease-in-out pointer-events-none"
              >
                Phone Number
              </label>
            </div>
            <div className="relative mb-6">
              <input
                id="email"
                type="email"
                placeholder=" "
                className="border-blue-500 shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <label
                htmlFor="email"
                className="absolute top-1 left-3 mb-4 text-gray-500 text-sm transform -translate-y-1 scale-75 origin-top-left transition-all duration-300 ease-in-out pointer-events-none"
              >
                Email
              </label>
            </div>
            <div className="relative mb-6">
              <input
                id="password"
                type="password"
                placeholder=" "
                className="border-blue-500 shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <label
                htmlFor="password"
                className="absolute top-1 left-3 mb-4 text-gray-500 text-sm transform -translate-y-1 scale-75 origin-top-left transition-all duration-300 ease-in-out pointer-events-none"
              >
                Password
              </label>
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                type="button"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
