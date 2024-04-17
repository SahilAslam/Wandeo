import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/User/Navbar/Navbar";
import axiosInstance from "../../../Axios/Axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const GroupDiscussionPage = () => {
  const [discussion, setDiscussion] = useState<any>({});
  const [updateUI, setUpdateUI] = useState<boolean>(false);
  const [reply, setReply] = useState("");
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  const { id } = useParams();

  // const BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL || ""

  const getDiscussion = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axiosInstance.get(`/getDiscussion/${id}`);
      const groupDetails = response.data?.discussion;
      setDiscussion(groupDetails);
      setIsBlocked(groupDetails?.groupId?.isBlocked)
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getDiscussion();
  }, [updateUI, id]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) => {
    // eslint-disable-next-line no-useless-catch
    try {
      e.preventDefault();
      const response = await axiosInstance.post(`/discussionReply/${id}`, {
        replyMessage: reply,
      });
      if (response.data) {
        console.log(response.data);
        toast.success(response.data?.message);
        setUpdateUI(prevState => !prevState)
      }
    } catch (error) {
      throw error;
    }
  };

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
      <ToastContainer />
      <div className="py-4 flex justify-center ">
        <div className="px-5 w-[850px] bg-white shadow-lg">
          <div>
            <div className="py-5 border-b-4 border-slate-300">
              <h1 className="text-xl font-semibold text-slate-800">
                {discussion.title}
              </h1>
              <p>
                Posted in{" "}
                <span className="text-sky-700 hover:underline cursor-pointer">
                  {discussion?.groupId?.name}
                </span>
              </p>
              <h6 className="text-xs font-bold text-green-700 pt-4">
                INITIAL POST
              </h6>
            </div>
            <div className="py-5 flex gap-3 border-b-4 border-slate-300">
              <div>
                {discussion?.userId?.profileImage ? (
                  <img
                    src={`${discussion?.userId?.profileImage}`}
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

          <div className=" border-b-4 border-slate-300">
            {discussion?.replies?.length > 0 ? (
              discussion.replies.map((reply: any) => (
                <div className="flex gap-3 border-b py-5">
                  <div>
                    <img
                      src={`${reply?.userId?.profileImage}`}
                      alt="img"
                      className="w-8 h-8 border rounded-full"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between pb-1">
                      <h1 className="text-xl font-semibold text-slate-800 hover:underline cursor-pointer">
                        {reply.userId?.name}
                      </h1>
                      <p className="text-gray-400 text-xs  pt-2">
                        {timeAgo(reply.createdAt)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-400 pb-3">
                      {reply?.userId?.address}
                    </p>
                    <p>{reply?.replyMessage}</p>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          <div className="py-5">
            <div className="pb-1">
              {isBlocked && (
                <p className="text-red-600">Every interactions are disabled, as this group is currently on the blacklist!</p>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <textarea
                name=""
                id=""
                rows={6}
                placeholder="write a reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                required
                disabled={isBlocked}
                className={`w-full border rounded px-2 py-1 ${
                  isBlocked
                    ? "border-red-600 cursor-not-allowed"
                    : "border-slate-300 hover:border-sky-700"
                }`}
              ></textarea>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className={`${
                    isBlocked
                      ? "bg-red-600 opacity-50 cursor-not-allowed"
                      : "bg-sky-600 hover:bg-sky-500"
                  } text-white font-semibold duration-300 hover:duration-300 px-8 py-1.5 rounded`}
                  disabled={isBlocked}
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
