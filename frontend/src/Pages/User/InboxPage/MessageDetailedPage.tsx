import React, { useEffect, useState } from "react";
import ProfileUser from "../../../Components/User/Inbox/ProfileUser";
import Navbar from "../../../Components/User/Navbar/Navbar";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { selectUser } from "../../../Redux/Slice/userSlice";
import { useSelector } from "react-redux";
import axiosInstance from "../../../Axios/Axios";
import moment from "moment";
import { io , Socket } from "socket.io-client";

interface Message {
  userId?: {
    profileImage?: string;
    _id: string;
    name: string;
  };
  createdAt: string;
  message: string;
}

interface Chat {
  userOne?: { _id: string };
  userTwo?: { _id: string };
  messages?: Message[];
}


const MessageDetailedPage: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState("");
  const [updatUI, setUpdateUI] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false)

  const ENDPOINT = "http://localhost:5000"
  let socket : Socket | null = null;

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", chat?.userOne?._id)
    socket.emit("setup", chat?.userTwo?._id)
    socket.on("connection", () => setSocketConnected(true));
    console.log(socketConnected)
  }, [])

  const user = useSelector(selectUser) as any;
  const userId = user?.id ? user?.id : user?.user?._id;
 
  const { id } = useParams();

  const navigate = useNavigate();

  const fetchChat = async () => {
    try {
      const res = await axiosInstance.get(`/messagedetailedpage/${id}`);
      if (res) {
        setChat(res?.data?.chat);
        socket?.emit("join chat", id)
        if (userId === res.data.chat?.userOne?._id) {
          setUserData(res.data.chat?.userTwo);
        } else {
          setUserData(res.data.chat?.userOne);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, [id, updatUI]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) => {
    try {
      e.preventDefault();

      if(message === "") {
        return  
      }

      const res = await axiosInstance.put(`/sendmessage/${id}`, {
        message: message,
      });
      
      if (res.data) {
        setMessage("");
        socket?.emit("new message", {
          message: res.data.chat.latestMessage.message,
          room: id, // Send the room information
        });
        console.log(res.data.chat, "hi");
        setUpdateUI((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket?.on("new message", (msg) => {
      console.log('Received message:', msg);        
    })
  })

  return (
    <>
      <Navbar />
      <div className="w-full">
        <div className="pt-3 px-4 lg:px-32">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex flex-col gap-3">
              <div>
                <ProfileUser userData={userData} id={userId} />
              </div>
            </div>
            <div className="w-full flex flex-col">
              <div className="flex justify-between px-7 py-5 bg-white">
                <div className="flex items-center cursor-pointer" onClick={() => navigate("/inbox")}>
                  <FaArrowLeft className="mr-2 mt-0.5 text-sm text-link-color" />
                  <h1 className="text-link-color font-semibold">Inbox</h1>
                </div>
              </div>
              <div className="bg-slate-50 px-10 py-5">
                <div>
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <textarea
                      className="border w-full mb-2 h-32 px-2 py-0.5"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write a message"
                    ></textarea>
                    <button
                      className="bg-link-color text-white py-1.5 px-6 rounded-sm"
                      type="submit"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
              <div className="px-5 bg-white">
                {chat?.messages &&
                  chat?.messages.slice().reverse().map((message) => (
                    <div className="py-5 flex flex-col sm:flex-row gap-5 border-b">
                      <div>
                        {message?.userId?.profileImage ? (
                          <img
                            src={`${message?.userId?.profileImage}`}
                            alt="img"
                            // onClick={() => handleClick(user._id)}
                            className="border rounded-full w-12 h-12 cursor-pointer"
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
                      <div className="">
                        {userId !== message?.userId?._id && (
                          <p className="text-slate-700 font-semibold pb-2">
                            {message?.userId?.name}
                          </p>
                        )}
                        <p className="text-sm text-slate-400 pb-5">
                          {moment(message.createdAt).fromNow()}
                        </p>
                        {message?.message}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageDetailedPage;
