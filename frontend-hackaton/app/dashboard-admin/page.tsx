'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Head from 'next/head';
import Navbar from '@/components/navbarUser';
import HeroSlider from '@/components/HeroSlider';
import AdminSlider from '@/components/AdminSlider';

export default function DashboardAdmin() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Extract user data from query parameters
    const token = searchParams.get('token');
    const _id = searchParams.get('id');
    const name = searchParams.get('name');
    const username = searchParams.get('username');
    const image = searchParams.get('image');
    const role = searchParams.get('role');

    if (token && _id && username) {
      const userData = { _id, name, username, image, role, token };
      setUser(userData);

      // Clean up the URL parameters
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState(null, '', cleanUrl);
    } else {
      console.error('User data missing in query parameters');
      router.push('/login');
    }
  }, [router, searchParams]);

  if (!user) {
    return <p>Loading...</p>; // or a loading spinner
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar userName={user.name} token={user.token} /> {/* Passing the username to the Navbar */}
      <main className="min-h-screen bg-gray-100">
        <HeroSlider />
        <div className="p-6">
          <div className='flex items-center justify-between'>
            <h1 className="text-3xl font-bold mb-4 text-[#828282]">Events</h1>
          </div>
        </div>
        <div className="p-6">
          <AdminSlider />
        </div>
      </main>
    </>
  );
}
