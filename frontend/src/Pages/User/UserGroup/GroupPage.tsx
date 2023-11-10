import React, { useEffect, useState } from "react";
import SignupNavbar from "../../../Components/User/Navbar/Navbar";
import { FaComments } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { PiShootingStarFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axiosInstance from "../../../Axios/Axios";
import UserJoinedGroups from "../../../Components/User/Group/UserJoinedGroups";

const GroupPage = () => {
  const [group, setGroup] = useState([]);

  const BASE_URL =
    "https://res.cloudinary.com/dkba47utw/image/upload/v1698223651";

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/createGroup");
  };

  useEffect(() => {
    axiosInstance
      .get("/getGroups")
      .then((response) => {
        if (response.data.group) {
          console.log(response.data.group);
          setGroup(response.data.group);
        } else {
          console.log("No response receives");
        }
      })
      .catch((error) => {
        console.log("cannot get groups:" + error);
      });
  }, [setGroup]);

  const handleClick = async (groupId: string) => {
    console.log(groupId, "ggggggggggg");
    
    navigate(`/groupDetailedPage/${groupId}`)
  }

  return (
    <>
      <SignupNavbar />
      <ToastContainer />
      <div className="w-full px-0 lg:px-4 pb-20 xl:px-40 bg-bgColor lg:rounded-lg overflow-hidden">
        <div className="w-full flex justify-center xl:justify-start flex-col gap-2 pt-5 pb-10 h-auto sm:flex-col sm:w-full lg:gap-4 md:flex-row  ">
          <div className="flex flex-col gap-4">
            <div className="flex items-center flex-col bg-white border border-slate-300 mx-4 md:mr-2 lg:mx-0">
              <div className="p-5 w-full sm:w-full md:w-80 lg:w-80 border-b">
                <h1 className="font-semibold text-slate-800 text-lg capitalize">
                  Create your own group
                </h1>
              </div>
              <div className="p-5 w-full sm:w-full md:w-80 lg:w-80 bg-white">
                <button
                  type="submit"
                  onClick={handleButtonClick}
                  className="bg-slate-700 text-white p-2 sm:pl-14 sm:pr-14 rounded-sm w-full"
                >
                  Create a Group
                </button>
              </div>
            </div>
          </div>
          <div className="mx-4 my-2 md:my-0 md:ml-0 w-auto sm:mr-4 md:w-auto lg:w-[655px] xl:w-[655px] flex flex-col gap-4">
            <div className="flex items-center flex-col bg-white border border-slate-300">
              <div className="p-5 w-full lg:w-[655px] mb-0 flex">
                <PiShootingStarFill className="text-slate-800 text-2xl mt-1 mr-1" />
                <h1 className="font-semibold text-slate-800 text-lg">
                  Popular Groups
                </h1>
              </div>
              <div className="w-full ">
                {Array.isArray(group) && group.length > 0 ? (
                  group.map((group, index) => (
                    <div
                      key={group?._id}
                      className="w-auto event-card border-t"
                    >
                      <div className="flex flex-row gap-4">
                        <div className="min-w-fit">
                          <img
                            className="w-8 h-8 rounded-full sm:w-[100px] sm:h-[100px] border sm:rounded"
                            src={`${BASE_URL}/${group?.image}`}
                            alt="Image"
                          />
                        </div>
                        <div className="flex flex-col justify-start w-full">
                          <div className="h-full">
                            <h1
                              className="text-green-700 hover:text-green-900 hover:underline underline-offset-1 font-semibold text-lg cursor-pointer pb-0"
                              onClick={() => handleClick(group?._id)}
                            >
                              {group?.name}
                            </h1>
                          </div>
                          <div className="flex items-start h-full">
                            <div className="flex pr-4">
                              <ImUsers className="text-gray-400 text-sm mr-1" />
                              <h2 className="text-gray-400 text-xs font-semibold">
                                {group.members ? group.members.length : 0}{" "}
                                Members
                              </h2>
                            </div>
                            <div className="flex">
                              <FaComments className="text-gray-400 text-sm mr-1" />
                              <h2 className="text-gray-400 text-xs font-semibold">
                                {group.discussions ? group.discussions.length : 0}{" "}
                                Discussions
                              </h2>
                            </div>
                          </div>
                          <div className="sm:hidden flex w-full pt-1">
                          <div className="flex flex-row gap-12 items-baseline">
                            <h3 className="text-gray-400 text-xs font-semibold">
                              Last Activity
                            </h3>
                            <p className="text-gray-400 text-xs font-semibold">
                              17 days ago
                            </p>
                          </div>
                          </div>
                        </div>
                        <div className="hidden sm:flex justify-end py-5 min-w-fit">
                          <div className="flex flex-col ">
                            <h3 className="text-slate-800 text-sm lg:text-base">
                              Last Activity
                            </h3>
                            <p className="text-slate-800 text-xs lg:text-sm">
                              17 days ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    ))
                  ) : (
                    <p className="px-5 py-5 text-center">No groups available at the moment.</p>
                  )}
              </div>
            </div>
            <UserJoinedGroups />
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupPage;
