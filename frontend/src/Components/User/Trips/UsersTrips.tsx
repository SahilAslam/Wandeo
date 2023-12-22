import React, { useState } from "react";
import moment from "moment";
import { ImHome3 } from "react-icons/im";
import { IoCalendarSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { ImUser } from "react-icons/im";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/Slice/userSlice";
import { useNavigate } from "react-router-dom";

interface PublicTripsProps {
  publicTrips: Trip[];
  hostingExists: any;
}

interface Trip {
  _id: string;
  userId: string;
  destination: string;
  arrivalDate: Date; 
  departureDate: Date; 
  noOfTravelers: number;
  description: string;
}

const UsersTrips: React.FC<PublicTripsProps> = ({ publicTrips, hostingExists }) => {
  const [showMoreStates, setShowMoreStates] = useState<{
    [key: string]: boolean;
  }>({});

  const user = useSelector(selectUser) as any;
  const userId = user?.id ? user?.id : user?.user?._id;

  const navigate = useNavigate();

  const toggleShowMore = (tripId: string) => {
    setShowMoreStates((prevStates) => ({
      ...prevStates,
      [tripId]: !prevStates[tripId],
    }));
  };

  const handleNavigate = (targettedUserId: string) => {
    navigate(`/hostuser/${targettedUserId}`);
  };

  const handleClick = (messageId: string) => {
    navigate(`/messageDetailedPage/${messageId}`);
  };

  return (
    <>
      {publicTrips && publicTrips.length > 0 ? (
        publicTrips.map((trip) => (
          <div className="px-5 pt-5 border-b" key={trip._id}>
            <div className="flex flex-col pb-4 sm:pb-0 sm:flex-row justify-between sm:items-center">
              <div>
                <p className="text-slate-800 pb-4">
                  visiting:{" "}
                  <span className="font-semibold">{trip?.destination}</span>
                </p>
                <div className="flex flex-wrap gap-2 text-slate-700 pb-4">
                  <div className="flex items-center">
                    <ImHome3 className="mr-1" />
                    <p>
                      {moment(trip.departureDate).diff(trip.arrivalDate, "days") ===
                      1
                        ? `${moment(trip.departureDate).diff(
                            trip.arrivalDate,
                            "days"
                          )} night`
                        : `${moment(trip.departureDate).diff(
                            trip.arrivalDate,
                            "days"
                          )} nights`}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <IoCalendarSharp className="mr-1" />
                    <p>{moment(trip?.arrivalDate).format("ddd MMM D")}</p>
                  </div>
                  <div className="flex items-center">
                    <FaArrowRight className="mr-1" />
                    <p>{moment(trip?.departureDate).format("ddd MMM D")}</p>
                  </div>
                  <div className="flex items-center">
                    <ImUser className="mr-1" />
                    <p>{trip?.noOfTravelers} Traveler</p>
                  </div>
                </div>
              </div>
              {userId !== trip?.userId && (
                hostingExists ? (
                  <div>
                    <button className="bg-link-color hover:bg-link-dark text-white font-semibold px-4 py-1.5 rounded-sm" onClick={() => handleClick(hostingExists?._id)}>Show Message</button>
                  </div>
                ) : (
                  <div>
                    <button className="bg-link-color hover:bg-link-dark text-white font-semibold px-4 py-1.5 rounded-sm" onClick={() => handleNavigate(trip?.userId)}>Offer to Host</button>
                  </div>
                )
              )}
            </div>
            <p className="pb-4" key={trip._id}>
              {trip.description.length > 385 ? (
                <>
                  {showMoreStates[trip._id]
                    ? trip?.description
                    : `${trip?.description.substring(0, 385)}...`}{" "}
                  <button
                    onClick={() => toggleShowMore(trip._id)}
                    className="text-link-color hover:text-link-dark hover:underline"
                  >
                    {showMoreStates[trip._id] ? "Show less" : "Show More"}
                  </button>
                </>
              ) : (
                trip.description // Remove the curly braces here
              )}
            </p>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center bg-slate-100">
          <p className="py-8">You have no upcoming trips.</p>
        </div>
      )}
    </>
  );
};

export default UsersTrips;
