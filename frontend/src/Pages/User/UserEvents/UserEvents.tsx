import { useEffect, useState } from 'react';
import SignupNavbar from '../../../Components/User/Navbar/Navbar';
import CreateEvent from '../../../Components/Modals/CreateEvent';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../Redux/Slice/userSlice';
import axiosInstance from '../../../Axios/Axios';
import { format } from 'date-fns';
import './UserEvents.css'

function UserEvents() {
  const navigate = useNavigate();
  const [isBlocked, setIsBlocked] = useState<boolean>(false)
  const [eventModal, setEventModal] = useState<boolean>(false);
  const [userEvents, setUserEvents] = useState([]); 

  const user = useSelector(selectUser);
  const id = user?.user?._id
  

  useEffect(() => {
    console.log('hello')
    axiosInstance.patch(`/blockUser/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setIsBlocked(data.isBlocked); // Set the isBlocked state based on the API response.
        if (data.isBlocked) {
          navigate('/login'); // Redirect to the login page if blocked.
        }
      })
      .catch((error) => {
        console.error('API request error:', error);
      });
  }, [])

  const openModal = () => {
    setEventModal(true);
  }

  const closeModal = () => {
    setEventModal(false);
  }

  useEffect(() => { 
    axiosInstance.get(`/getEvent`).then((res) => {
      if (res.data.message && Array.isArray(res.data.message)) {
        setUserEvents(res.data.message);
      } else {
        console.log('Invalid data received from the API:', res.data.message);
      }
    }).catch((error) => console.log(error, 'axios another user'));

  },[]);

  return (
    <>
      <SignupNavbar />
      <div className="grid grid-cols-2 gap-0">
        <div className="mt-2 flex items-center justify-center flex-col">
          <div className="p-6 w-80 bg-white border bottom-2">
            <h1 className="font-semibold text-slate-800 text-lg">
              Event I'm Organizing
            </h1>
          </div>
          <div className="p-5 w-80 bg-white border bottom-2">
            <button
              type="button"
              onClick={openModal}
              className="bg-slate-700 text-white p-2 pl-14 pr-14 rounded-sm"
            >
              Create an Event
            </button>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-center flex-col">
          <div className="p-5 h-[65px] w-[655px] bg-white border bottom-2 mb-0">
            <h1 className="font-semibold text-slate-800 text-lg">Events</h1>
          </div>
          <div className="p-5 w-[655px] h-auto bg-white border bottom-2">
            {Array.isArray(userEvents) ? (
              userEvents.map((event, index) => [(
                <div key={event?._id} className="w-[655px] event-card">
                  <h1 className='text-green-900 font-semibold text-lg'>{event?.eventName}</h1>
                  <h2 className='text-slate-800 text-base'>{event?.location}</h2>
                  <h2 className='text-slate-800 font-semibold text-base'>{format(new Date(event?.startDate), 'dd-MM-yyyy')} to {format(new Date(event?.endDate), 'dd-MM-yyyy')}</h2>
                  <h2 className='text-slate-800 text-base'>{event.attendees ? event.attendees.length : 0} Attending</h2>
                  <button className='bg-green-700 px-5 py-1 rounded-sm text-white mt-2'>Join</button>
                </div>
              )])
            ) : (
              <p>Loading or no events available.</p>
            )}
          </div>
        </div>
      </div>

      <CreateEvent closeModal={closeModal} visible={eventModal} />
    </>
  );
}

export default UserEvents;
