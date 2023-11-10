import { useEffect, useState } from "react";
import SignupNavbar from "../../../Components/User/Navbar/Navbar";
import CreateEvent from "../../../Components/Modals/CreateEvent";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/Slice/userSlice";
import axiosInstance from "../../../Axios/Axios";
import { format } from "date-fns";
import "./UserEvents.css";


function UserEvents() {
  const navigate = useNavigate();
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [eventModal, setEventModal] = useState<boolean>(false);
  const [userEvents, setUserEvents] = useState([]);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [updateUI, setUpdateUI] = useState<boolean>(false)

  const baseUrl = "https://res.cloudinary.com/dkba47utw/image/upload/v1698223651";

  const user = useSelector(selectUser);
  const id = user?.user?._id;

  useEffect(() => {
    axiosInstance
      .get(`/getEvent`)
      .then((res) => {
        if (res.data.message && Array.isArray(res.data.message)) {
          setUserEvents(res.data.message);
        } else {
          console.error(
            "Invalid data received from the API:",
            res.data.message
          );
        }
      })
      .catch((error) => console.log(error, "axios another user"));
  }, [setUserEvents, updateUI]);

  useEffect(() => {
    axiosInstance
      .get(`/attendingEvents/${id}`)
      .then((response) => {
        if (response.data.user) {
          setAttendingEvents(response.data.user);
          
        } else {
          console.log(
            "Invalid data received from the API:",
            response.data.message
          );
        }
      })
      .catch((error) => {
        console.error("API request error:", error);
      });
  }, [updateUI]);


  const openModal = () => {
    setEventModal(true);
  };

  const closeModal = () => {
    setEventModal(false);
  };

  const handleJoin = async (eventId: string) => {
    try {
      
      const response = await axiosInstance.get(`/joinEvent/${eventId}`);
      // Handle the response if needed
      console.log("Joined event:", response.data);
      setUpdateUI((prev) => ! prev)

      // You can also update the userEvents state or perform other actions as needed
    } catch (error) {
      console.error("Error joining event:", error);
      // Handle the error, such as displaying an error message to the user
    }
  };

  const isAttendingEvent = (eventId) => {
    // Check if the event is in the attendingEvents array
    return attendingEvents?.eventsAttending?.some(
      (event) => event?._id === eventId
    );
  };

  const getEventDetails = async (eventId: string) => {
    navigate(`/eventDetailedPage/${eventId}`);
  };

  return (
    <>
      <SignupNavbar />
      <div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg overflow-hidden">
        <div className="w-full flex flex-col gap-2 pt-5 pb-10 h-auto sm:flex-col sm:w-full lg:gap-4 md:flex-row  ">
          <div className="flex flex-col gap-4">
            <div className="flex items-center flex-col bg-white border border-slate-300 mx-4 md:mr-2 lg:mx-0">
              <div className="p-5 w-full sm:w-full md:w-80 lg:w-80 border-b">
                <h1 className="font-semibold text-slate-800 text-lg">
                  Event I'm Organizing
                </h1>
              </div>
              <div className="p-5 w-full sm:w-full md:w-80 lg:w-80 bg-white">
                <button
                  type="button"
                  onClick={openModal}
                  className="bg-slate-700 text-white p-2 sm:pl-14 sm:pr-14 rounded-sm w-full"
                >
                  Create an Event
                </button>
              </div>
            </div>
            <div className="flex items-center flex-col bg-white border border-slate-300 mx-4 md:mr-2 md:mb-0 lg:mx-0">
              <div className="p-5 w-full sm:w-full md:w-80 lg:w-80">
                <h1 className="font-semibold text-slate-800 text-lg">
                  Events I'm Attending
                </h1>
              </div>
              <div className=" w-full sm:w-full md:w-80 lg:w-80">
                {attendingEvents?.eventsAttending?.length > 0 ? (
                  attendingEvents?.eventsAttending?.map((event, index) => (
                    <div
                      key={event?._id}
                      className="w-auto event-card border-t"
                    >
                      <div className="flex flex-row gap-4">
                        <div>
                          <img
                            className="h-[100px] w-[100px] sm:w-[100px] md:w-[150px] lg:w-[150px] xl:w-[150px]"
                            src={`${baseUrl}/${event?.image}`}
                            alt={event.eventName}
                          />
                        </div>
                        <div>
                          <h1
                            className=" text-green-900 hover:text-green-700 hover:underline underline-offset-1 font-semibold cursor-pointer"
                            style={{ fontSize: "17px", lineHeight: "1.1" }}
                            onClick={() => getEventDetails(event?._id)}
                          >
                            {event?.eventName}
                          </h1>
                          <h2 className="text-slate-800 text-base">
                            {event?.location}
                          </h2>
                          <h2 className="text-slate-800 font-semibold text-base">
                            {format(new Date(event?.startDate), "dd-MM-yyyy")}{" "}
                            to {format(new Date(event?.endDate), "dd-MM-yyyy")}
                          </h2>
                          <h2 className="text-slate-800 text-base">
                            {event.attendees ? event.attendees.length : 0}{" "}
                            Attending
                          </h2>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 w-full sm:w-full md:w-80 lg:w-80 bg-white border-t">
                    <p>You aren't attending any events yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mx-4 my-2 md:my-0 md:ml-0 w-auto sm:mr-4 md:w-auto lg:w-[655px] xl:w-[655px]">
            <div className="flex items-center flex-col bg-white border border-slate-300">
              <div className="p-5 w-full lg:w-[655px] mb-0">
                <h1 className="font-semibold text-slate-800 text-lg">Events</h1>
              </div>
              <div className="w-full bg-white">
                {Array.isArray(userEvents) ? (
                  userEvents.map((event, index) => (
                    <div
                      key={event?._id}
                      className="w-auto event-card border-t"
                    >
                      <div className="flex flex-row gap-4">
                        <div>
                          <img
                            style={{ width: "100px", height: "100px" }}
                            src={`${baseUrl}/${event?.image}`}
                            alt={event.eventName}
                          />
                        </div>
                        <div>
                          <h1
                            className="text-green-700 hover:text-green-900 hover:underline underline-offset-1 font-semibold text-lg cursor-pointer"
                            onClick={() => getEventDetails(event?._id)}
                          >
                            {event?.eventName}
                          </h1>
                          <h2 className="text-slate-800 text-base">
                            {event?.location}
                          </h2>
                          <h2 className="text-slate-800 font-semibold text-base">
                            {format(new Date(event?.startDate), "dd-MM-yyyy")}{" "}
                            to {format(new Date(event?.endDate), "dd-MM-yyyy")}
                          </h2>
                          <h2 className="text-slate-800 text-base">
                            {event.attendees ? event.attendees.length : 0}{" "}
                            Attending
                          </h2>
                          {!isAttendingEvent(event?._id) && ( // Conditionally render the button
                            <button
                              onClick={() => handleJoin(event?._id)}
                              className="bg-green-700 px-5 py-1 rounded-sm text-white mt-2"
                            >
                              Join
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Loading or no events available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateEvent closeModal={closeModal} visible={eventModal} updateUI={setUpdateUI} />
    </>
  );
}

export default UserEvents;
