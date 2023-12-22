import React, { useEffect, useState } from "react";
import { FaComments } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/Slice/userSlice";
import axiosInstance from "../../../Axios/Axios";
import { useNavigate } from "react-router-dom";

interface Group {
  _id: string;
  name: string;
  image: string;
  members?: any[];
  discussions?: any[];
  updatedAt: string;
}

interface UserData {
  groups: Group[];
}

const UserJoinedGroups: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({ groups: [] });

  const user = useSelector(selectUser) as any;
  const userId = user?.id ? user?.id : user?.user?._id;

  const navigate = useNavigate();

  const BASE_URL =
    "https://res.cloudinary.com/dkba47utw/image/upload/v1698223651";

  useEffect(() => {
    axiosInstance
      .get(`/joinedGroups/${userId}`)
      .then((response) => {
        if (response.data.user) {
          setUserData(response.data.user);
        } else {
          console.log(
            "Invalid data received from the API:",
            response.data.message
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

  const handleClick = (groupId: string) => {
    navigate(`/groupDetailedPage/${groupId}`)
  } 

  return (
    <div className="flex items-center flex-col bg-white border border-slate-300">
      <div className="p-5 w-full lg:w-[655px] mb-0 flex">
        <FaComments className="text-slate-800 text-xl mt-1 mr-2" />
        <h1 className="font-semibold text-slate-800 text-lg">My Groups</h1>
      </div>
      <div className="w-full">
        {userData.groups?.length > 0 ? (
          userData.groups.map((group) => (
            <div key={group?._id} className="w-auto event-card border-t">
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
                        {group.members ? group.members.length : 0} Members
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
                      {timeAgo(group.updatedAt)}
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
                    {timeAgo(group.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="px-5 py-5 text-center">
            You are not a member of any Group.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserJoinedGroups;
