"use client"
import Navbar from '@/components/navbarUser';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Contact() {
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
    <div>
      <Navbar userName={username} token={token} />

      <div className="relative min-h-screen flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-8 bg-white">
        <h2 className="text-blue-500 text-2xl mb-4 font-extrabold">
            Halloo......
        </h2>
          <p className="text-gray-600">
            Got a question? We're here to assist! Our friendly and knowledgeable Customer Relations team is a dedicated group of people who are passionate about AMANTIX and committed to ensuring you have the best experience. Contact us via WhatsApp, Telegram, and Email. Also, check out our FAQ page for quick answers to common questions.
          </p>
          <h2 className="text-gray-600 text-xl py-4 font-extrabold">
            Find me at
        </h2>
          <ul className=" space-y-4">
            <li className="flex items-center">
              <Image src="/svgs/email.svg" alt="Email Icon" width={25} height={24} />
              <span className="ml-3 text-gray-600">amantix@gmail.com</span>
            </li>
            <li className="flex items-center">
              <Image src="/svgs/phone.svg" alt="Phone Icon" width={25} height={24} />
              <span className="ml-3 text-gray-600">0811 1122 3344</span>
            </li>
            <li className="flex items-center">
              <Image src="/svgs/tele.svg" alt="Telegram Icon" width={25} height={24} />
              <span className="ml-3 text-gray-600">AMANTIX OFFICIAL</span>
            </li>
          </ul>
        </div>

        <div className="w-full lg:w-1/2 p-8 bg-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800">Feel free to reach out to us.</h2>
          <p className="text-gray-600 mt-2 mb-6">
            Hello! How can we assist you? Send us a message with your requests or questions.
          </p>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input type="text" id="name" className="w-full p-3 border border-gray-300 rounded-md" placeholder="Name" />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input type="email" id="email" className="w-full p-3 border border-gray-300 rounded-md" placeholder="Email" />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea id="message" rows={4} className="w-full p-3 border border-gray-300 rounded-md" placeholder="Message"></textarea>
            </div>
            <button type="submit" className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200">
              Submit
            </button>
          </form>
        </div>

        {/* Gambar logo hanya tampil pada layar dengan ukuran lg atau lebih besar */}
        <div className="hidden lg:flex absolute inset-0 justify-center items-center pointer-events-none">
          <Image src="/svgs/logo3.svg" alt="AMANTIX Logo" width={400} height={400} className="transform translate-y-[70%]" />
        </div>
      </div>
    </div>
  );
}
