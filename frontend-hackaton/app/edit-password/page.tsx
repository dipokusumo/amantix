'use client';

import Navbar from '@/components/navbarUser';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EditPass() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
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
