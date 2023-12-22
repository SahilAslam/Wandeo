import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/Slice/userSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../Axios/Axios";
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

interface Chat {
  _id: string;
  userOne: User;
  userTwo: User;
  latestMessage: Message;
}

const DirectMessageInbox: React.FC = () => {
  const [chat, setChat] = useState<Chat[]>([]);
 

  const user = useSelector(selectUser) as any;
  const userId = user?.id ? user?.id : user?.user?._id;

  const navigate = useNavigate();



  useEffect(() => {
    axiosInstance
      .get("/getdirectmessage")
      .then((res) => {
        if (res.data) {
          setChat(res.data.chat);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  

  const handleClick = (messageId: string) => {
    navigate(`/directmessagedetailed/${messageId}`);
  };
  
  return (
    <>
      {chat && chat.length > 0 ?
        chat.map((chat: Chat) =>
          userId === chat?.userOne?._id ? (
            <div
              className=" py-2 bg-white cursor-pointer"
              onClick={() => handleClick(chat?._id)}
            >
            
              <div className="hover:bg-slate-50 px-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between border-y">
                  <div className="flex gap-2 py-5 items-center">
                    <div className="md:pl-5 xl:pl-20">
                      {chat?.userTwo?.profileImage ? (
                        <img
                          src={`${chat?.userTwo?.profileImage}`}
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
                        {chat?.userTwo?.name}
                      </h1>
                      <p className="text-slate-800">{chat?.userTwo?.address ? chat?.userTwo?.address : ""}</p>
                    </div>
                  </div>
                  <div className="lg:px-5 pl-10 sm:pl-32 lg:w-[60%] py-5">
                    <p className="pb-2 text-slate-800">
                      {chat?.latestMessage?.userId === userId ? (userId !== chat?.userTwo?.name ? `You sent ${chat?.userTwo?.name} a message` : `You sent ${chat?.userOne.name} a message` ) : (userId !== chat?.userTwo?.name ? `${chat?.userTwo?.name} sent you a message` : `${chat?.userOne?.name} sent you a message`) }
                    </p>
                    <div className="bg-slate-200 w-full rounded-lg">
                      <p className="truncate max-w-md xl:w-96 px-4 py-2 text-slate-800">
                        {chat?.latestMessage?.message}
                      </p>
                    </div>
                    <p className="flex justify-end text-slate-400 text-xs pt-2">
                      {moment(chat?.latestMessage?.updatedAt).fromNow()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className=" py-2 bg-white cursor-pointer"
              onClick={() => handleClick(chat?._id)}
            >
              <div className="hover:bg-slate-50 px-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between border-y ">
                  <div className="flex gap-2 py-5 items-center">
                    <div className="md:pl-5 xl:pl-20">
                      {chat?.userOne?.profileImage ? (
                        <img
                          src={`${chat?.userOne?.profileImage}`}
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
                        {chat?.userOne.name}
                      </h1>
                      <p className="text-slate-800">{chat?.userOne.address ? chat?.userOne.address : ""}</p>
                    </div>
                  </div>
                  <div className="lg:px-5 pl-10 sm:pl-32 lg:w-[60%] py-5">
                    <p className="pb-2 text-slate-800">
                      {chat?.latestMessage?.userId === userId ? (userId !== chat?.userTwo?.name ? `You sent ${chat?.userTwo?.name} a message` : `You sent ${chat?.userOne.name} a message` ) : (userId !== chat?.userTwo?.name ? `${chat?.userTwo?.name} sent you a message` : `${chat?.userOne?.name} sent you a message`) }
                    </p>
                    <div className="bg-slate-200 w-full rounded-lg">
                      <p className="truncate max-w-md xl:w-96 px-4 py-2 text-slate-800">
                        {chat?.latestMessage?.message}
                      </p>
                    </div>
                    <p className="flex justify-end text-slate-400 text-xs pt-2">
                      {moment(chat?.latestMessage?.updatedAt).fromNow()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (   
          <div className="py-5 bg-white">
            <p className="text-center text-slate-400 tracking-wide leading-10">There are no messages.</p>
          </div>    
        )}
    </>
  );
};

export default DirectMessageInbox;
