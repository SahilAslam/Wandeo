import React, { useEffect, useState } from "react";
import SignupNavbar from "../../../../Components/User/Navbar/Navbar";
import axiosInstance from "../../../../Axios/Axios";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../Redux/Slice/userSlice";
import { BiTimeFive } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import LeaveEventModal from "../../../../Components/Modals/UserModals/LeaveEventModal";
import Spinner from "../../../../Components/Spinner/Spinner";

interface Attender {
  _id: string;
  name: string;
  profileImage: string;
  address?: string;
}

interface Event {
  _id: string;
  attendees: Attender[];
  attendeesLimit: number;
  eventName: string;
  image: string;
  startDate: Date;
  endDate: Date;
  location: string;
  organizedBy: {
    name: string;
  };
  description: string;
}

const EventDetailedPage: React.FC = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const [updateUI, setUpdateUI] = useState<boolean>(false);
  // const [usersAttending, setUsersAttending] = useState([])
  const [LeaveModal, setLeaveModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const user = useSelector(selectUser) as any;
  const userId = user?.id ? user?.id : user?.user?._id;

  const baseUrl = import.meta.env.VITE_CLOUDINARY_BASE_URL || "";

  const getEventId = async (id: any) => {
    // eslint-disable-next-line no-useless-catch
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/eventDetails/${id}`);

      if (response && response.data && response.data.event) {
        const eventData = response.data.event;

        if (eventData.startDate && eventData.endDate) {
          eventData.startDate = new Date(eventData.startDate);
          eventData.endDate = new Date(eventData.endDate);
        } else {
          throw new Error("Invalid event date format");
        }
        setEvent(eventData);
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEventId(id);
  }, [updateUI, id]);

  const handleJoin = async (eventId: any) => {
    try {
      const response = await axiosInstance.get(`/joinEvent/${eventId}`);

      console.log("Joined event:", response.data);
      setUpdateUI((prev) => !prev);
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  const leaveEvent = async (eventId: any) => {
    try {
      const response = await axiosInstance.get(`/leaveEvent/${eventId}`);

      setUpdateUI((prev) => !prev);
      console.log("successfully leaved:", response.data);
      toast.success(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const isAttendingEvent = () => {
    if (event && userId) {
      // Checking if the user's ID is in the list of event attendees' IDs
      return event.attendees?.some((attendee) => attendee._id === userId);
    }
    return false;
  };

  const handleClick = (attenderId: string) => {
    console.log(userId, "===", attenderId);
    if (userId === attenderId) {
      navigate("/profile");
    } else {
      navigate(`/DiffProfile/${attenderId}`);
    }
  };

  const openLeaveModal = () => {
    setLeaveModal(true);
  };

  const closeLeaveModal = () => {
    setLeaveModal(false);
  };

  return (
    <>
      <ToastContainer />
      <SignupNavbar />
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg overflow-hidden">
          <div className="w-full flex flex-col gap-2 pt-5 pb-10 h-auto sm:flex-col sm:w-full lg:gap-4 md:flex-row  ">
            <div className="flex flex-col gap-4">
              <div className="flex items-center flex-col bg-white border border-slate-300 mx-4 md:mr-2 md:mb-0 lg:mx-0">
                <div className="px-3 w-full sm:w-full md:w-80 lg:w-80 flex justify-between border-b">
                  <div className="py-1">
                    <h1 className="font-semibold text-slate-800 text-lg">
                      {event?.attendees ? event.attendees?.length : 0} Going
                    </h1>
                  </div>
                  <div>
                    <h1 className="bg-red-500 px-2 rounded-b text-white">
                      {event &&
                        `${
                          event.attendeesLimit - event?.attendees?.length
                        } Slots left`}
                    </h1>
                  </div>
                </div>
                <div className=" w-full sm:w-full md:w-80 lg:w-80">
                  {event && event.attendees?.length > 0 ? (
                    event?.attendees?.map((attender) => (
                      <div key={attender?._id} className="w-auto px-4 py-2">
                        <div className="flex flex-row gap-4">
                          <div>
                            <img
                              className="h-[60px] w-[60px] rounded-full"
                              src={`${attender?.profileImage}`}
                              alt={attender?.name}
                            />
                          </div>
                          <div>
                            <h1
                              onClick={() => handleClick(attender?._id)}
                              className=" text-green-900 hover:text-green-700 hover:underline underline-offset-1 font-semibold cursor-pointer"
                              style={{ fontSize: "17px", lineHeight: "1.1" }}
                            >
                              {attender?.name}
                            </h1>
                            <h2 className="text-slate-800 text-sm">
                              {attender.address ? attender.address : ""}
                            </h2>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 w-full sm:w-full md:w-80 lg:w-80 bg-white">
                      <p>No one is attending the event.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mx-4 my-2 md:my-0 md:ml-0 w-auto sm:mr-4 md:w-auto lg:w-[655px] xl:w-[655px] flex flex-col gap-2">
              <div className="flex items-center flex-col bg-white border border-slate-300">
                <div className="w-full bg-white">
                  <div key={event?._id} className="w-auto  border-t">
                    <div className="flex flex-col">
                      <div className="relative">
                        <img
                          className="w-full h-[370px]"
                          src={`${baseUrl}/${event?.image}`}
                          alt={event?.eventName}
                        />
                        <div className="pb-8 pt-2 text-center absolute top-auto left-0 right-0 bottom-0 flex flex-col items-center justify-center ">
                          <h1 className="text-shadow shadow-black text-white text-3xl font-semibold cursor-pointer ">
                            {event?.eventName}
                          </h1>
                          <h1 className="text-shadow shadow-black text-white text-2xl cursor-pointer ">
                            Organized by{" "}
                            <strong className="font-medium">
                              {event?.organizedBy?.name}
                            </strong>
                          </h1>
                        </div>
                      </div>
                      <div className="px-4 py-1">
                        {event && (
                          <h2 className="text-slate-800 font-semibold text-lg flex flex-row items-center gap-1 py-2">
                            <BiTimeFive className="font-extrabold text-xl" />
                            {format(event.startDate, "dd-MM-yyyy")} to{" "}
                            {format(event.endDate, "dd-MM-yyyy")}
                          </h2>
                        )}
                        <h2 className="text-slate-800 text-base flex flex-row items-center gap-1">
                          <MdLocationOn className="font-extrabold text-xl" />
                          {event?.location}
                        </h2>
                        <div className="flex justify-end pb-5">
                          {isAttendingEvent() ? ( // Conditionally render the button
                            <button
                              type="submit"
                              onClick={openLeaveModal}
                              className="bg-gray-500 px-5 py-1 rounded-sm text-white mt-2"
                            >
                              Leave Event
                            </button>
                          ) : (
                            // Conditionally render the button
                            <button
                              className="bg-green-700 px-5 py-1 rounded-sm text-white mt-2"
                              onClick={() => handleJoin(event?._id)}
                            >
                              Join
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-white border border-slate-300">
                <div className="p-4">
                  <h1>
                    {event?.description?.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <LeaveEventModal
        visible={LeaveModal}
        closeModal={closeLeaveModal}
        LeaveEvent={() => leaveEvent(event?._id)}
      />
    </>
  );
};

export default EventDetailedPage;
