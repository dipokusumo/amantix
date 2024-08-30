"use client";
// components/Navbar.tsx

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  name?: string;
  userName?: string;
  token: string;
}

const Navbar: React.FC<NavbarProps> = ({ userName, token }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume user is logged in for demo purposes

  const router = useRouter();

  const toggleMenu = () => {{ useRouter }
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      // Panggil endpoint logout di backend
      const response = await fetch('http://localhost:5000/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Sesuaikan dengan cara Anda menyimpan token
        },
      });
  
      if (response.ok) {
        // Hapus token dari sessionStorage
        sessionStorage.clear();
  
        // Arahkan ke halaman login
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
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
            {userName ? (
              <div className="relative">
                <button onClick={toggleMenu} className="text-blue-500 border border-1 border-blue-500 hover:text-black bg-white rounded-lg px-8 py-2 text-sm font-medium">
                  {userName}
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-20">
                    <Link legacyBehavior href="/profile">
                      <a className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
                    </Link>
                    <Link legacyBehavior href="/history">
                      <a className="block px-4 py-2 text-gray-800 hover:bg-gray-100">History</a>
                    </Link>
                    <Link legacyBehavior href="/ticket">
                      <a className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Ticket</a>
                    </Link>
                    <Link legacyBehavior href="/edit-password">
                      <a className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Change Password</a>
                    </Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link legacyBehavior href="/login">
                  <a className="text-white hover:text-white bg-blue-500 rounded-lg px-8 py-2 text-sm font-medium">Login</a>
                </Link>
                <Link legacyBehavior href="/register">
                  <a className="text-blue-500 hover:text-blue-700 px-8 py-2 text-sm font-medium border border-blue-500 rounded-lg">Register</a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        {userName ? (
          <>
            <Link legacyBehavior href="/settings">
              <a className="text-gray-900 hover:text-gray-700 block px-3 py-2 text-base font-medium" onClick={closeMenu}>Settings</a>
            </Link>
            <Link legacyBehavior href="/history">
              <a className="text-gray-900 hover:text-gray-700 block px-3 py-2 text-base font-medium" onClick={closeMenu}>History</a>
            </Link>
            <button onClick={handleLogout} className="text-gray-900 hover:text-gray-700 block w-full text-left px-3 py-2 text-base font-medium">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link legacyBehavior href="/login">
              <a className="text-gray-900 hover:text-gray-700 block px-3 py-2 text-base font-medium" onClick={closeMenu}>Login</a>
            </Link>
            <Link legacyBehavior href="/register">
              <a className="text-gray-900 hover:text-gray-700 block px-3 py-2 text-base font-medium" onClick={closeMenu}>Register</a>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
