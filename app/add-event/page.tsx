'use client'
import Navbar from '@/components/navbarUser';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const AddEventPage = () => {
  const [category, setCategory] = useState('Workshop');
  const [formData, setFormData] = useState({
    eventName: '',
    time: '',
    description: '',
    schedule: '',
    eventType: 'Offline',
    location: '',
    link: '',
    protection: false,
    price: '', // Tambahkan price
    stock: '' // Tambahkan stock
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [image, setImage] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [Googleusername, setGoogleUsername] = useState('');
  const [GoogleuserId, setGoogleUserId] = useState('');
  const [Googleimage, setGoogleImage] = useState('');
  const [Googlerole, setGoogleRole] = useState('');
  const [Googletoken, setGoogleToken] = useState('');

  // State for managing login errors
  const [error, setError] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if Google login data is present in URL query parameters
    const Googletoken = searchParams.get('token') || '';  // Default to empty string if null
    const GoogleuserId = searchParams.get('id') || '';    // Default to empty string if null
    const Googleusername = searchParams.get('username') || '';  // Default to empty string if null
    const Googleimage = searchParams.get('image') || '';  // Default to empty string if null
    const Googlerole = searchParams.get('role') || '';    // Default to empty string if null
  
    if (Googletoken && GoogleuserId && Googleusername) {
      // If Google login data is present, use it
      setGoogleUserId(GoogleuserId);
      setGoogleUsername(Googleusername);
      setGoogleImage(Googleimage);
      setGoogleRole(Googlerole);
      setGoogleToken(Googletoken);
  
      // Save Google login data to sessionStorage
      sessionStorage.setItem('userId', GoogleuserId);
      sessionStorage.setItem('username', Googleusername);
      sessionStorage.setItem('image', Googleimage);
      sessionStorage.setItem('role', Googlerole);
      sessionStorage.setItem('token', Googletoken);
  
      // Clean up the URL query parameters
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState(null, '', cleanUrl);
    } else {
      // If no Google login data, fall back to traditional login data from sessionStorage
      const savedUsername = sessionStorage.getItem('username') || '';
      const savedUserId = sessionStorage.getItem('userId') || '';
      const savedImage = sessionStorage.getItem('image') || '';
      const savedRole = sessionStorage.getItem('role') || '';
      const savedToken = sessionStorage.getItem('token') || '';
  
      if (savedUsername) {
        setUsername(savedUsername);
        setUserId(savedUserId);
        setImage(savedImage);
        setRole(savedRole);
        setToken(savedToken);
      } else {
        setError('No user data found in sessionStorage or query parameters. Please log in again.');
        router.push('/login');
      }
    }
  }, [searchParams, router]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setFormData({
      eventName: '',
      time: '',
      description: '',
      schedule: '',
      eventType: 'Offline',
      location: '',
      link: '',
      protection: false,
      price: '', // Reset price saat kategori berubah
      stock: '' // Reset stock saat kategori berubah
    });
    setIsSubmitted(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    // Mengakses properti checked hanya jika elemen adalah checkbox
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleEventTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      eventType: e.target.value,
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (!formData.eventName || !formData.time || !formData.schedule || !formData.location) {
      alert('Please fill in all required fields');
    } else {
      console.log(formData);
    }
  };

  const renderGeneralInformationForm = () => {
    return (
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">General Information</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="eventName"
            placeholder="Event Name"
            value={formData.eventName}
            onChange={handleInputChange}
            className="border border-1 border-blue-500 rounded-md p-2"
          />
          <input
            type="text"
            name="time"
            placeholder="Time"
            value={formData.time}
            onChange={handleInputChange}
            className="border border-1 border-blue-500 rounded-md p-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="border border-1 border-blue-500 rounded-md p-2"
          />
          <input
            type="date"
            name="schedule"
            placeholder="Schedule"
            value={formData.schedule}
            onChange={handleInputChange}
            className="border border-1 border-blue-500 rounded-md p-2"
          />

          {category !== 'Concert' && (
            <div className="flex items-center gap-2">
              <label className="font-semibold">Event Type:</label>
              <input
                type="radio"
                name="eventType"
                value="Online"
                checked={formData.eventType === 'Online'}
                onChange={handleEventTypeChange}
              /> Online
              <input
                type="radio"
                name="eventType"
                value="Offline"
                checked={formData.eventType === 'Offline'}
                onChange={handleEventTypeChange}
              /> Offline
            </div>
          )}

          {formData.eventType === 'Online' && (
            <input
              type="text"
              name="link"
              placeholder="Enter Online Event Link"
              value={formData.link}
              onChange={handleInputChange}
              className="border border-1 border-blue-500 rounded-md p-2"
            />
          )}

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
            className="border border-1 border-blue-500 rounded-md p-2"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="protection"
              checked={formData.protection}
              onChange={handleInputChange}
              className="border border-1 border-blue-500 rounded-md"
            />
            <label className="font-semibold">Protection</label>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col">
      {Googleusername && Googletoken ? (
        <Navbar userName={Googleusername} token={Googletoken} />
      ) : (
        <Navbar userName={username} token={token} />
      )}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg h-full w-full max-w-8xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Add New Event</h1>
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
                  <h1 className="text-xl font-semibold mb-4">Display Picture</h1>
                  <div className='bg-gray-200 rounded-md px-2'>
                    <img src="/svgs/img4.svg" alt="Event" className="w-full h-full" />
                  </div>
                  <button className="text-blue-500 mt-4">Upload Photo</button>
                </div>
              </div>

              <div className="flex-1">
                {renderGeneralInformationForm()}
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
                <label className="block text-black mb-2 font-bold text-xl">Price and Stock</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center border border-1 border-blue-500 rounded-md">
                    <span className="px-2 bg-white">Rp</span>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="flex-1 p-2 outline-none rounded-md"
                    />
                  </div>
                  <input
                    type="text"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="border border-1 border-blue-500 rounded-md p-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEventPage;