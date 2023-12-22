import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/User/Navbar/Navbar";
import axiosInstance from "../../../Axios/Axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/Slice/userSlice";
import { useParams } from "react-router-dom";
import ProfileUser from "../../../Components/User/Inbox/ProfileUser";
import moment from "moment";
import { FaArrowLeft } from "react-icons/fa6";
import { ImHome3 } from "react-icons/im";
import { IoCalendarSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { ImUser } from "react-icons/im";
import DeclineHostingRequest from "../../../Components/Modals/UserModals/DeclineHostingRequest";

interface Chat {
  hostingUser: { _id: string; name: string };
  requestingUser: { _id: string; name: string };
  departureDate: string;
  arrivalDate: string;
  noOfTravelers: number;
  messages: Array<{
    userId: { profileImage: string; _id: string; name: string };
    createdAt: string;
    message: string;
  }>;
}

const TravelingAndHostingDetailed = () => {
  const [chat, setChat] = useState<Chat>();
  const [userData, setUserData] = useState({});
  const [response, setResponse] = useState("");
  const [updationMessage, setUpdationMessage] = useState("");
  const [message, setMessage] = useState("");
  const [button, setButton] = useState("");
  const [updatUI, setUpdateUI] = useState(false);
  const [modal, setModal] = useState(false);

  const user = useSelector(selectUser) as any;
  const userId = user?.id ? user?.id : user?.user?._id;

  const { id } = useParams();

  const fetchChat = async () => {
    try {
      const res = await axiosInstance.get(`/singlehostingmessage/${id}`);
      if (res) {
        setChat(res?.data?.chat);
        setButton(res.data?.chat?.response);
        setResponse(res?.data?.chat?.response);
        if (userId === res.data.chat?.hostingUser?._id) {
          setUserData(res.data.chat?.requestingUser);
        } else {
          setUserData(res.data.chat?.hostingUser);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, [id, updatUI]);

  const handleMaybe = () => {
    setResponse("Maybe");
    setUpdationMessage("Maybe");
  };
  const handleYes = () => {
    setResponse("Yes");
    setUpdationMessage("Accepted");
  };
  const handleNo = () => {
    setResponse("No");
    setUpdationMessage("Declined");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) => {
    try {
      e.preventDefault();

      const res = await axiosInstance.post(`/sendresponse/${id}`, {
        message: message,
        updationMessage: updationMessage,
      });
      if (res.data) {
        setMessage("");
        setUpdateUI((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMessage = async (
    e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) => {
    try {
      e.preventDefault();

      const res = await axiosInstance.post(`/sendSimpleMessage/${id}`, {
        message: message,
      });
      if (res.data) {
        setMessage("");
        setUpdateUI((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

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
                <div className="flex items-center">
                  <FaArrowLeft className="mr-2 mt-0.5 text-sm text-link-color" />
                  <h1 className="text-link-color font-semibold">Inbox</h1>
                </div>
              </div>
              <div className="bg-slate-50 px-10 py-5">
                {userId === chat?.hostingUser?._id ? (
                  <div>
                    <div className="flex justify-between text-slate-700 pb-7">
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center">
                          <ImHome3 className="mr-1" />
                          <p>
                            {moment(chat?.departureDate).diff(
                              chat?.arrivalDate,
                              "days"
                            ) === 1
                              ? `${moment(chat?.departureDate).diff(
                                  chat?.arrivalDate,
                                  "days"
                                )} night Requested`
                              : `${moment(chat?.departureDate).diff(
                                  chat?.arrivalDate,
                                  "days"
                                )} nights Requested`}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <div className="flex items-center">
                            <IoCalendarSharp className="mr-1" />
                            <p>
                              {moment(chat?.arrivalDate).format("ddd MMM D")}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <FaArrowRight className="mr-1" />
                            <p>
                              {moment(chat?.departureDate).format("ddd MMM D")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <ImUser className="mr-1" />
                          <p>{chat?.noOfTravelers} Traveler</p>
                        </div>
                      </div>
                      {button === "Accepted" && (
                        <div>
                          <button
                            className="px-2 py-1.5 border border-link-color text-link-color font-semibold rounded-sm hover:bg-slate-100"
                            onClick={openModal}
                          >
                            Decline Acceptance
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end items-center">
                      <div
                        className={`${
                          button === "Accepted" ||
                          button === "Declined" ||
                          button === "Declined Request"
                            ? "hidden"
                            : "py-2"
                        }`}
                      >
                        <button
                          className={`border border-link-color px-8 py-1 rounded-s-sm  active:bg-link-color active:text-white ${
                            response === "Yes"
                              ? "bg-link-color text-white"
                              : "hover:bg-white"
                          }`}
                          onClick={handleYes}
                        >
                          Yes
                        </button>
                        <button
                          className={`border-y border-link-color px-6 py-1  active:bg-link-color active:text-white ${
                            response === "Maybe"
                              ? "bg-link-color text-white"
                              : "hover:bg-white"
                          }`}
                          onClick={handleMaybe}
                          disabled={button === "Maybe"}
                        >
                          Maybe
                        </button>
                        <button
                          className={`border border-link-color px-8 py-1 rounded-r-sm  active:bg-link-color active:text-white ${
                            response === "No"
                              ? "bg-link-color text-white"
                              : "hover:bg-white"
                          }`}
                          onClick={handleNo}
                        >
                          No
                        </button>
                      </div>
                    </div>
                    {response === "Yes" ? (
                      <div className="">
                        <div>
                          <p className="text-slate-700 text-lg font-semibold">
                            Can you host {chat?.requestingUser?.name}?
                          </p>
                        </div>
                        <form onSubmit={(e) => handleSubmit(e)}>
                          <textarea
                            className="border w-full mb-2 h-32 px-2 py-0.5"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write a message"
                          ></textarea>
                          <button
                            className="bg-link-color text-white py-1.5 px-4 rounded-sm"
                            type="submit"
                          >
                            Accept Request
                          </button>
                        </form>
                      </div>
                    ) : response === "Maybe" ? (
                      <div className="">
                        <div>
                          <p className="text-slate-700 text-lg font-semibold">
                            Can you host {chat?.requestingUser?.name}?
                          </p>
                        </div>
                        <form onSubmit={(e) => handleSubmit(e)}>
                          <textarea
                            className="border w-full mb-2 h-32 px-2 py-0.5"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write a message"
                          ></textarea>
                          <button
                            className="bg-link-color text-white py-1.5 px-4 rounded-sm"
                            type="submit"
                          >
                            Send
                          </button>
                        </form>
                      </div>
                    ) : response === "No" ? (
                      <div className="">
                        <div>
                          <p className="text-slate-700 text-lg font-semibold">
                            Can you host {chat?.requestingUser?.name}?
                          </p>
                        </div>
                        <form onSubmit={(e) => handleSubmit(e)}>
                          <textarea
                            className="border w-full mb-2 h-32 px-2 py-0.5"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write a message"
                          ></textarea>
                          <button
                            className="bg-link-color text-white py-1.5 px-4 rounded-sm"
                            type="submit"
                          >
                            Reject Request
                          </button>
                        </form>
                      </div>
                    ) : (
                      <div className="">
                        {response === "Accepted" ? (
                          userId === chat?.hostingUser?._id ? (
                            <div>
                              <p className="text-slate-700 text-lg font-semibold">
                                You Accepted to Host{" "}
                                {chat?.requestingUser?.name}
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-slate-700 text-lg font-semibold">
                                {chat?.hostingUser?.name} Accepted your Request
                              </p>
                            </div>
                          )
                        ) : response === "Declined" ? (
                          userId === chat?.hostingUser?._id ? (
                            <div>
                              <p className="text-slate-700 text-lg font-semibold">
                                You Declined {chat?.requestingUser?.name}'s
                                Request
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-slate-700 text-lg font-semibold">
                                {chat?.hostingUser?.name} Declined your Request
                              </p>
                            </div>
                          )
                        ) : (
                          ""
                        )}
                        <form onSubmit={(e) => handleMessage(e)}>
                          <textarea
                            className="border w-full mb-2 h-32 px-2 py-0.5"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write a message"
                          ></textarea>
                          <button
                            className="bg-link-color text-white py-1.5 px-4 rounded-sm"
                            type="submit"
                          >
                            Send
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="">
                    {response === "Accepted" ? (
                      <div>
                        <p className="text-slate-700 text-lg font-semibold">
                          {chat?.hostingUser?.name} Accepted your Request
                        </p>
                      </div>
                    ) : response === "Declined" ? (
                      <div>
                        <p className="text-slate-700 text-lg font-semibold">
                          {chat?.hostingUser?.name} Declined your Request
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                    <form onSubmit={(e) => handleMessage(e)}>
                      <textarea
                        className="border w-full mb-2 h-32 px-2 py-0.5"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write a message"
                      ></textarea>
                      <button
                        className="bg-link-color text-white py-1.5 px-4 rounded-sm"
                        type="submit"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                )}
              </div>
              <div className="px-5 bg-white">
                {chat?.messages &&
                  chat?.messages.map((message) => (
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
      <DeclineHostingRequest
        visible={modal}
        closeModal={closeModal}
        userName={chat?.requestingUser?.name}
        setUpdateUI={setUpdateUI}
        id={id}
      />
    </>
  );
};

export default TravelingAndHostingDetailed;
