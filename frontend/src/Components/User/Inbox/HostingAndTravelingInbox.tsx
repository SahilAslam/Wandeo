import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../Axios/Axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/Slice/userSlice";
import moment from "moment";

interface User {
  _id: string;
  name: string;
  profileImage: string;
  address?: string;
}

interface Message {
  userId: string;
  message: string;
  updatedAt: string;
}

interface HostingMessage {
  _id: string;
  hostingUser: User;
  requestingUser: User;
  latestMessage: Message;
}

const HostingAndTravelingInbox: React.FC = () => {
  const [messages, setMessages] = useState<HostingMessage[]>([]);

  const user = useSelector(selectUser) as any;
  const userId = user?.id ? user?.id : user?.user?._id;

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/gethostingmessages")
      .then((res) => {
        if (res.data) {
          setMessages(res.data.messages);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (messageId: string) => {
    navigate(`/messageDetailedPage/${messageId}`);
  };

  return (
    <>
      <div className="py-2 bg-white">
        {messages && messages.length > 0 ? (
          messages.map((message) =>
            userId === message?.hostingUser?._id ? (
              <div
                className="  bg-white cursor-pointer"
                onClick={() => handleClick(message?._id)}
              >
                <div className="hover:bg-slate-50 px-5">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between border-y">
                    <div className="flex gap-2 py-5 items-center">
                      <div className="md:pl-5 xl:pl-20">
                        {message?.requestingUser?.profileImage ? (
                          <img
                            src={`${message?.requestingUser?.profileImage}`}
                            alt="img"
                            // onClick={() => handleClick(user._id)}
                            className="border rounded-full w-14 h-14 cursor-pointer"
                          />
                        ) : (
                          <img
                            src={`/profile-picture-placeholder.png`}
                            alt=""
                            // onClick={() => handleClick(user._id)}
                            className="w-14 h-14 object-cover rounded-full opacity-100 cursor-pointer"
                          />
                        )}
                      </div>
                      <div>
                        <h1 className="message-sender text-lg font-semibold text-slate-800 ">
                          {message?.requestingUser?.name}
                        </h1>
                        <p className="text-slate-800">Kochi, Kerala</p>
                      </div>
                    </div>
                    <div className="lg:px-5 pl-10 sm:pl-32 lg:w-[60%] py-5">
                      <p className="pb-2 text-slate-800">
                        {message?.latestMessage?.userId === userId
                          ? userId !== message?.requestingUser?.name
                            ? `You sent ${message?.requestingUser?.name} a message`
                            : `You sent ${message.hostingUser.name} a message`
                          : userId !== message?.requestingUser?.name
                          ? `${message?.requestingUser?.name} sent you a message`
                          : `${message.hostingUser.name} sent you a message`}
                      </p>
                      <div className="bg-slate-200 w-full rounded-lg">
                        <p className="truncate max-w-md xl:w-96 px-4 py-2 text-slate-800">
                          {message?.latestMessage?.message}
                        </p>
                      </div>
                      <p className="flex justify-end text-slate-400 text-xs pt-2">
                        {moment(message?.latestMessage?.updatedAt).fromNow()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className=" bg-white cursor-pointer"
                onClick={() => handleClick(message?._id)}
              >
                <div className="hover:bg-slate-50 px-5">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between border-y ">
                    <div className="flex gap-2 py-5 items-center">
                      <div className="md:pl-5 xl:pl-20">
                        {message?.hostingUser?.profileImage ? (
                          <img
                            src={`${message?.hostingUser?.profileImage}`}
                            alt="img"
                            // onClick={() => handleClick(user._id)}
                            className="border rounded-full w-14 h-14 cursor-pointer"
                          />
                        ) : (
                          <img
                            src={`/profile-picture-placeholder.png`}
                            alt=""
                            // onClick={() => handleClick(user._id)}
                            className="w-14 h-14 object-cover rounded-full opacity-100 cursor-pointer"
                          />
                        )}
                      </div>
                      <div>
                        <h1 className="message-sender text-lg font-semibold text-slate-800 ">
                          {message?.hostingUser.name}
                        </h1>
                        <p className="text-slate-800">Kochi, Kerala</p>
                      </div>
                    </div>
                    <div className="lg:px-5 pl-10 sm:pl-32 lg:w-[60%] py-5">
                      <p className="pb-2 text-slate-800">
                        {message?.latestMessage?.userId === userId
                          ? userId !== message?.requestingUser?.name
                            ? `You sent ${message?.requestingUser?.name} a message`
                            : `You sent ${message.hostingUser.name} a message`
                          : userId !== message?.requestingUser?.name
                          ? `${message?.requestingUser?.name} sent you a message`
                          : `${message.hostingUser.name} sent you a message`}
                      </p>
                      <div className="bg-slate-200 w-full rounded-lg">
                        <p className="truncate max-w-md xl:w-96 px-4 py-2 text-slate-800">
                          Dear Sahil, I would like to share my home with you. I
                          am a good follower of yours. Feel free to connect with
                          me if you would like to accept my offer.
                        </p>
                      </div>
                      <p className="flex justify-end text-slate-400 text-xs pt-2">
                        3 months ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="py-5 bg-white">
            <p className="text-center text-slate-400 tracking-wide leading-10">
              There are no messages.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default HostingAndTravelingInbox;
