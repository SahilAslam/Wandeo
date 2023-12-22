import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../Components/User/Navbar/Navbar";
import { HiOutlineExclamation } from "react-icons/hi";
import axiosInstance from "../../../Axios/Axios";
import { toast } from "react-toastify";

const HostUser = () => {
  const [userData, setUserData] = useState<any>({});
  const [MenuOpen, setMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [noOfTravelers, setNoOfTravelers] = useState<string>("");
  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [departureDate, setDepartureDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("")

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`/profile/${id}`)
      .then((res) => {
        if (res.data.user) {
          setUserData(res.data.user);
        } else {
          console.error("Invalid data received from the API:", res.data.user);
        }
      })
      .catch((error) => console.log(error, "user profile error"));
  }, [id]);

  const UlRef = useRef(null); // Specify the correct type for ulRef

  const Menus = ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const today = new Date().toISOString().split('T')[0];

  const handleArrivalDateChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const newArrivalDate = e.currentTarget.value;
    setArrivalDate(newArrivalDate);
  };
  
  const handleDepartureDateChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const newDepartureDate = e.currentTarget.value;
    setDepartureDate(newDepartureDate);
  
    // Check if the end date is less than the start date
    if (newDepartureDate < arrivalDate) {
      setError('Departure cannot be before the arrival');
    } else {
      setError('');
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault()

    if(arrivalDate === "" || departureDate === "" || noOfTravelers === "" || message === "") {
      setError("Required all fields")
      return
    }

    if (departureDate < arrivalDate) {
      setError('Departure cannot be before the arrival');
      return;
    }

    const createData = {
      arrivalDate: arrivalDate,
      departureDate: departureDate,
      noOfTravelers: noOfTravelers,
      message: message,
    }

    const response = await axiosInstance.post(`/hostuser/${id}`, createData)

    if (response.data) {
      console.log(response.data.message);
      setTimeout(() => {
        toast.success("saved successfully");
      }, 0);
      navigate(`/messageDetailedPage/${response.data?.host?._id}`);
    } else {
      toast.error("failed to save your preferences!");
      console.log("data not found");
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center px-2 py-4">
        <div className="bg-white shadow-lg w-full md:max-w-lg">
          <div className="px-4 py-4 bg-slate-200">
            <h1 className="text-slate-800 font-semibold text-lg">
                OFFER TO HOST {userData?.name}
            </h1>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="px-8 flex flex-col">
              {error === "Required all fields" && (
                <div className=" pt-5">
                  <p className="bg-red-200 flex justify-center items-center text-[#3E1214] font-semibold py-4">
                    <HiOutlineExclamation className="mr-1 text-xl" />
                    {error}
                  </p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-8 pb-1 pt-5">
                <div className="flex flex-col w-3/4 sm:w-1/2">
                  <label className="text-slate-800 font-semibold mb-1">
                    Arrival Date *
                  </label>
                  <input
                    type="date"
                    value={arrivalDate}
                    onChange={() => handleArrivalDateChange}
                    min={today}
                    className={`border rounded px-2 py-1 `}
                  />
                </div>
                <div className="flex flex-col w-3/4 sm:w-1/2">
                  <label className="text-slate-800 font-semibold mb-1">
                    Departure Date *
                  </label>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={() => handleDepartureDateChange}
                    min={today}
                    className={`border rounded px-2 py-1 ${
                      error === "Departure cannot be before the arrival" &&
                      "border-red-500 border-2"
                    } `}
                  />
                </div>
              </div>
              <div className="pb-5">
                <p className="text-red-500">
                  {error === "Departure cannot be before the arrival" && error}
                </p>
              </div>
              <div className="flex flex-col pb-5">
                <label className="text-slate-800 font-semibold mb-1">
                  No of Travelers *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    onClick={() => setMenuOpen(!MenuOpen)}
                    ref={UlRef}
                    value={noOfTravelers ? noOfTravelers : selectedMenu}
                    className={`block w-24 rounded border py-1 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm sm:text-sm sm:leading-6 cursor-pointer `}
                  />
                  {MenuOpen && (
                    <div className="bg-white w-24 text-sm shadow-xl -left-1 border rounded-md absolute ml-1 cursor-pointer z-50">
                      <ul>
                        {Menus.map((menu, index) => (
                          <li
                            key={index}
                            className="px-2 cursor-pointer hover:bg-blue-100"
                            onClick={() => {
                              setSelectedMenu(String(menu));
                              setNoOfTravelers(String(menu));
                              setMenuOpen(false);
                            }}
                          >
                            {<span>{menu}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col pb-5">
                <label className="text-slate-800 font-semibold mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Tell ${userData?.name} why you want to host him`}
                  className={`border rounded px-2 py-1 `}
                ></textarea>
              </div>
            </div>
            <div className="px-8 py-3 flex justify-end gap-2 bg-slate-200">
              <button className="px-4 bg-slate-400 rounded py-1.5 text-white ">
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 bg-green-600 hover:bg-green-700 delay-75 hover:delay-75 rounded py-1.5 text-white"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default HostUser;
