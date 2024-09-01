'use client';
import Navbar from '@/components/navbarUser';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

const AddEventPage = () => {
  // Category State
  const [category, setCategory] = useState('workshop');

  // General Information States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventType, setEventType] = useState("offline");
  const [protection, setProtection] = useState(false);

  // Price and Stock States
  const [price, setPrice] = useState("");
  const [ticketStock, setTicketStock] = useState("");

  // User Authentication States
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

  const [error, setError] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const GoogletokenParam = searchParams.get('token') || '';
    const GoogleuserIdParam = searchParams.get('id') || '';
    const GoogleusernameParam = searchParams.get('username') || '';
    const GoogleimageParam = searchParams.get('image') || '';
    const GoogleroleParam = searchParams.get('role') || '';

    if (GoogletokenParam && GoogleuserIdParam && GoogleusernameParam) {
      setGoogleUserId(GoogleuserIdParam);
      setGoogleUsername(GoogleusernameParam);
      setGoogleImage(GoogleimageParam);
      setGoogleRole(GoogleroleParam);
      setGoogleToken(GoogletokenParam);

      sessionStorage.setItem('userId', GoogleuserIdParam);
      sessionStorage.setItem('username', GoogleusernameParam);
      sessionStorage.setItem('image', GoogleimageParam);
      sessionStorage.setItem('role', GoogleroleParam);
      sessionStorage.setItem('token', GoogletokenParam);

      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState(null, '', cleanUrl);
    } else {
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

  // Handle Category Change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setIsSubmitted(false);
  };

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    const checked = 'checked' in e.target ? (e.target as HTMLInputElement).checked : undefined;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'eventDate':
        setEventDate(value);
        break;
      case 'startTime':
        setStartTime(value);
        break;
      case 'endTime':
        setEndTime(value);
        break;
      case 'location':
        setLocation(value);
        break;
      case 'eventLink':
        setEventLink(value);
        break;
      case 'protection':
        setProtection(checked ?? false);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'ticketStock':
        setTicketStock(value);
        break;
      default:
        break;
    }
  };

  // Handle Event Type Change
  const handleEventTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventType(e.target.value);
  };

  // Handle Form Submission
  const handleSubmit = async () => {
    setIsSubmitted(true);

    const savedToken = sessionStorage.getItem('token');

    // Validate Required Fields
    if (!name || !startTime || !endTime || !eventDate) {
      alert('Please fill in all required fields');
      return;
    }

    // Compile Data Based on Category
    const eventData = {
      name,
      description,
      eventDate,
      startTime,
      endTime,
      location: eventType === 'offline' ? location : '',
      eventLink: eventType === 'online' ? eventLink : '',
      eventType,
      category,
      protection,
      price,
      ticketStock
    };

    try {
      const response = await axios.post('http://localhost:5000/api/event/seller/addevent', 
        {name,
        description,
        eventDate,
        startTime,
        endTime,
        location,
        eventLink,
        eventType,
        category,
        protection,
        price,
        ticketStock}, {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      // Handle Success (e.g., redirect or show success message)
      alert('Event added successfully. Redirecting you to dashboard...');
      router.push('/dashboard-seller'); // Redirect to events page or another appropriate page
    } catch (error: any) {
      // Handle Error
      console.error('Error adding event:', error);
      alert(error.response?.data?.message || 'An error occurred while adding the event.');
    }
  };

  // Render General Information Form
  const renderGeneralInformationForm = () => {
    return (
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">General Information</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={name}
            onChange={handleInputChange}
            className="border border-blue-500 rounded-md p-2"
          />
          <input
            type="text"
            name="startTime"
            placeholder="Start Time"
            value={startTime}
            onChange={handleInputChange}
            className="border border-blue-500 rounded-md p-2"
          />
          <input
            type="text"
            name="endTime"
            placeholder="End Time"
            value={endTime}
            onChange={handleInputChange}
            className="border border-blue-500 rounded-md p-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={handleInputChange}
            className="border border-blue-500 rounded-md p-2"
          />
          <input
            type="date"
            name="eventDate"
            placeholder="Schedule"
            value={eventDate}
            onChange={handleInputChange}
            className="border border-blue-500 rounded-md p-2"
          />

          {category !== 'Concert' && (
            <div className="flex items-center gap-2">
              <label className="font-semibold">Event Type:</label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="eventType"
                  value="online"
                  checked={eventType === 'online'}
                  onChange={handleEventTypeChange}
                  className="mr-1"
                />
                Online
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="eventType"
                  value="offline"
                  checked={eventType === 'offline'}
                  onChange={handleEventTypeChange}
                  className="mr-1"
                />
                Offline
              </label>
            </div>
          )}

          {eventType === 'online' ? (
            <input
              type="text"
              name="eventLink"
              placeholder="Enter Online Link"
              value={eventLink}
              onChange={handleInputChange}
              className="border border-blue-500 rounded-md p-2"
            />
          ) : (
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={location}
              onChange={handleInputChange}
              className="border border-blue-500 rounded-md p-2"
            />
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="protection"
              checked={protection}
              onChange={handleInputChange}
              className="border border-blue-500 rounded-md"
            />
            <label className="font-semibold">Protection</label>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col">
      {(Googleusername && Googletoken) ? (
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
                    <Image src="/svgs/img4.svg" alt="Event" width={100} height={100} className="w-full h-full" />
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
                  <option value="workshop">Workshop</option>
                  <option value="tournament">Tournament</option>
                  <option value="concert">Concert</option>
                </select>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <label className="block text-black mb-2 font-bold text-xl">Price and Stock</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center border border-blue-500 rounded-md">
                    <span className="px-2 bg-white">Rp</span>
                    <input
                      type="text"
                      name="price"
                      value={price}
                      onChange={handleInputChange}
                      className="flex-1 p-2 outline-none rounded-md"
                    />
                  </div>
                  <input
                    type="text"
                    name="ticketStock"
                    placeholder="Stock"
                    value={ticketStock}
                    onChange={handleInputChange}
                    className="border border-blue-500 rounded-md p-2"
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
