import { useState, useEffect } from "react";
import SignupNavbar from "../../../Components/User/Navbar/Navbar";
import ProfileCard from "../../../Components/User/Profile/ProfileCard";
import axiosInstance from "../../../Axios/Axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/Slice/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import AddImage from "../../../Components/Modals/AddImage";
import { ToastContainer } from "react-toastify";

const DiffUserProfile = () => {
  const [userDatails, setUserDetails] = useState<any>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState("About");
  const [imageModal, setImageModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const {id} = useParams();

  const user = useSelector(selectUser);
  const userId = user?.id ? user?.id : user?.user?._id;
  console.log(userId);

  useEffect(() => {
    axiosInstance
      .get(`/profile/${id}`)
      .then((res) => {
        if (res.data.user) {
          console.log(res.data.user);

          setUserDetails(res.data.user);
        } else {
          console.error("Invalid data received from the API:", res.data.user);
        }
      })
      .catch((error) => console.log(error, "user profile error"));
  }, [id]);

  const openModal = () => {
    setImageModal(true);
  };

  const closeModal = () => {
    setImageModal(false);
  };

  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
  };



  const baseUrl =
    "https://res.cloudinary.com/dkba47utw/image/upload/v1698223651";

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

  return (
    <>
      <SignupNavbar />
      <ToastContainer/>
      <div className="w-full ">
        <div className="pt-2 px-4 lg:px-32">
          <div className="flex flex-col md:flex-row gap-2">
            <div>
              <ProfileCard userDetails={userDatails} />
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 bg-white">
                <div className="flex flex-col py-5 px-5">
                  <h1 className="text-red-600 text-2xl font-semibold">
                  {userDatails?.hostingAvailability
                          ? userDatails.hostingAvailability
                          : "Details not specified"}
                  </h1>
                  <p className="text-sm pt-4 text-gray-400">
                    Last login 7 minutes ago
                  </p>
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
                  <li
                    className={
                      selectedMenuItem === "Favorites"
                        ? "text-blue-700 hover:underline cursor-pointer"
                        : "hover:text-blue-700 cursor-pointer"
                    }
                    onClick={() => handleMenuItemClick("Favorites")}
                  >
                    Favorites
                  </li>
                </ul>
              </div>
              {selectedMenuItem === "About" && (
                <div className="flex flex-col gap-2">
                  {/* Content for About */}
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
                        {userDatails?.languagesFluentIn &&
                        userDatails?.languagesLearning
                          ? `Fluent in ${userDatails.languagesFluentIn} learning ${userDatails.languagesLearning}`
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
                      <p className="pb -3 text-slate-600">
                        {userDatails?.about ? userDatails.about : ""}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {selectedMenuItem === "Hosting" && (
                <div>
                  <div className="two bg-slate-400">Hosting Content</div>
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
                          src={`${baseUrl}/${userDatails?.profileImage}`}
                          alt="profile img"
                          className="w-56 h-56 object-cover rounded mr-4"
                        />
                      )}
                      <button
                        onClick={openModal}
                        className="px-12 py-2 flex justify-center rounded-sm capitalize bg-sky-600 text-white"
                      >
                        <IoMdAdd size={25} className="" /> add photo
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="px-4 py-2 bg-slate-300">
                      <h1 className="text-md font-medium text-slate-700 uppercase">
                        photos of my property
                      </h1>
                    </div>
                    <div className="px-4 py-6 flex justify-start items-center">
                      <button className="px-12 py-2 flex justify-center rounded-sm capitalize bg-sky-600 text-white">
                        <IoMdAdd size={25} className="" /> add photo
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {selectedMenuItem === "References" && <div></div>}
              {selectedMenuItem === "Friends" && <div></div>}
              {selectedMenuItem === "Favorites" && <div></div>}
            </div>
          </div>
        </div>
      </div>
      <AddImage closeModal={closeModal} visible={imageModal} />
    </>
  );
};

export default DiffUserProfile;
