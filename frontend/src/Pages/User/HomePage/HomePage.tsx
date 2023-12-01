import { useState, useEffect } from "react";
import SignupNavbar from "../../../Components/User/Navbar/Navbar";
import axiosInstance from "../../../Axios/Axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/Slice/userSlice";
import UserDetailsCard from "../../../Components/User/Cards/Home/UserDetailsCard";
import UserGroupCard from "../../../Components/User/Cards/Home/UserGroupCard";
import { MdVerified, MdOutlineTour, MdArrowRight } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { FaPlaneDeparture } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { ImHome3 } from "react-icons/im";
import { IoCalendarSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { ImUser } from "react-icons/im";

function HomePage() {
  const [userDetails, setUserDetails] = useState<any>([]);
  const [publicTrips, setPublicTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const user = useSelector(selectUser);
  const id = user?.id ? user?.id : user?.user?._id;

  const navigate = useNavigate();

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

  useEffect(() => {
    axiosInstance
      .get('/getPublicTrips')
      .then((response) => {
        if(response.data.publicTrips) {
          setPublicTrips(response.data.publicTrips)
        } else {
          console.log("Public trips not found")
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/search?q=${encodeURIComponent(searchQuery)}`, {
      state: { searchQuery },
    });
  };


  return (
    <>
      <SignupNavbar />
      <div className="w-full">
        <div className="pt-3 px-4 lg:px-32">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex flex-col gap-3">
              <div>
                <UserDetailsCard userDetails={userDetails} />
              </div>
              <div>
                <UserGroupCard userDetails={userDetails} />
              </div>
            </div>
            <div className="w-full flex flex-col gap-3">
              <div className="bg-white shadow-lg">
                <div className="px-5 py-4 border-b flex items-center">
                  <LuListTodo className="text-xl text-slate-700 mr-1" />
                  <h1 className="text-lg font-semibold text-slate-700 uppercase">
                    to-do-list
                  </h1>
                </div>
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full px-8 pt-8 pb-10 flex flex-row items-center">
                    <div className="flex items-center h-full ">
                      <MdVerified className="w-14 h-14 text-green-500" />
                    </div>
                    <div className="px-6">
                      <h1 className="text-lg text-slate-700 font-semibold capitalize pb-3">
                        get verified
                      </h1>
                      <p className="text-slate-700">
                        Find hosts up to 2x faster
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center pb-4 sm:justify-end sm:pr-8 sm:pt-8 ">
                    <button className="bg-green-500 text-white rounded-sm px-20 py-2 h-[43px]">
                      Verify
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-lg">
                <form
                  onSubmit={handleSearch}
                >
                  <div className="px-5 py-4 border-b flex items-center">
                    <MdOutlineTour className="text-xl text-slate-700 mr-2" />
                    <h1 className="text-lg font-semibold text-slate-700 uppercase">
                      HIT THE WORLD'S BEST BEACHES WITH WANDEO...
                    </h1>
                  </div>
                  <div className="flex flex-col">
                    <div className="px-4 flex flex-wrap justify-center gap-3 md:flex-row py-5">
                      <div className="w-full sm:w-[295px] h-[225px]">
                        <img
                          src="/istockphoto-1011241694-612x612.jpg"
                          alt=""
                          className="w-full sm:w-[295px] h-[225px]"
                        />
                      </div>
                      <div className="w-full sm:w-[295px] sm:h-[225px]">
                        <img
                          src="/shutterstock_294262202.webp"
                          alt=""
                          className="w-full sm:w-[295px] h-[225px]"
                        />
                      </div>
                      <div className="w-full sm:w-[295px] sm:h-[225px]">
                        <img
                          src="/367325293acff4760c9456fcc1d6c3eb.jpg"
                          alt=""
                          className="w-full sm:w-[295px] h-[225px]"
                        />
                      </div>
                    </div>
                    <div className="flex item-center justify-center">
                      <div className="pb-5">
                        <div className="flex justify-center">
                          <h1 className="mb-2 text-slate-700 font-semibold">
                            Find hosts wherever I'm going:
                          </h1>
                        </div>
                        <div className="flex justify-center">
                          <input
                            type="text"
                            placeholder="Where are you going?"
                            className="border-2 rounded-3xl px-4 py-1.5 w-auto sm:w-96"
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="bg-white shadow-lg mb-10">
                <div className="px-5 py-4 border-b flex items-center">
                  <FaPlaneDeparture className="text-xl text-slate-700 mr-2" />
                  <h1 className="text-lg font-semibold text-slate-700 uppercase">
                    MY TRAVEL PLANS
                  </h1>
                </div>
                {publicTrips && publicTrips.length > 0 ? (
                  publicTrips.map((trip) => (
                    <div className="px-5 pt-5 border-b">
                      <p className="text-slate-800 pb-4">visiting:{" "}<span className="font-semibold">{trip?.destination}</span></p>
                      <div className="flex flex-wrap gap-2 text-slate-700 pb-4">
                        <div className="flex items-center">
                          <ImHome3 className="mr-1" />
                          <p>{moment(trip.departureDate).diff(trip.arrivalDate, "days") === 1 ? `${moment(trip.departureDate).diff(trip.arrivalDate, "days")} night` : `${moment(trip.departureDate).diff(trip.arrivalDate, "days")} nights`}</p>
                        </div>
                        <div className="flex items-center">
                          <IoCalendarSharp className="mr-1" />
                          <p>{moment(trip?.arrivalDate).format("ddd MMM D")}</p>
                        </div>
                        <div className="flex items-center">
                          <FaArrowRight className="mr-1" />
                          <p>{moment(trip?.departureDate).format("ddd MMM D")}</p>
                        </div>
                        <div className="flex items-center">
                          <ImUser className="mr-1" />
                          <p>{trip?.noOfTravelers}{" "}Traveler</p>
                        </div>
                      </div>
                      <p className="pb-4">{trip?.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center bg-slate-100">
                    <p className="py-8">You have no upcoming trips.</p>
                  </div>
                )}
                <div className="flex flex-col lg:flex-row justify-center items-center gap-4 py-5">
                  <h1
                    className="flex justify-center items-center cursor-pointer capitalize font-bold text-link-color hover:text-sky-700 hover:text-shadow shadow-sky-700/20"
                    onClick={() => navigate(`/createPublicTrip`)}
                  >
                    Create a Public Trip
                    <MdArrowRight className="font-bold  text-2xl mt-1 " />
                  </h1>

                  <h1
                    className="flex justify-center items-center cursor-pointer capitalize font-bold text-link-color hover:text-link-dark hover:text-shadow shadow-sky-700/20"
                    onClick={() => navigate("/publictrips")}
                  >
                    My Public Trips
                    <MdArrowRight className="font-bold text-2xl mt-1 " />
                  </h1>

                  <h1 className="flex justify-center items-center cursor-pointer text-link-color hover:text-link-dark capitalize font-bold hover:text-shadow shadow-sky-700/20">
                    My Couch Requests
                    <MdArrowRight className="font-bold text-2xl mt-1 " />
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
