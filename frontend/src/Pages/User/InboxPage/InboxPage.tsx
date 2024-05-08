import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/User/Navbar/Navbar";
import HostingAndTravelingInbox from "../../../Components/User/Inbox/HostingAndTravelingInbox";
import DirectMessageInbox from "../../../Components/User/Inbox/DirectMessageInbox";
import Spinner from "../../../Components/Spinner/Spinner";
import axiosInstance from "../../../Axios/Axios";

interface User {
  _id: string;
  name: string;
  profileImage: string;
  address?: string;
}

interface Message {
  userId: string;
  message: string;
  createdAt: string;
}

interface Chat {
  _id: string;
  userOne: User;
  userTwo: User;
  latestMessage: Message;
}

interface SingleMessage {
  userId: string;
  message: string;
  updatedAt: string;
}

interface HostingMessage {
  _id: string;
  hostingUser: User;
  requestingUser: User;
  latestMessage: SingleMessage;
}

const InboxPage: React.FC = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Main");
  const [chat, setChat] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<HostingMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get("/getdirectmessage")
      .then((res) => {
        if (res.data) {
          setChat(res.data.chat);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get("/gethostingmessages")
      .then((res) => {
        if (res.data) {
          setMessages(res.data.messages);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="px-4 xl:px-36 py-5">
          <div className="bg-gradient-to-l from-slate-300 to-slate-200 px-4">
            <ul className="flex flex-row flex-wrap gap-x-14 gap-y-2 px-5 py-5 text-green-800 font-semibold">
              <li
                className={
                  selectedMenuItem === "Main"
                    ? "text-green-800 hover:text-slate-700 font-extrabold underline cursor-pointer"
                    : "text-slate-700 hover:text-green-800 cursor-pointer"
                }
                onClick={() => handleMenuItemClick("Main")}
              >
                Main Messages
              </li>
              <li
                className={
                  selectedMenuItem === "Hosting and Traveling"
                    ? "text-green-800 hover:text-slate-700 font-extrabold underline cursor-pointer"
                    : "text-slate-700 hover:text-green-800 cursor-pointer"
                }
                onClick={() => handleMenuItemClick("Hosting and Traveling")}
              >
                Hosting and Traveling
              </li>
            </ul>
          </div>
          {selectedMenuItem === "Main" && (
              <DirectMessageInbox chat={chat} />
          )}
          {selectedMenuItem === "Hosting and Traveling" && (
            <HostingAndTravelingInbox messages={messages} />
          )}
        </div>
      )}
    </>
  );
};

export default InboxPage;
