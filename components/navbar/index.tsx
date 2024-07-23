"use client"
// components/Navbar.tsx

import { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-1 flex items-center justify-start sm:items-stretch sm:justify-start">
            <Link legacyBehavior href="/">
              <a>
                <img
                  src="/svgs/logo2.svg" // Path to your SVG logo
                  alt="Logo"
                  className="h-8 w-32"
                />
              </a>
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:ml-auto sm:space-x-4">
            <Link legacyBehavior href="/login">
              <a className="text-white hover:text-white bg-blue-500 rounded-lg px-8 py-2 text-sm font-medium">Login</a>
            </Link>
            <Link legacyBehavior href="/register">
              <a className="text-blue-500 hover:text-[#F8F7F3] px-8 py-2 text-sm font-medium border border-blue-500 rounded-lg">Register</a>
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`absolute top-0 inset-x-0 p-2 transition transform origin-top-right sm:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="rounded-lg shadow-md ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div className="flex items-center justify-between px-2 pt-2 pb-3">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              onClick={closeMenu}
            >
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link legacyBehavior href="/login">
              <a className="text-gray-900 hover:text-gray-700 block px-3 py-2 text-base font-medium" onClick={closeMenu}>Login</a>
            </Link>
            <Link legacyBehavior href="/register">
              <a className="text-gray-900 hover:text-gray-700 block px-3 py-2 text-base font-medium" onClick={closeMenu}>Register</a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
