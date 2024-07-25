// pages/login.js

import Head from 'next/head';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex relative">
      <Head>
        <title>Login</title>
      </Head>
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="text-center">
          <img src="/svgs/Logo.svg" alt="Logo" className="w-full h-full mx-auto mb-4" />
        </div>
      </div>
      <div className="w-1/2 bg-[#F8F7F3] flex flex-col items-center justify-center relative">
        <h2 className="absolute top-4 left-4 text-3xl font-bold text-blue-600">Login</h2>
        <div className="max-w-md w-full p-8">

          <div className="absolute top-0 right-0">
            <img src="/svgs/tixlog.svg" alt="Logo" className="w-full h-full" />
          </div>
          <div className='pb-4 text-center justify-center'>
            <h1 className='text-3xl text-blue-500 font-bold'>Welcome Back !</h1>
            <p className='text-lg'>Enter your email and password to acces your account</p>
          </div>
          <form>
          <div className="relative mb-6">
              <input
                id="username"
                type="username"
                placeholder=" "
                className="border-blue-500 shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                placeholder=" "
                className="border-blue-500 shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <label
                htmlFor="password"
                className="absolute top-1 left-3 mb-4 text-gray-500 text-sm transform -translate-y-1 scale-75 origin-top-left transition-all duration-300 ease-in-out pointer-events-none"
              >
                Password
              </label>
            </div>

            <div className="flex items-center justify-between mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                type="button"
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
              >
                <div className="">
                  <img src="/svgs/google.svg" alt="Logo" className="w-full h-full pr-8 mx-auto" />
                </div>
                Sign in with Google
              </button>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-sm text-gray-600">
                Don't have an account yet? <a href="/register" className="text-blue-500">Register now</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
