'use client'
import Head from 'next/head';
import Navbar from '@/components/navbarUser';
import HeroSlider from '@/components/HeroSlider';
import CategorySearch from '@/components/CategorySearch';
import ImageSlider from '@/components/ImageSlider';
import Offer from '@/components/Offer';
import Partners from '@/components/Partners';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DashboardUser() {
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

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      {/* Display error message if there is an error */}
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-md mb-4 text-center">
          {error}
        </div>
      )}
      {/* Conditionally render the Navbar based on which login method was used */}
      {Googleusername && Googletoken ? (
        <Navbar userName={Googleusername} token={Googletoken} />
      ) : (
        <Navbar userName={username} token={token} />
      )}
      <main className="min-h-screen bg-gray-100">
        <HeroSlider />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-[#828282]">Upcoming Event at Paramadina University</h1>
          <CategorySearch />
        </div>
        <div className="p-6">
          <ImageSlider />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-[#828282]">What We Offer</h1>
        </div>
        <div className="p-6">
          <Offer />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-[#828282]">Our Partners</h1>
        </div>
        <div className="p-6">
          <Partners />
        </div>
      </main>
    </>
  );
}
