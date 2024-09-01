'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import classNames from 'classnames'; // To handle dynamic classes
import Image from 'next/image';

export default function LoginPage() {
  const [emailOrUsername, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [shake, setShake] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Track form submission

  const handleSubmit = () => {
    setSubmitted(true); // Set submitted to true on form submission

    if (!emailOrUsername || !password) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    const formData = { emailOrUsername, password };
    console.log('Form Data:', formData);

    axios.post('http://localhost:5000/api/users/login', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log('Login successful:', response.data);
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('username', response.data.username);
        sessionStorage.setItem('userId', response.data.Id);
        sessionStorage.setItem('image', response.data.image);
        sessionStorage.setItem('role', response.data.role);
        window.location.href=`http://localhost:3000/dashboard-${response.data.role}`;
      })
      .catch(error => {
        console.error('Login error:', error);
        setErrorMessage('Invalid username or password. Please try again.');
      });
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="min-h-screen flex relative">
      <Head>
        <title>Login</title>
      </Head>
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="text-center">
          <Image src="/svgs/Logo.svg" width={24} height={24} alt="Logo" className="w-full h-full mx-auto mb-4" />
        </div>
      </div>
      <div className="w-1/2 bg-[#F8F7F3] flex flex-col items-center justify-center relative">
        <h2 className="absolute top-4 left-4 text-3xl font-bold text-blue-600">Login</h2>
        <div className="max-w-md w-full p-8">
        <div className="absolute top-0 right-0">
          <Image src="/svgs/tixlog.svg" alt="Logo" layout="fill" />
        </div>
          <div className='pb-4 text-center justify-center'>
            <h1 className='text-3xl text-blue-500 font-bold'>Welcome Back!</h1>
            <p className='text-lg'>Enter your email and password to access your account</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative mb-6">
              <input
                id="username"
                type="text"
                value={emailOrUsername}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=" "
                className={classNames(
                  "border-blue-500 shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                  { "border-red-500": submitted && !emailOrUsername, "animate-shake": shake }
                )}
              />
              <label
                htmlFor="username"
                className="absolute top-1 left-3 mb-4 text-gray-500 text-sm transform -translate-y-1 scale-75 origin-top-left transition-all duration-300 ease-in-out pointer-events-none"
              >
                Username
              </label>
            </div>
            <div className="relative mb-6">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                className={classNames(
                  "border-blue-500 shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                  { "border-red-500": submitted && !password, "animate-shake": shake }
                )}
              />
              <label
                htmlFor="password"
                className="absolute top-1 left-3 mb-4 text-gray-500 text-sm transform -translate-y-1 scale-75 origin-top-left transition-all duration-300 ease-in-out pointer-events-none"
              >
                Password
              </label>
            </div>

            {errorMessage && (
              <div className="mb-4 text-red-500 text-center">
                {errorMessage}
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                type="button"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
            <div className="flex items-center justify-center mb-4">
              <p className="text-sm text-gray-600">or login with</p>
            </div>
            <div className="flex items-center justify-center mb-4">
            <button
              className="text-blue-500 flex justify-center border border-1 border-blue-500 font-bold py-3 px-3 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
              onClick={handleGoogleLogin}
            >
              <div className="">
                <Image src="/svgs/google.svg" alt="Logo" width={24} height={24} />
              </div>
              Sign in with Google
            </button>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account yet? <a href="/register" className="text-blue-500">Register now</a>
              </p>
            </div>
          </form>
        </div>
      </div>
      
      <style jsx global>{`
        .animate-shake {
          animation: shake 0.5s;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateY(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
