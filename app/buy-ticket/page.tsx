'use client'
import Navbar from '@/components/navbarUser';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const formatRupiah = (number: number) => {
  return number.toLocaleString('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0, // Menghilangkan ,00
    maximumFractionDigits: 0, // Menghilangkan ,00
  });
  };

const BuyTicketPage = () => {
  const [category, setCategory] = useState('Workshop');

  const [workshopFormDataList, setWorkshopFormDataList] = useState([
    { firstName: '', lastName: '', phoneNumber: '', email: '', university: '' },
  ]);

  const [tournamentFormData, setTournamentFormData] = useState([{
    teamName: '', phoneNumber: '', email: '', homeAddress: '',
  }]);

  const [concertFormDataList, setConcertFormDataList] = useState([
    { firstName: '', lastName: '', phoneNumber: '', email: '', homeAddress: '' },
  ]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [image, setImage] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [Googleusername, setGoogleUsername] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventPrice, setEventPrice] = useState('');
  const [GoogleuserId, setGoogleUserId] = useState('');
  const [Googleimage, setGoogleImage] = useState('');
  const [Googlerole, setGoogleRole] = useState('');
  const [Googletoken, setGoogleToken] = useState('');
  const [ticketsData, setTicketsData] = useState<any[]>([]);
  const [ticketLength, setTicketLength] = useState<number[]>([]);

  // State for managing login errors
  const [error, setError] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const ticketAmount = sessionStorage.getItem('ticket-amount');
    const eventname = sessionStorage.getItem('event-name');
    const eventprice = sessionStorage.getItem('event-price');
    const eventcategory = sessionStorage.getItem('event-category');
    if (ticketAmount && eventname && eventprice && eventcategory) {
      const newTicketLength = Array.from({ length: parseInt(ticketAmount) }, () => null);
      setTicketLength(newTicketLength as never[]);
      setEventName(eventname);
      setEventPrice(eventprice);
      setCategory(eventcategory.charAt(0).toUpperCase() + eventcategory.slice(1));
      switch (category) {
        case "Workshop":
          setTicketsData(workshopFormDataList);
          break;
        case "Tournament":
          setTicketsData(tournamentFormData);
          break;
        case "Concert":
          setTicketsData(concertFormDataList);
          break;
        default:
          break;
      }

      if (eventcategory === 'workshop') {
        setWorkshopFormDataList(Array.from({ length: parseInt(ticketAmount) }, () => ({
          firstName: '', lastName: '', phoneNumber: '', email: '', university: ''
        })));
      } else if (eventcategory === 'concert') {
        setConcertFormDataList(Array.from({ length: parseInt(ticketAmount) }, () => ({
          firstName: '', lastName: '', phoneNumber: '', email: '', homeAddress: ''
        })));
      } else if (eventcategory == 'tournament') {
        setTournamentFormData(Array.from({ length: parseInt(ticketAmount) }, () => ({
          teamName: '', phoneNumber: '', email: '', homeAddress: '',
        })));
      }
    } else {
      router.push("/event-detail");
    }

    // Google login data
    const Googletoken = searchParams.get('token') || '';
    const GoogleuserId = searchParams.get('id') || '';
    const Googleusername = searchParams.get('username') || '';
    const Googleimage = searchParams.get('image') || '';
    const Googlerole = searchParams.get('role') || '';

    if (Googletoken && GoogleuserId && Googleusername) {
      setGoogleUserId(GoogleuserId);
      setGoogleUsername(Googleusername);
      setGoogleImage(Googleimage);
      setGoogleRole(Googlerole);
      setGoogleToken(Googletoken);

      sessionStorage.setItem('userId', GoogleuserId);
      sessionStorage.setItem('username', Googleusername);
      sessionStorage.setItem('image', Googleimage);
      sessionStorage.setItem('role', Googlerole);
      sessionStorage.setItem('token', Googletoken);

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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setIsSubmitted(false);
  };

  const handleWorkshopInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const updatedFormDataList = [...workshopFormDataList];
    updatedFormDataList[index] = {
      ...updatedFormDataList[index],
      [name]: value,
    };
    setWorkshopFormDataList(updatedFormDataList);
  };

  const handleTournamentInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const updatedFormDataList = [...tournamentFormData];
    updatedFormDataList[index] = {
      ...updatedFormDataList[index],
      [name]: value,
    }
    setTournamentFormData(updatedFormDataList);
  };

  const handleConcertInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const updatedFormDataList = [...concertFormDataList];
    updatedFormDataList[index] = {
      ...updatedFormDataList[index],
      [name]: value,
    };
    setConcertFormDataList(updatedFormDataList);
  };

  const validateEmail = (email: string) => {
    return email.includes('@');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const sellerId = sessionStorage.getItem("event-sellerId") || "";
    const eventId = sessionStorage.getItem("eventId") || "";
    const quantity = Number(sessionStorage.getItem("ticket-amount")) || "";
    const savedToken = sessionStorage.getItem('token');

    let ticketsData;

    switch (category) {
      case "Workshop":
        ticketsData = workshopFormDataList; // Langsung gunakan data form
        break;
      case "Tournament":
        ticketsData = tournamentFormData; // Langsung gunakan data form
        break;
      case "Concert":
        ticketsData = concertFormDataList; // Langsung gunakan data form
        break;
      default:
        break;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/transaction/user/buyticket', { eventId, sellerId, quantity, ticketsData }, {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });
      console.log('Data successfully posted:', response.data.paymentUrl);
      router.push(`${response.data.paymentUrl}`);
  } catch (error) {
      console.error('Error posting data:', error);
  }
    // console.log({ workshopFormDataList, tournamentFormData, concertFormDataList });

    // if (
    //   (category === 'Workshop' && workshopFormDataList.every(data => validateEmail(data.email))) ||
    //   (category === 'Tournament' && validateEmail(tournamentFormData.email)) ||
    //   (category === 'Concert' && concertFormDataList.every(data => validateEmail(data.email)))
    // ) {
      
    //   // Proceed with form submission logic
    // } else {
    //   setError('Please provide valid email addresses.');  
    // }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar userName={username} token={token} />
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
                  <h1 className="text-xl font-semibold mb-4">{eventName}</h1>
                  <div className='bg-gray-200 rounded-md px-2'>
                    <img src="/svgs/img4.svg" alt="Event" className="w-full min-w-7xl" />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">General Information</h2>
                  {category === 'Workshop' && (
                    ticketLength.map((_, index) => (
                      <div key={index} className="flex flex-col gap-4 mt-2">
                        <h2 className="font-semibold mt-2">Data Pemesan {index + 1}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={workshopFormDataList[index]?.firstName || ''}
                            onChange={(e) => handleWorkshopInputChange(e, index)}
                            className="rounded-md p-2 border border-1 border-blue-500"
                          />
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={workshopFormDataList[index]?.lastName || ''}
                            onChange={(e) => handleWorkshopInputChange(e, index)}
                            className="rounded-md p-2 border border-1 border-blue-500"
                          />
                        </div>
                          <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={workshopFormDataList[index]?.phoneNumber || ''}
                            onChange={(e) => handleWorkshopInputChange(e, index)}
                            className="rounded-md p-2 border border-1 border-blue-500"
                          />
                          <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={workshopFormDataList[index]?.email || ''}
                            onChange={(e) => handleWorkshopInputChange(e, index)}
                            className="rounded-md p-2 border border-1 border-blue-500"
                          />
                          <input
                            type="text"
                            name="university"
                            placeholder="University"
                            value={workshopFormDataList[index]?.university || ''}
                            onChange={(e) => handleWorkshopInputChange(e, index)}
                            className="rounded-md p-2 border border-1 border-blue-500"
                          />
                      </div>
                    ))
                  )}
                  {category === 'Tournament' && (
                    ticketLength.map((_, index) => (
                      <div key={index} className="flex flex-col gap-4 mt-2">
                        <h2 className="font-semibold mt-2">Data Tim {index + 1}</h2>
                        <input
                          type="text"
                          name="teamName"
                          placeholder="Team Name"
                          value={tournamentFormData[index]?.teamName || ''}
                          onChange={(e) => handleTournamentInputChange(e, index)}
                          className="rounded-md p-2 border border-1 border-blue-500"
                        />
                        <input
                          type="text"
                          name="phoneNumber"
                          placeholder="Phone Number"
                          value={tournamentFormData[index]?.phoneNumber || ''}
                          onChange={(e) => handleTournamentInputChange(e, index)}
                          className="rounded-md p-2 border border-1 border-blue-500"
                        />
                        <input
                          type="text"
                          name="email"
                          placeholder="Email"
                          value={tournamentFormData[index]?.email || ''}
                          onChange={(e) => handleTournamentInputChange(e, index)}
                          className="rounded-md p-2 border border-1 border-blue-500"
                        />
                        <input
                            type="text"
                            name="homeAddress"
                            placeholder="Home Address"
                            value={tournamentFormData[index]?.homeAddress || ''}
                            onChange={(e) => handleTournamentInputChange(e, index)}
                            className="rounded-md p-2 border border-1 border-blue-500"
                          />
                    </div>
                    ))
                    
                  )}
                  {category === 'Concert' && (
                    ticketLength.map((_, index) => (
                      <div key={index} className="flex flex-col gap-4 mt-2">
                        <h2 className="font-semibold mt-2">Data Pemesan {index + 1}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={concertFormDataList[index]?.firstName || ''}
                            onChange={(e) => handleConcertInputChange(e, index)}
                            className="rounded-md p-2 border border-1 border-blue-500"
                          />
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={concertFormDataList[index]?.lastName || ''}
                            onChange={(e) => handleConcertInputChange(e, index)}
                            className="rounded-md p-2 border border-1 border-blue-500"
                          />
                          </div>
                          <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={concertFormDataList[index]?.phoneNumber || ''}
                            onChange={(e) => handleConcertInputChange(e, index)}
                            className="rounded-md p-2 border border-1 border-blue-500"
                          />
                          <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={concertFormDataList[index]?.email || ''}
                            onChange={(e) => handleConcertInputChange(e, index)}
                            className="rounded-md p-2 border border-1 border-blue-500"
                          />
                          <input
                            type="text"
                            name="homeAddress"
                            placeholder="Home Address"
                            value={concertFormDataList[index]?.homeAddress || ''}
                            onChange={(e) => handleConcertInputChange(e, index)}
                            className="rounded-md p-2 border border-1 border-blue-500"
                          />
                        
                      </div>
                    ))
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
                <p className="text-blue-600 text-2xl font-bold">{formatRupiah(parseInt(eventPrice))}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyTicketPage;
