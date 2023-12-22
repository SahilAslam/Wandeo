import { useState, useEffect, useRef } from "react";
import SignupNavbar from "../../../Components/User/Navbar/Navbar";
import ProfileCard from "../../../Components/User/Profile/ProfileCard";
import axiosInstance from "../../../Axios/Axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/Slice/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaBed } from "react-icons/fa";
import moment from "moment";
import UsersTrips from "../../../Components/User/Trips/UsersTrips";
import CreateHostingModal from "../../../Components/Modals/UserModals/CreateHostingModal";
import CreateMessage from "../../../Components/Modals/UserModals/CreateMessage";

const DiffUserProfile = () => {
  const [userDatails, setUserDetails] = useState<any>([]);
  const [publicTrips, setPublicTrips] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [chatExists, setChatExists] = useState<any>();
  const [hostingExists, setHostingExists] = useState<any>();
  const [hostingModal, setHostingModal] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const user = useSelector(selectUser) as any;
  const userId = user?.id ? user?.id : user?.user?._id;

  useEffect(() => {
    axiosInstance
      .get(`/profile/${id}`)
      .then((res) => {
        if (res.data.user) {
          setUserDetails(res.data.user);
        } else {
          console.error("Invalid data received from the API:", res.data.user);
        }
      })
      .catch((error) => console.log(error, "user profile error"));
  }, [id]);

  useEffect(() => {
    axiosInstance
      .get(`/getotherstrips/${id}`)
      .then((response) => {
        if (response.data.publicTrips) {
          setPublicTrips(response.data.publicTrips);
        } else {
          console.log("Public trips not found");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const findExistingChat = async () => {
    await axiosInstance
      .get(`/findexistingchat/${id}`)
      .then((res) => {
        if (res.data?.chat) {
          setChatExists(res.data?.chat);
          console.log(res.data.chat);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    findExistingChat();
  }, [id]);

  const findExHostingChat = async () => {
    await axiosInstance
      .get(`/findexhostingchat/${id}`)
      .then((res) => {
        if (res.data?.chat) {
          setHostingExists(res.data?.chat);
          console.log(res.data?.chat?._id, "///////////")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    findExHostingChat();
  }, [id]);

  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
  };

  const calculateAge = (birthdate: Date) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();

    // Check if the user's birthday has occurred this year
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }

    return age;
  };

  // Extract the date of birth from user data
  const dateOfBirth = userDatails?.dateOfBirth;
  // Calculate the age
  const age = dateOfBirth ? calculateAge(new Date(dateOfBirth)) : undefined;

  const UlRef = useRef(null); 
  const MenuRef = useRef<HTMLLIElement | null>(null); 

  const Menus = ["Friend Request", "Write Reference"];

  window.addEventListener("click", (e) => {
    if (e.target !== MenuRef.current && e.target !== UlRef.current) {
      setMenuOpen(false);
    }
  });

  const addFriend = async (targettedUserId: string) => {
    const response = await axiosInstance.post("/addFriend", {
      targettedUserId,
      userId,
    });
    if (response?.data?.message) {
      toast.success("Added friend successfully");
    }
  };

  const openModal = () => {
    setMessageModal(true);
  };

  const closeModal = () => {
    setMessageModal(false);
  };

  const openHostingModal = () => {
    setHostingModal(true);
  };

  const closeHostingModal = () => {
    setHostingModal(false);
  };

  const handleClick = (messageId: string) => {
    navigate(`/directmessagedetailed/${messageId}`);
  };

  const handleNav = (chatId: string) => {
    navigate(`/messageDetailedPage/${chatId}`);
  }

  return (
    <>
      <SignupNavbar />
      <ToastContainer />
      <div className="w-full ">
        <div className="pt-2 px-4 lg:px-32">
          <div className="flex flex-col md:flex-row gap-2">
            <div>
              <ProfileCard
                userDetails={userDatails}
                id={userId}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 bg-white">
                <div className="flex flex-col py-5 px-5">
                  <h1
                    className={`text-2xl font-semibold ${
                      userDatails?.hostingAvailability === "Accepting Guests"
                        ? "text-green-500"
                        : userDatails?.hostingAvailability ===
                          "Not Accepting Guests"
                        ? "text-red-600"
                        : "text-slate-700"
                    }`}
                  >
                    {userDatails?.hostingAvailability
                      ? userDatails.hostingAvailability
                      : "Details not specified"}
                  </h1>
                  {userDatails?.isLoggin ? (
                    <p className="text-sm pt-4 text-green-500">
                      {userDatails?.isLoggin}
                    </p>
                  ) : (
                    <p className="text-sm pt-4 text-gray-400">
                      Last login {moment(userDatails.lastLogin).fromNow()}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-end gap-2 px-5 pb-5 sm:pt-0 sm:py-0">
                  {(userDatails?.hostingAvailability === "Accepting Guests" ||
                    userDatails?.hostingAvailability ===
                      "Maybe Accepting Guests") &&
                    (hostingExists ? (
                      <div>
                        <button
                          className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded flex items-center gap-2"
                          onClick={() => handleNav(hostingExists?._id)}
                        >
                          <FaBed className="text-xl" />
                          View
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded flex items-center gap-2"
                          onClick={openHostingModal}
                        >
                          <FaBed className="text-xl" />
                          Send Request
                        </button>
                      </div>
                    ))}
                  {chatExists ? (
                    <div>
                      <button
                        onClick={() => handleClick(chatExists?._id)}
                        className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded flex items-center gap-2"
                      >
                        Show Message
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={openModal}
                        className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded flex items-center gap-2"
                      >
                        Message
                      </button>
                    </div>
                  )}
                  <div className="relative">
                    <button
                      className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded relative"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(!menuOpen);
                      }}
                      ref={UlRef}
                    >
                      More
                    </button>
                    {menuOpen && (
                      <div className="menus bg-white w-60 -right-4 shadow-xl absolute z-50 border">
                        <ul>
                          {Menus.map((menu, index) => (
                            <li
                              key={index}
                              className="px-2 py-3 cursor-pointer hover:bg-blue-100 text-center border text-link-color font-semibold hover:text-green-700 hover:underline"
                              onClick={() => {
                                setMenuOpen(false);
                              }}
                            >
                              {menu === "Write Reference" ? (
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/createReference/${userDatails?._id}`
                                    )
                                  }
                                >
                                  {menu}
                                </button>
                              ) : menu === "Friend Request" ? (
                                <button
                                  onClick={() => addFriend(userDatails._id)}
                                >
                                  {menu}
                                </button>
                              ) : (
                                <button>{menu}</button>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-white xl:h-[70px]">
                <ul className="flex flex-row flex-wrap gap-x-14 gap-y-2 px-5 py-5 text-green-800 font-semibold">
                  <li
                    className={
                      selectedMenuItem === "About"
                        ? "text-blue-700 hover:underline cursor-pointer"
                        : "hover:text-blue-700 cursor-pointer"
                    }
                    onClick={() => handleMenuItemClick("About")}
                  >
                    About
                  </li>
                  <li
                    className={
                      selectedMenuItem === "Hosting"
                        ? "text-blue-700 hover:underline cursor-pointer"
                        : "hover:text-blue-700 cursor-pointer"
                    }
                    onClick={() => handleMenuItemClick("Hosting")}
                  >
                    Hosting
                  </li>
                  <li
                    className={
                      selectedMenuItem === "Photos"
                        ? "text-blue-700 hover:underline cursor-pointer"
                        : "hover:text-blue-700 cursor-pointer"
                    }
                    onClick={() => handleMenuItemClick("Photos")}
                  >
                    Photos
                  </li>
                  <li
                    className={
                      selectedMenuItem === "References"
                        ? "text-blue-700 hover:underline cursor-pointer"
                        : "hover:text-blue-700 cursor-pointer"
                    }
                    onClick={() => handleMenuItemClick("References")}
                  >
                    References
                  </li>
                  <li
                    className={
                      selectedMenuItem === "Friends"
                        ? "text-blue-700 hover:underline cursor-pointer"
                        : "hover:text-blue-700 cursor-pointer"
                    }
                    onClick={() => handleMenuItemClick("Friends")}
                  >
                    Friends
                  </li>
                </ul>
              </div>
              {selectedMenuItem === "About" && (
                <div className="flex flex-col gap-2 pb-10">
                  {/* Content for About */}
                  <div className="bg-white">
                    <div className="px-5 py-4 border-b">
                      <h1 className="text-lg text-slate-800 font-semibold">
                        PUBLIC TRIPS
                      </h1>
                    </div>
                    <div>
                      <UsersTrips
                        publicTrips={publicTrips}
                        hostingExists={hostingExists}
                      />
                    </div>
                  </div>
                  <div className="bg-white h-auto flex flex-col border-b">
                    {/* ... About content */}
                    <div className="border-b h-[65px] flex items-center">
                      <h1 className="px-5 font-semibold text-slate-800">
                        OVERVIEW
                      </h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 px-5 py-5">
                      <p className="pb-3 text-slate-600 font-semibold">
                        0 References
                      </p>
                      <p className="pb-3 text-slate-600">
                        {userDatails?.occupation
                          ? userDatails.occupation
                          : "Occupation not specified"}
                      </p>
                      <p className="pb-3 text-slate-600">
                        {userDatails?.languagesFluentIn ||
                        userDatails?.languagesLearning
                          ? `Fluent in ${
                              userDatails.languagesFluentIn
                                ? userDatails.languagesFluentIn
                                : "Undefined"
                            }; learning ${
                              userDatails.languagesLearning
                                ? userDatails.languagesLearning
                                : "Undefined"
                            }`
                          : "No languages Listed"}
                      </p>
                      <p className="pb-3 text-slate-600">
                        {userDatails?.education
                          ? userDatails.education
                          : "Education not specified"}
                      </p>
                      <p className="pb-3 text-slate-600">
                        {age && userDatails?.gender
                          ? `${age}, ${userDatails.gender}`
                          : "Age not specified"}
                      </p>
                      <p className="pb-3 text-slate-600">
                        {userDatails?.address
                          ? `From ${userDatails.address}`
                          : "address not specified"}
                      </p>
                      <p className="pb-3 text-slate-600">Member since 2023</p>
                      <p className="pb-3 text-blue-900 font-semibold">
                        Profile not complete
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col bg-white">
                    <div className="border-b h-[65px] flex items-center">
                      <h1 className="px-5 font-semibold text-slate-800">
                        ABOUT ME
                      </h1>
                    </div>
                    <div className="px-5 min-h-[50px] flex items-center">
                      <p className="py-3 text-slate-600">
                        {userDatails?.about ? userDatails.about : ""}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {selectedMenuItem === "Hosting" && (
                <div className="bg-white shadow-md mb-5">
                  <div className="px-5 py-5">
                    <h1 className="font-semibold text-slate-800">MY HOME</h1>
                  </div>
                  {userDatails?.hostingId ? (
                    <div>
                      <div>
                        <div className="px-5 py-3 bg-gradient-to-l from-slate-200 to-slate-100">
                          <h1 className="text-slate-700 font-semibold text-sm text-clip">
                            MY PREFERENCES
                          </h1>
                        </div>
                        <div className="p-5">
                          <p className="text-slate-700 font-semibold pb-3">
                            Max Number of Guests:{" "}
                            <span className="text-slate-700 font-normal">
                              {userDatails?.hostingId?.noOfGuests
                                ? userDatails?.hostingId?.noOfGuests
                                : "Unspecified"}
                            </span>
                          </p>
                          <p className="text-slate-700 font-semibold pb-3">
                            Preferred Gender to Host:{" "}
                            <span className="text-slate-700 font-normal">
                              {userDatails?.hostingId?.preferredGender
                                ? userDatails?.hostingId?.preferredGender
                                : "Unspecified"}
                            </span>
                          </p>
                          <p className="text-slate-700 font-semibold pb-3">
                            Kid Friendly:{" "}
                            <span className="text-slate-700 font-normal">
                              {userDatails?.hostingId?.kidFriendly
                                ? userDatails?.hostingId?.kidFriendly
                                : "Unspecified"}
                            </span>
                          </p>
                          <p className="text-slate-700 font-semibold pb-3">
                            Pet Friendly:{" "}
                            <span className="text-slate-700 font-normal">
                              {userDatails?.hostingId?.petFriendly
                                ? userDatails?.hostingId?.petFriendly
                                : "Unspecified"}
                            </span>
                          </p>
                          <p className="text-slate-700 font-semibold">
                            Smoking Allowed:{" "}
                            <span className="text-slate-700 font-normal">
                              {userDatails?.hostingId?.smoking
                                ? userDatails?.hostingId?.smoking
                                : "Unspecified"}
                            </span>
                          </p>
                        </div>
                      </div>
                      {userDatails?.hostingId?.sleepingArrangement ||
                      userDatails?.hostingId?.sleepingArrangementDescription ? (
                        <div>
                          <div className="px-5 py-3 bg-gradient-to-l from-slate-200 to-slate-100">
                            <h1 className="text-slate-700 font-semibold text-sm text-clip">
                              SLEEPING ARRANGEMENTS
                            </h1>
                          </div>
                          <div className="p-5">
                            {userDatails?.hostingId?.sleepingArrangement && (
                              <p className="text-slate-700 font-semibold pb-3">
                                {userDatails?.hostingId?.sleepingArrangement}
                              </p>
                            )}
                            {userDatails?.hostingId
                              ?.sleepingArrangementDescription && (
                              <p>
                                {
                                  userDatails?.hostingId
                                    ?.sleepingArrangementDescription
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      ) : null}
                      {userDatails?.hostingId?.transportationAccess ||
                      userDatails?.hostingId?.whatCanIShare ||
                      userDatails?.hostingId?.additionalInformation ? (
                        <div>
                          <div className="px-5 py-3 bg-gradient-to-l from-slate-200 to-slate-100">
                            <h1 className="text-slate-700 font-semibold text-sm text-clip">
                              MORE DETAILS
                            </h1>
                          </div>
                          <div className="p-5">
                            {userDatails?.hostingId?.whatCanIShare && (
                              <div>
                                <h1 className="text-slate-700 font-semibold pb-2">
                                  What I Can Share with Guests
                                </h1>
                                <p className="text-slate-700 pb-5">
                                  {userDatails?.hostingId?.whatCanIShare}
                                </p>
                              </div>
                            )}
                            {userDatails?.hostingId?.transportationAccess && (
                              <div>
                                <h1 className="text-slate-700 font-semibold pb-2">
                                  Public Transportation Access
                                </h1>
                                <p className="text-slate-700 pb-5">
                                  {userDatails?.hostingId?.transportationAccess}
                                </p>
                              </div>
                            )}
                            {userDatails?.hostingId?.additionalInformation && (
                              <div>
                                <h1 className="text-slate-700 font-semibold pb-2">
                                  Additional Informations
                                </h1>
                                <p className="text-slate-700 pb-5">
                                  {
                                    userDatails?.hostingId
                                      ?.additionalInformation
                                  }
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="px-10 py-5 bg-slate-100">
                      <p className="text-center text-slate-400">
                        {userDatails?.name} hasn't updated the profile
                      </p>
                    </div>
                  )}
                </div>
              )}
              {selectedMenuItem === "Photos" && (
                <div className="flex flex-col bg-white">
                  <div className="p-4">
                    <h1 className="text-lg font-semibold text-slate-700 uppercase">
                      Photos
                    </h1>
                  </div>
                  <div className="flex flex-col">
                    <div className="px-4 py-2 bg-slate-300">
                      <h1 className="text-md font-medium text-slate-700 uppercase">
                        profile photos
                      </h1>
                    </div>
                    <div className="px-4 py-6 flex justify-start items-center">
                      {userDatails?.profileImage && (
                        <img
                          src={`${userDatails?.profileImage}`}
                          alt="profile img"
                          className="w-56 h-56 object-cover rounded mr-4"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="px-4 py-2 bg-slate-300">
                      <h1 className="text-md font-medium text-slate-700 uppercase">
                        photos of my property
                      </h1>
                    </div>
                    <div className="px-4 py-6 flex justify-start items-center"></div>
                  </div>
                </div>
              )}
              {selectedMenuItem === "References" && (
                <div className="bg-white">
                  <div className="p-5 border-b">
                    <h1 className="text-slate-800 font-semibold">REFERENCES</h1>
                  </div>
                  {userDatails?.references.length > 0 ? (
                    userDatails?.references.map((reference: any) => (
                      <div className="flex flex-col sm:flex-row pb-5 pt-2">
                        <div className="p-5">
                          {reference?.userId?.profileImage ? (
                            <img
                              src={`${reference?.userId?.profileImage}`}
                              alt="profile img"
                              className="w-14 h-14 object-cover rounded-full"
                            />
                          ) : (
                            <img
                              src={`https://cdn-icons-png.flaticon.com/512/3177/3177440.png`}
                              alt=""
                              className="w-16 h-16 object-cover rounded-full opacity-70"
                            />
                          )}
                        </div>
                        <div className="flex flex-col py-5">
                          <div className="flex flex-col">
                            <h1 className="font-semibold text-slate-800 pb-1">
                              {reference?.userId?.name}
                            </h1>
                            <p className="text-sm text-slate-800">
                              {reference?.userId?.address
                                ? reference?.userId?.address
                                : "Unspecified"}
                            </p>
                            <p className="text-xs text-slate-400">
                              {reference?.userId?.references
                                ? reference?.userId?.references?.length
                                : 0}{" "}
                              references
                            </p>
                          </div>
                          {reference?.recommendYes ? (
                            <div className="pt-4">
                              <h1 className="text-green-500">
                                {reference?.recommendYes}s {userDatails?.name}
                              </h1>
                            </div>
                          ) : (
                            <div className="pt-4">
                              <h1 className="text-red-500">
                                Not {reference?.recommendNo}ing{" "}
                                {userDatails?.name}
                              </h1>
                            </div>
                          )}
                          <div className="pt-4 pr-2">
                            <p>
                              {reference?.referenceMessage
                                .split("\n")
                                .map((line: any, index: any) => (
                                  <span key={index}>
                                    {line}
                                    <br />
                                  </span>
                                ))}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-5 bg-gradient-to-b from-slate-100 to-slate-200">
                      <p className="text-slate-800">
                        There are no reference for {userDatails?.name} to show.
                        If you have any memories about {userDatails?.name}{" "}
                        <span
                          className="text-slate-800 font-semibold hover:underline cursor-pointer"
                          onClick={() =>
                            navigate(`/createReference/${userDatails?._id}`)
                          }
                        >
                          share it
                        </span>
                        . It will help other users as well to find out the
                        common interests
                      </p>
                    </div>
                  )}
                </div>
              )}
              {selectedMenuItem === "Friends" && (
                <div className="text-slate-700 bg-white">
                  <div className="px-5 py-5 border-b">
                    <h1 className="uppercase font-semibold">Friends</h1>
                  </div>
                  <div className="px-5 py-3 bg-slate-100 border-b">
                    <h1 className="uppercase font-semibold">My Friends</h1>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-5 py-5">
                    {userDatails && userDatails.friends ? (
                      userDatails.friends.map((friend: any) => (
                        <div className="flex flex-col md:flex-row gap-2 text-slate-700">
                          <div>
                            {friend.profileImage ? (
                              <img
                                src={`${friend?.profileImage}`}
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
                            <h1 className="font-semibold">{friend.name}</h1>
                            <h1>
                              {friend.address ? friend.address : "No Location"}
                            </h1>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CreateMessage visible={messageModal} closeModal={closeModal} id={id} />
      <CreateHostingModal
        visible={hostingModal}
        closeModal={closeHostingModal}
        id={id}
      />
    </>
  );
};

export default DiffUserProfile;
