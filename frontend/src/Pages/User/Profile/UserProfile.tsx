import { useState, useEffect } from "react";
import SignupNavbar from "../../../Components/User/Navbar/Navbar";
import ProfileCard from "../../../Components/User/Profile/ProfileCard";
import axiosInstance from "../../../Axios/Axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/Slice/userSlice";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [userDatails, setUserDetails] = useState<any>([]);

  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const id = user?.user?._id;
  console.log(id);

  useEffect(() => {
    axiosInstance
      .get(`/profile/${id}`)
      .then((res) => {
        if (res.data.message) {
          console.log(res.data.message);

          setUserDetails(res.data.message);
        } else {
          console.error(
            "Invalid data received from the API:",
            res.data.message
          );
        }
      })
      .catch((error) => console.log(error, "user profile error"));
  }, [setUserDetails]);

  const handleButton = async () => {
    navigate(`/editProfile/${id}`)
  }

  return (
    <>
      <SignupNavbar />
      <div className="w-full ">
        <div className="pt-2 px-4 lg:px-32">
          <div className="flex flex-col md:flex-row gap-2">
            <div>
              <ProfileCard userDetails={userDatails} />
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="grid grid-cols-2 bg-white">
                <div className="flex flex-col py-5 px-5">
                  <h1 className="text-red-600 text-2xl font-semibold">Not Accepting Guests</h1>
                  <p className="text-sm pt-4 text-gray-400">Last login 7 minutes ago</p>
                </div>
                <div className="flex items-center justify-end px-5 pt-0">
                  <button className="bg-green-700 hover:bg-green-800 text-white font-medium px-4 py-2 rounded-sm" onClick={handleButton}>
                    Edit My Profile
                  </button>
                </div>
              </div>
              <div className="bg-white xl:h-[70px]">
                <ul className="flex flex-row flex-wrap gap-x-14 gap-y-2 px-5 py-5 text-green-800 font-semibold ">
                  <li className="hover:text-blue-700">About</li>
                  <li className="hover:text-blue-700">Hosting</li>
                  <li className="hover:text-blue-700">Photos</li>
                  <li className="hover:text-blue-700">References</li>
                  <li className="hover:text-blue-700">Friends</li>
                  <li className="hover:text-blue-700">Favorites</li>
                </ul>
              </div>
              <div className="bg-white h-[240px] flex flex-col">
                <div className="border-b h-[65px] flex items-center">
                  <h1 className="px-5 font-semibold text-slate-800">OVERVIEW</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 px-5 py-5">
                  <p className="pb-3 text-slate-600 font-semibold">0 References</p>
                  <p className="pb-3 text-slate-600">No occupation listed</p>
                  <p className="pb-3 text-slate-600">Fluent in English, Malayalam; learning Hindi, Tamil</p>
                  <p className="pb-3 text-slate-600" >Bsc IT graduate</p>
                  <p className="pb-3 text-slate-600">23, Male</p>
                  <p className="pb-3 text-slate-600">From Kochi, Kerala, India</p>
                  <p className="pb-3 text-slate-600">Member since 2023</p>
                  <p className="pb-3 text-blue-900 font-semibold">Profile 70% complete</p>
                </div>
              </div>
              <div className="flex flex-col bg-white">
                <div className="border-b h-[65px] flex items-center">
                  <h1 className="px-5 font-semibold text-slate-800">ABOUT ME</h1>
                </div>
                <div className="h-[50px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
