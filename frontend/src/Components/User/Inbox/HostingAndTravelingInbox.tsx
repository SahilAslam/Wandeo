import React from "react";
import MessageDetailedPage from "../../../Pages/User/InboxPage/MessageDetailedPage";
import { useNavigate } from "react-router-dom";

const HostingAndTravelingInbox = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/messageDetailedPage')
    }
  return (
    <div onClick={handleClick} className=" py-2 bg-white cursor-pointer">
      <div className="hover:bg-slate-50 px-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between border-y ">
          <div className="flex gap-2 py-5 items-center">
            <div className="md:pl-5 xl:pl-20">
              <img
                src=""
                alt="img"
                className="w-10 h-10 md:w-20 md:h-20 border rounded-full"
              />
            </div>
            <div>
              <h1 className="message-sender text-lg font-semibold text-slate-800 ">
                Joyal Joe
              </h1>
              <p className="text-slate-800">Kochi, Kerala</p>
            </div>
          </div>
          <div className="lg:px-5 pl-10 sm:pl-32 lg:w-[60%] py-5">
            <p className="pb-2 text-slate-800">Joyal Joe sent you a message</p>
            <div className="bg-slate-200 w-full rounded-lg">
              <p className="truncate max-w-md xl:w-96 px-4 py-2 text-slate-800">
                Dear Sahil, I would like to share my home with you. I am a good
                follower of yours. Feel free to connect with me if you would
                like to accept my offer.
              </p>
            </div>
            <p className="flex justify-end text-slate-400 text-xs pt-2">
              3 months ago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostingAndTravelingInbox;
