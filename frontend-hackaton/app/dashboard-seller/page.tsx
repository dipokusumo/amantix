'use client'

import Head from 'next/head';
import Navbar from '@/components/navbarUser';
import HeroSlider from '@/components/HeroSlider';
import CategorySearch from '@/components/CategorySearch';
import SellerSlider from '@/components/SellerSlider';
import StatusEvent from '@/components/StatusEvent';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';


interface Event {
  isConfirm: string;
}
export default function DashboardSeller() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [eventList, setEventList] = useState<Event[]>([]);
  const searchParams = useSearchParams();

  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (fetched) return;

    const fetchEventList = async () => {
      try {
        const savedToken = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/event/seller/allevents', {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });
        setEventList(response.data);
        console.log('Event list:', response.data);
      } catch (error) {
        console.error('Error fetching event list:', error);
      } finally {
        setFetched(true);
      }
    };

    // Extract user data from query parameters
    const token = searchParams.get('token') || "";
    const _id = searchParams.get('id') || "";
    const name = searchParams.get('name') || "";
    const username = searchParams.get('username') || "";
    const image = searchParams.get('image') || "";
    const role = searchParams.get('role') || "";

    if (token && _id && username) {
      const userData = { _id, name, username, image, role, token };
      setUser(userData);

      sessionStorage.setItem('userId', _id);
      sessionStorage.setItem('username', name);
      sessionStorage.setItem('image', image);
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('token', token);

      // Clean up the URL parameters
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState(null, '', cleanUrl);
    } else {
      console.error('User data missing in query parameters');
      router.push('/login');
    }

    fetchEventList();
  }, [router, searchParams, fetched]);

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
                        {/* Status Event */}
            <h1 className="py-8 px-4 text-3xl font-bold mb-4 text-[#828282]">Status Events</h1>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-4">
            <StatusEvent number={eventList.filter(event => event.isConfirm === 'awaiting').length} text="Awaiting Confirmation" link="/events/awaiting" colorClass="text-gray-400" />
            <StatusEvent number={eventList.filter(event => event.isConfirm === 'accepted').length} text="Accepted" link="/events/accept" colorClass="text-green-500" />
            <StatusEvent number={eventList.filter(event => event.isConfirm === 'rejected').length} text="Rejected" link="/events/reject" colorClass="text-red-500" />
          </div>
            <div className="p-6">
            <div className='flex items-center justify-between'>
            <h1 className="text-3xl font-bold mb-4 text-[#828282]">Your Events</h1>
        <Link href="/add-event" legacyBehavior>
              <a className="text-blue-500 text-xl font-semibold hover:underline">Add Event</a>
            </Link>
        </div>
        </div>
        <div className="p-6">
            <SellerSlider eventList={eventList} />
        </div>
      </main>
    </>
  );
}

