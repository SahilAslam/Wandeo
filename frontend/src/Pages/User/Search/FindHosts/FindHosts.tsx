import React, { useEffect, useState } from "react";
import SignupNavbar from "../../../../Components/User/Navbar/Navbar";
import "./FindHosts.css";
import { RiDoubleQuotesL } from "react-icons/ri";
import { ImUsers } from "react-icons/im";
import { FaGlobeAmericas } from "react-icons/fa";
import { TbHomeCheck } from "react-icons/tb";
import { ImUser } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../Axios/Axios";
import { toast } from "react-toastify";
import { GoQuestion } from "react-icons/go";

const FindHosts: React.FC = () => {
  const [hosts, setHosts] = useState<any[]>([]);
  const [showMoreStates, setShowMoreStates] = useState<{
    [key: string]: boolean;
  }>({});

  const location = useLocation();
  const searchQuery = location.state?.searchQuery || "";

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/findHosts")
      .then((response) => {
        if (response.data) {
          setHosts(response.data?.hosts);
          console.log(hosts, "hosts");
        }
        if (response.data.error) {
          toast.error(response.data.error);
        }
      })
      .catch((err) => console.log(err, "axios listing err"));
  }, []);

  const filteredhosts = hosts.filter((host) => {
    return (
      host?.userId?.name
        ?.toLowerCase()
        .includes(searchQuery.toLocaleLowerCase()) ||
      host?.userId?.address
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

  const handleClick = (userId: string) => {
    navigate(`/DiffProfile/${userId}`); 
  };

  return (
    <>
      <SignupNavbar />
      <div className="px-4 py-2 flex xl:justify-center flex-col gap-2 md:flex-row">
        <div className="order-2 md:order-1 w-full xl:w-auto flex flex-col gap-2">
          <div className="bg-white shadow-lg w-auto xl:w-[375px]">
            <div className="px-5 py-2 w-auto">
              <h1 className="text-slate-700 font-semibold">Hosts</h1>
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
            </div> */}
            {/* <div className="flex gap-2 justify-end px-5 pt-8 pb-5">
              <button className="bg-gray-400 text-white font-semibold px-2 py-1.5 rounded">
                Clear Filters
              </button>
              <button className="bg-sky-600 text-white font-semibold px-4 py-1.5 rounded">
                Search
              </button>
            </div> */}
            <div className="bg-gray-100 px-5 py-2.5">
              <p className="text-gray-400 font-base">
                {filteredhosts ? filteredhosts.length : "no"} users matchings
                <span className="text-sky-600 cursor-pointer hover:text-green-800 hover:font-medium"></span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-5">
            {filteredhosts ? (
              filteredhosts.map((host) => (
                <div className=" p-2 bg-white shadow-lg w-auto xl:w-[375px] cursor-pointer" onClick={() => handleClick(host?.userId?._id)}>
                  <div className="card-details pb-2 flex flex-row ">
                    <div className="image">
                      {host?.userId?.profileImage ? (
                        <img
                          src={`${host?.userId?.profileImage}`}
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
                      <h1 className="font-semibold ">{host?.userId?.name}</h1>
                      <p className="text-gray-400 text-xs pb-1.5">
                        replies within a day
                      </p>
                      <div className="flex items-center pb-2">
                        <RiDoubleQuotesL className="mr-1 text-md" />
                        <p className="text-sm">
                          References:{" "}
                          <span className="font-semibold">
                            {host?.userId?.references?.length
                              ? host?.userId?.references?.length
                              : "0"}
                          </span>
                        </p>
                      </div>
                      <div className="flex pb-2">
                        <ImUsers className="mr-1 mt-0.5 text-sm" />
                        <p className="text-sm ">
                          Friends:{" "}
                          <span className="font-semibold">
                            {host?.userId?.friends?.length
                              ? host?.userId?.friends?.length
                              : "0"}
                          </span>
                        </p>
                      </div>
                      <div className="w-full flex ">
                        <div>
                          <FaGlobeAmericas className="mr-1 mt-0.5 text-sm" />
                        </div>
                        {host?.userId?.languagesFluentIn ? (
                          <p className="text-sm pb-2 max-w-[190px]">
                            Speaks{" "}
                            <span className="font-semibold pl-1 text-sm">
                              {host?.userId?.languagesFluentIn}
                            </span>
                          </p>
                        ) : (
                          <div>
                            <p className="text-sm pb-2">
                              Language:{" "}
                              <span className="font-semibold">Unspecified</span>
                            </p>
                          </div>
                        )}
                      </div>
                      {host?.hostingAvailability ? (
                        host?.hostingAvailability === "Accepting Guests" ? (
                          <div className="flex">
                            <TbHomeCheck className="mr-1 mt-0.5 text-green-500 text-sm" />
                            <p className="text-sm text-green-500">
                              {host?.hostingAvailability}
                            </p>
                          </div>
                        ) : (
                          <div className="flex">
                            <GoQuestion className="mr-1 mt-0.5 text-sm" />
                            <p className="text-sm ">
                              {host?.hostingAvailability}
                            </p>
                          </div>
                        )
                      ) : (
                        <div>
                          <p className="text-sm ">Hosting Unspecified</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-auto flex">
                    <div>
                      <ImUser className="mt-0.5 mr-1 text-sm" />
                    </div>
                    {host?.userId?.about ? (
                      <p className="pb-4 leading-5" key={host?.userId._id}>
                        {host?.userId?.about.length > 142 ? (
                          <>
                            {showMoreStates[host?.userId._id]
                              ? host?.userId?.about
                              : `${host?.userId?.about.substring(
                                  0,
                                  142
                                )}...`}{" "}
                            <button
                              onClick={() => toggleShowMore(host?.userId._id)}
                              className="text-link-color hover:text-link-dark hover:underline"
                            >
                              {showMoreStates[host?.userId._id]
                                ? "Show less"
                                : "Show More"}
                            </button>
                          </>
                        ) : (
                          host?.userId?.about 
                        )}
                      </p>
                    ) : (
                      <p className="">About details not provided</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="px-5 py-5 text-center">
                No groups available at the moment.
              </p>
            )}
          </div>
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
    </>
  );
};

export default FindHosts;
