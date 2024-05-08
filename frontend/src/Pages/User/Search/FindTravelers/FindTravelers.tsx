import React, { useEffect, useState } from "react";
import Navbar from "../../../../Components/User/Navbar/Navbar";
import "./FindTraveler.css";
import { RiDoubleQuotesL } from "react-icons/ri";
import { ImUsers } from "react-icons/im";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoCalendarSharp } from "react-icons/io5";
import { ImUser } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../Axios/Axios";
import { toast } from "react-toastify";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../Redux/Slice/userSlice";
import Spinner from "../../../../Components/Spinner/Spinner";

const FindTravelers: React.FC = () => {
  const [travelers, setTravelers] = useState<any[]>([]);
  const [showMoreStates, setShowMoreStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const searchQuery = location.state?.searchQuery || "";

  const user = useSelector(selectUser) as any;
  const id = user?.id ? user?.id : user?.user?._id;

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get("/findTravelers")
      .then((response) => {
        if (response.data) {
          setTravelers(response.data?.travelers);
        }
        if (response.data.error) {
          toast.error(response.data.error);
        }
      })
      .catch((err) => console.log(err, "axios listing err"))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTravelers = travelers.filter((traveler) => {
    return (
      traveler?.userId?.name
        ?.toLowerCase()
        .includes(searchQuery.toLocaleLowerCase()) ||
      traveler?.userId?.address
        ?.toLowerCase()
        .includes(searchQuery.toLocaleLowerCase())
    );
  });

  const toggleShowMore = (userId: string) => {
    setShowMoreStates((prevStates) => ({
      ...prevStates,
      [userId]: !prevStates[userId],
    }));
  };

  const handleNavigate = (targettedUserId: string) => {
    navigate(`/hostuser/${targettedUserId}`);
  };

  const handleClick = (userId: string) => {
    if (id === userId) {
      navigate("/profile");
    } else {
      navigate(`/DiffProfile/${userId}`);
    }
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="px-4 py-2 flex xl:justify-center flex-col gap-2 md:flex-row">
          <div className="order-2 md:order-1 w-full xl:w-auto flex flex-col gap-2">
            <div className="bg-white shadow-lg w-auto xl:w-full">
              <div className="px-5 py-2 w-full xl:min-w-[700px]">
                <h1 className="text-slate-700 font-semibold">Travelers</h1>
              </div>
              {/* <div className="flex flex-col lg:flex-row gap-3 px-5 pt-5 w-auto">
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-2/3">
                  <div className="flex flex-col sm:w-1/2 lg:w-1/2 xl:w-[230px]">
                    <label
                      htmlFor="arive"
                      className="uppercase pb-1 text-gray-400"
                    >
                      Arrive
                    </label>
                    <input
                      type="date"
                      className="px-2 py-1 w-full  h-9 rounded border"
                    />
                  </div>
                  <div className="flex flex-col sm:w-1/2 lg:w-1/2 xl:w-[230px]">
                    <label
                      htmlFor="depart"
                      className="uppercase pb-1 text-gray-400"
                    >
                      Depart
                    </label>
                    <input
                      type="date"
                      className="px-2 py-1 w-full h-9 rounded border placeholder-shown:text-gray-400"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full lg:w-1/3 xl:w-[230px]">
                  <label
                    htmlFor="travelers"
                    className="uppercase pb-1 text-gray-400"
                  >
                    No. of Travelers
                  </label>
                  <input
                    type="number"
                    defaultValue="Any"
                    className="px-2 py-1 w-full h-9 rounded border"
                    
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end px-5 pt-8 pb-5">
                <button className="bg-gray-400 text-white font-semibold px-2 py-1.5 rounded">
                  Clear Filters
                </button>
                <button className="bg-sky-600 text-white font-semibold px-4 py-1.5 rounded">
                  Search
                </button>
              </div> */}
              <div className="bg-gray-100 px-5 py-2.5 w-full">
                <p className="text-gray-400 font-base">
                  {filteredTravelers ? filteredTravelers.length : "no"} users
                  matching
                </p>
              </div>
            </div>
            {filteredTravelers && filteredTravelers.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-5">
                {filteredTravelers.map((traveler) => (
                  <div
                    className=" bg-white shadow-lg w-auto xl:w-[375px] flex flex-col justify-between"
                    key={traveler.userId._id}
                  >
                    <div onClick={() => handleClick(traveler?.userId?._id)}>
                      <div className="p-2 card-details pb-3 flex flex-row ">
                        <div className="image">
                          {traveler?.userId?.profileImage ? (
                            <img
                              src={`${traveler?.userId?.profileImage}`}
                              alt="profile img"
                              className="w-[150px] h-[150px] border"
                            />
                          ) : (
                            <img
                              src={`https://cdn-icons-png.flaticon.com/512/3177/3177440.png`}
                              alt=""
                              className="w-[150px] h-[150px] object-cover border opacity-70"
                            />
                          )}
                        </div>
                        <div className="pl-4 text-slate-700">
                          <div className="pb-2">
                            <h1 className="font-semibold ">
                              {traveler?.userId?.name}
                            </h1>
                            {/* <p className="text-slate-400 text-xs">
                            replies within a day
                          </p> */}
                          </div>
                          <div className="flex pb-3 text-center ">
                            <RiDoubleQuotesL className="mr-1 text-sm" />
                            <p className="text-xs">
                              References:{" "}
                              <span className="font-semibold">18</span>
                            </p>
                          </div>
                          <div className="w-full flex items-center text-center pb-3">
                            <FaGlobeAmericas className="mr-1 text-xs" />
                            {traveler?.userId?.languagesFluentIn ? (
                              <p className="text-xs max-w-[190px]">
                                Speaks{" "}
                                <span className="font-semibold text-xs">
                                  {traveler?.userId?.languagesFluentIn}
                                </span>
                              </p>
                            ) : (
                              <div>
                                <p className="text-xs">
                                  Language:{" "}
                                  <span className="font-semibold">
                                    Unspecified
                                  </span>
                                </p>
                              </div>
                            )}
                          </div>
                          {traveler?.noOfTravelers &&
                          traveler?.noOfTravelers < 2 ? (
                            <div className="flex items-center pb-3">
                              <ImUsers className="mr-1 text-xs" />
                              <p className="text-xs">
                                <span className="font-semibold">
                                  {traveler?.noOfTravelers} Traveler
                                </span>{" "}
                                in place
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-center pb-3">
                              <ImUsers className="mr-1 text-xs" />
                              <p className="text-xs">
                                <span className="font-semibold text-xs">
                                  {traveler?.noOfTravelers} Travelers
                                </span>{" "}
                                in place
                              </p>
                            </div>
                          )}
                          <div className="flex items-center font-semibold">
                            <IoCalendarSharp className=" mr-1 text-sm" />
                            <p className="text-xs">
                              {moment(traveler?.arrivalDate).format("MMM D")} to{" "}
                              {moment(traveler?.departureDate).format("MMM D")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="px-2 pb-2 w-auto flex">
                        <div>
                          <ImUser className="mt-0.5 mr-1 text-xs" />
                        </div>
                        {traveler?.userId?.about ? (
                          <p
                            className=" leading-4.5 text-xs"
                            key={traveler?.userId._id}
                          >
                            {traveler?.userId?.about.length > 178 ? (
                              <>
                                {showMoreStates[traveler?.userId._id]
                                  ? traveler?.userId?.about
                                  : `${traveler?.userId?.about.substring(
                                      0,
                                      178
                                    )}...`}{" "}
                                <button
                                  onClick={() =>
                                    toggleShowMore(traveler?.userId._id)
                                  }
                                  className="text-link-color hover:text-link-dark hover:underline"
                                >
                                  {showMoreStates[traveler?.userId._id]
                                    ? "Show less"
                                    : "Show More"}
                                </button>
                              </>
                            ) : (
                              traveler?.userId?.about
                            )}
                          </p>
                        ) : (
                          <p className="leading-4.5 text-xs">
                            About details not provided
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="py-2 bg-slate-50 hover:bg-slate-100 cursor-pointer">
                      <h1
                        className="text-center text-sm text-link-color font-semibold"
                        onClick={() => handleNavigate(traveler?.userId?._id)}
                      >
                        Offer to Host {traveler?.userId?.name}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white w-full ">
                <p className="px-5 py-5 text-center text-slate-400">
                  No travelers found!
                </p>
              </div>
            )}
          </div>
          <div className="order-1 md:order-2 flex flex-col gap-2">
            <div className="w-full md:w-[310px] bg-white shadow-lg">
              <h1 className="uppercase px-4 py-2 text-sm text-green-800 font-bold">
                also near kochi:
              </h1>
              <div className="px-4 py-2 ">
                <h1 className="">Events in Kochi</h1>
                <h1>Advice from Kochi Locals</h1>
              </div>
            </div>
            <div className="w-full md:w-[310px] text-center px-5 pt-6 pb-10 bg-gradient-to-r from-slate-200 to-slate-300 shadow-lg">
              <h1 className="text-xl">
                Enter your travel dates to filter out busy hosts
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FindTravelers;
