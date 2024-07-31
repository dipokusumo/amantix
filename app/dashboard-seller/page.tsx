import Head from 'next/head';
import Navbar from '@/components/navbarUser';
import HeroSlider from '@/components/HeroSlider';
import CategorySearch from '@/components/CategorySearch';
import SellerSlider from '@/components/SellerSlider';
import StatusEvent from '@/components/StatusEvent';
import Link from 'next/link';

export default function DashboardSeller() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar /> {/* Menambahkan Navbar */}
      <main className="min-h-screen bg-gray-100">
        <HeroSlider />
                        {/* Status Event */}
            <h1 className="py-8 px-4 text-3xl font-bold mb-4 text-[#828282]">Status Events</h1>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-4">
            <StatusEvent number={5} text="Awaiting Confirmation" link="/events/awaiting" colorClass="text-gray-400" />
            <StatusEvent number={12} text="Accepted" link="/events/accept" colorClass="text-green-500" />
            <StatusEvent number={3} text="Rejected" link="/events/reject" colorClass="text-red-500" />
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
            <SellerSlider />
        </div>
      </main>
    </>
  );
}
