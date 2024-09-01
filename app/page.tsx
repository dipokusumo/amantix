"use client"
import Head from 'next/head';
import Navbar from '@/components/navbar';
import HeroSlider from '@/components/HeroSlider';
import CategorySearch from '@/components/CategorySearch';
import ImageSlider from '@/components/ImageSlider';
import Offer from '@/components/Offer';
import Partners from '@/components/Partners';

export default function Dashboard() {

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar /> {/* Menambahkan Navbar */}
      <main className="min-h-screen bg-gray-100">
        <HeroSlider />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-[#828282]">Upcoming Event at Paramadina University</h1>
          {/* Use the CategorySearch Component */}
          <CategorySearch />
        </div>
        {/* Use the ImageSlider Component */}

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
