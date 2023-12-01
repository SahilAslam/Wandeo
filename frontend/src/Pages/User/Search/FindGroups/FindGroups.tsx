import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../../../../Axios/Axios";
import Navbar from "../../../../Components/User/Navbar/Navbar";
import Pagination from "../../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { HiUserGroup } from "react-icons/hi2";
import { ImUsers } from "react-icons/im";
import { FaComments } from "react-icons/fa";

const FindGroups = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL || "";

  const location = useLocation();
  const searchQuery = location.state?.searchQuery || "";

  useEffect(() => {
    axiosInstance
      .get("/searchGroup")
      .then((res) => {
        if (res.data.message) {
          setGroups(res.data.groups);
          console.log(groups, "dddddddd");
        }
        if (res.data.error) {
          toast.error(res.data.error);
        }
      })
      .catch((err) => console.log(err, "axios listing err"));
  }, []);
  
  const filteredGroups = groups.filter((group) => {
    return group?.name?.toLowerCase().includes(searchQuery.toLocaleLowerCase());
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredGroups.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(filteredGroups.length / recordsPerPage);


  const timeAgo = (date: string) => {
    const currentDate = new Date();
    const createdDate = new Date(date);
    const difference = currentDate.getTime() - createdDate.getTime();
    const seconds = Math.floor(difference / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return `${interval} year${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return `${interval} month${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return `${interval} day${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return `${interval} hour${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return `${interval} minute${interval > 1 ? "s" : ""} ago`;
    }
    return `${Math.floor(seconds)} second${
      Math.floor(seconds) !== 1 ? "s" : ""
    } ago`;
  };

  const handleClick = async (groupId: string) => {
    navigate(`/groupDetailedPage/${groupId}`);
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="w-full px-0 lg:px-4 pb-20 xl:px-60 bg-bgColor lg:rounded-lg overflow-hidden">
        <div className="w-full flex justify-center xl:justify-start flex-col gap-2 pt-5 pb-10 h-auto sm:flex-col sm:w-full lg:gap-4 md:flex-row  ">
          <div className="px-4 my-2 md:my-0 md:ml-0 w-auto md:w-full md:max-w-[835px] lg:w-[835px] xl:w-[835px] flex flex-col gap-4">
            <div className="flex items-center flex-col bg-white border border-slate-300 shadow-lg">
              <div className="p-5 w-full mb-0 flex">
                <HiUserGroup className="text-slate-800 text-2xl mt-[1.5px] mr-1" />
                <h1 className="font-semibold text-slate-800 text-lg">Groups</h1>
              </div>
              <div className="w-full border-b">
                {currentRecords ? (
                  currentRecords.map((group, index) => (
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
                                {group.discussions
                                  ? group.discussions.length
                                  : 0}{" "}
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
                                {timeAgo(group.updatedAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="hidden sm:flex justify-end py-5 min-w-fit">
                          <div className="flex flex-col ">
                            <h3 className="text-slate-400 text-xs">
                              Last Activity
                            </h3>
                            <p className="text-slate-400 text-xs ">
                              {timeAgo(group.updatedAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="px-5 py-5 text-center">
                    No groups available at the moment.
                  </p>
                )}
              </div>
              {/* <div className="py-3.5 px-4 w-full">
                <h1 onClick={()=>navigate("/allGroups")} className="text-sky-700 cursor-pointer hover:text-sky-800 hover:underline">See More Groups</h1>
              </div> */}
              <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindGroups;
