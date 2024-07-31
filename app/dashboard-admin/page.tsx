import Head from 'next/head';
import Navbar from '@/components/navbarUser';
import HeroSlider from '@/components/HeroSlider';
import CategorySearch from '@/components/CategorySearch';
import AdminSlider from '@/components/AdminSlider';
import StatusEvent from '@/components/StatusEvent';
import Link from 'next/link';

export default function DashboardAdmin() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar /> {/* Menambahkan Navbar */}
      <main className="min-h-screen bg-gray-100">
        <HeroSlider />
            <div className="p-6">
            <div className='flex items-center justify-between'>
            <h1 className="text-3xl font-bold mb-4 text-[#828282]">Events</h1>
        </div>
        </div>
        <div className="p-6">
<AdminSlider/>
        </div>
      </main>
    </>
  );
}
