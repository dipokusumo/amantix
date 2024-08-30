'use client'
import Navbar from '@/components/navbarUser';
import { useState } from 'react';

const BuyTicketPage = () => {
  const [category, setCategory] = useState('Workshop');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    teamName: '',
    phoneNumber: '',
    email: '',
    university: '',
    homeAddress: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setFormData({
      firstName: '',
      lastName: '',
      teamName: '',
      phoneNumber: '',
      email: '',
      university: '',
      homeAddress: '',
    });
    setIsSubmitted(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email: string) => {
    return email.includes('@');
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email address containing "@"');
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg h-full w-full max-w-8xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Buy Ticket</h1>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white rounded-lg p-2 w-[141px] h-[47px]"
            >
              Submit
            </button>
          </div>
          <div className='md:px-24'>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
                  <h1 className="text-xl font-semibold mb-4">Music Festival</h1>
                  <div className='bg-gray-200 rounded-md px-2'>
                    <img src="/svgs/img4.svg" alt="Event" className="w-full min-w-7xl" />
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">General Information</h2>
                  {category === 'Workshop' && (
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="rounded-md p-2 border border-1 border-blue-500"
                        />
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="border border-1 border-blue-500 rounded-md p-2"
                        />
                      </div>
                      <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="border border-1 border-blue-500 rounded-md p-2"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`border border-1 rounded-md p-2 ${isSubmitted && !validateEmail(formData.email) ? 'border-red-500' : 'border-blue-500'}`}
                      />
                      <input
                        type="text"
                        name="university"
                        placeholder="Name of your University"
                        value={formData.university}
                        onChange={handleInputChange}
                        className="border border-1 border-blue-500 rounded-md p-2"
                      />
                    </div>
                  )}
                  {category === 'Tournament' && (
                    <div className="flex flex-col gap-4">
                      <input
                        type="text"
                        name="teamName"
                        placeholder="Team Name"
                        value={formData.teamName}
                        onChange={handleInputChange}
                        className="border border-1 border-blue-500 rounded-md p-2"
                      />
                      <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="border border-1 border-blue-500 rounded-md p-2"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`border border-1 rounded-md p-2 ${isSubmitted && !validateEmail(formData.email) ? 'border-red-500' : 'border-blue-500'}`}
                      />
                    </div>
                  )}
                  {category === 'Concert' && (
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="border border-1 border-blue-500 rounded-md p-2"
                        />
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="border border-1 border-blue-500 rounded-md p-2"
                        />
                      </div>
                      <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="border border-1 border-blue-500 rounded-md p-2"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`border border-1 rounded-md p-2 ${isSubmitted && !validateEmail(formData.email) ? 'border-red-500' : 'border-blue-500'}`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <label htmlFor="category" className="block text-black mb-2 font-bold text-xl">
                  Event Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                  className="border rounded-md p-2 w-full"
                >
                  <option value="Workshop">Workshop</option>
                  <option value="Tournament">Tournament</option>
                  <option value="Concert">Concert</option>
                </select>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <label className="block text-black mb-2 font-bold text-xl">Event Price</label>
                <p className="text-blue-600 text-2xl font-bold">Rp 130.000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyTicketPage;
