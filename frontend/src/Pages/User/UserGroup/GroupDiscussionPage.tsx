import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/User/Navbar/Navbar";
import axiosInstance from "../../../Axios/Axios";
import { useParams } from "react-router-dom";

const GroupDiscussionPage = () => {
  const [groupData, setGroupData] = useState("");
  const [updateUI, setUpdateUI] = useState<boolean>(false);
  const [reply, setReply] = useState("");

  const { id } = useParams();

  const BASE_URL =
    "https://res.cloudinary.com/dkba47utw/image/upload/v1698223651";

  const getGroupDetails = async (id: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axiosInstance.get(`/groupDetailedPage/${id}`);
      const groupDetails = response.data?.group;
      console.log(response.data?.group);

      setGroupData(groupDetails);
      setUpdateUI((prevState) => !prevState);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getGroupDetails(id);
  }, [updateUI, id]);

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

  return (
    <div className="pb-10">
      <Navbar />
      <div className="py-4 flex justify-center ">
        <div className="px-5 w-[850px] bg-white shadow-lg">
          {groupData.discussions?.length > 0 ? (
            groupData.discussions.map((discussion) => (
              <div>
                <div className="py-5 border-b-4 border-slate-300">
                  <h1 className="text-xl font-semibold text-slate-800">
                    {discussion.title}
                  </h1>
                  <p>
                    Posted in{" "}
                    <span className="text-sky-700 hover:underline cursor-pointer">
                      {groupData.name}
                    </span>
                  </p>
                  <h6 className="text-xs font-bold text-green-700 pt-4">
                    INITIAL POST
                  </h6>
                </div>
                <div className="py-5 flex gap-3 border-b-4 border-slate-300">
                  <div>
                    {discussion?.userId.profileImage ? (
                      <img
                        src={`${BASE_URL}/${discussion?.userId.profileImage}`}
                        alt="img"
                        className="border rounded-full w-8 h-8"
                      />
                    ) : (
                      <img
                        src={`/profile-picture-placeholder.png`}
                        alt=""
                        className="w-8 h-8 object-cover rounded-full opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between pb-1">
                      <h1 className="text-xl font-semibold text-slate-800 hover:underline cursor-pointer">
                        {discussion?.userId?.name}
                      </h1>
                      <p className="text-gray-400 text-xs  pt-2">
                        {timeAgo(discussion.createdAt)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-400 pb-3">
                      {discussion?.userId?.address}
                    </p>
                    <p>{discussion?.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="px-5 py-3 bg-slate-100 text-center">
              No Discussions yet!
            </p>
          )}

          <div className=" border-b-4 border-slate-300">
            <div className="flex gap-3 border-b py-5">
              <div>
                <img src="" alt="img" className="w-8 h-8 border rounded-full" />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex justify-between pb-1">
                  <h1 className="text-xl font-semibold text-slate-800 hover:underline cursor-pointer">
                    Anshik Bansal
                  </h1>
                  <p className="text-gray-400 text-xs  pt-2">6 days ago</p>
                </div>
                <p className="text-sm text-gray-400 pb-3">
                  Ghaziabad, Uttar Pradesh, India
                </p>
                <p>
                  I would not recommend you visit New Delhi during December, as
                  there can be a lot of smog in the environment due to the
                  burning of crops in the nearby states, or be ready with a mask
                  in the early weeks of December. If you're a winter or a snow
                  lover, then visit Himachal Pradesh and Uttrakhand, and if not,
                  you can visit South India (Kerala, Tamil Nadu, Karnataka) or
                  Eastern India (Meghalaya, Darjeeling, Odisha), or travel to
                  Western India, and visit Rann Utsav in Gujarat.
                </p>
              </div>
            </div>
            <div className="flex gap-3 border-b py-5">
              <div>
                <img src="" alt="img" className="w-8 h-8 border rounded-full" />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex justify-between pb-1">
                  <h1 className="text-xl font-semibold text-slate-800">
                    Josekutty Jose
                  </h1>
                  <p className="text-gray-400 text-xs  pt-2">5 days ago</p>
                </div>
                <p className="text-sm text-gray-400 pb-3">
                  Kochi, Kerala, India
                </p>
                <p>If you intend to visit Kochi ping me</p>
              </div>
            </div>
          </div>
          <div className="py-5">
            <form>
              <textarea
                name=""
                id=""
                rows="6"
                placeholder="write a reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="w-full border border-slate-300 hover:border-sky-700 rounded px-2 py-1"
              ></textarea>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-sky-600 text-white font-semibold hover:bg-sky-500 duration-300 hover:duration-300  px-8 py-1.5 rounded"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDiscussionPage;
