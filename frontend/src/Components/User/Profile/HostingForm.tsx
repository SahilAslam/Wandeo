import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../../Axios/Axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/Slice/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Checkbox from "../Checkbox/Checkbox";

const HostingForm = () => {
  const [guestMenuOpen, setGuestMenuOpen] = useState(false);
  const [selectedGuestMenu, setSelectedGuestMenu] = useState("Any");
  const [noOfGuests, setNoOfGuests] = useState("");
  const [genderMenuOpen, setGenderMenuOpen] = useState(false);
  const [selectedGenderMenu, setSelectedGenderMenu] = useState("Any");
  const [genderAccepting, setGenderAccepting] = useState("");
  const [sleepingMenuOpen, setSleepingMenuOpen] = useState(false);
  const [selectedSleepingMenu, setSelectedSleepingMenu] = useState("");
  const [sleepingArrangement, setSleepingArrangement] = useState("");
  const [sleepingArrangementDescription, setSleepingArrangementDescription] = useState("");
  const [transportationAccess, setTransportationAccess] = useState("");
  const [whatCanIShare, setWhatCanIShare] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);
  const [checkedThree, setCheckedThree] = useState(false);
  const [kidFriendly, setKidFriendly] = useState("");
  const [petFriendly, setPetFriendly] = useState("");
  const [smoking, setSmoking] = useState("");

  const navigate = useNavigate();

  const user = useSelector(selectUser) as any;
  const id = user?.id ? user?.id : user?.user?._id;

  useEffect(() => {
    axiosInstance
      .get(`/getHostingPref/${id}`)
      .then((response) => {
        if (response.data.hosting) {
          console.log(response.data.hosting, "jh");
          setNoOfGuests(response.data.hosting?.noOfGuests);
          setGenderAccepting(response.data.hosting?.preferredGender);
          setKidFriendly(response.data.hosting?.kidFriendly);
          setPetFriendly(response.data.hosting?.petFriendly);
          setSmoking(response.data.hosting?.smoking);
          setSleepingArrangement(response.data.hosting?.sleepingArrangement);
          setSleepingArrangementDescription(
            response.data.hosting?.sleepingArrangementDescription
          );
          setTransportationAccess(response.data.hosting?.transportationAccess);
          setWhatCanIShare(response.data.hosting?.whatCanIShare);
          setAdditionalInformation(
            response.data.hosting?.additionalInformation
          );
        } else {
          console.error(
            "Invalid data received from the API:",
            response.data.user
          );
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

  const guestUlRef = useRef(null); // Specify the correct type for ulRef
  const guestMenuRef = useRef<HTMLLIElement | null>(null); // Specify the correct type for menuRef

  const GuestMenus = ["Any", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  window.addEventListener("click", (e) => {
    if (e.target !== guestMenuRef.current && e.target !== guestUlRef.current) {
      setGuestMenuOpen(false);
    }
  });

  const genderUlRef = useRef(null); // Specify the correct type for ulRef
  const genderMenuRef = useRef(null); // Specify the correct type for menuRef

  const GenderMenus = ["Any", "Male", "Female"];

  window.addEventListener("click", (e) => {
    if (
      e.target !== genderMenuRef.current &&
      e.target !== genderUlRef.current
    ) {
      setGenderMenuOpen(false);
    }
  });

  const sleepingUlRef = useRef(null); // Specify the correct type for ulRef
  const sleepingMenuRef = useRef<HTMLLIElement | null>(null); // Specify the correct type for menuRef

  const sleepingMenus = [
    "",
    "Shared Bed",
    "shared Room",
    "Public Room (eg: Living Room)",
    "Private Room",
  ];

  window.addEventListener("click", (e) => {
    if (
      e.target !== sleepingMenuRef.current &&
      e.target !== sleepingUlRef.current
    ) {
      setSleepingMenuOpen(false);
    }
  });

  // const handleCheckboxChange = (day) => {
  //   setAvailability({ ...availability, [day]: !availability[day] });
  // };

  const handleChangeOne = () => {
    setCheckedOne((prevCheckedOne) => {
      if (prevCheckedOne) setKidFriendly("No");
      else setKidFriendly("Yes");
      return !prevCheckedOne;
    });
  };
  
  const handleChangeTwo = () => {
    setCheckedTwo((prevCheckedTwo) => {
      if (prevCheckedTwo) setPetFriendly("No");
      else setPetFriendly("Yes");
      return !prevCheckedTwo;
    });
  };
  
  const handleChangeThree = () => {
    setCheckedThree((prevCheckedThree) => {
      if (prevCheckedThree) setSmoking("No");
      else setSmoking("Yes");
      return !prevCheckedThree;
    });
  };
  
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    // const availabilityArray = Object.keys(availability).filter(
    //   (day) => availability[day]
    // );

    const createData = {
      // availableNights: availabilityArray,
      noOfGuests: noOfGuests,
      preferredGender: genderAccepting,
      kidFriendly: kidFriendly,
      petFriendly: petFriendly,
      smoking: smoking,
      sleepingArrangement: sleepingArrangement,
      sleepingArrangementDescription: sleepingArrangementDescription,
      transportationAccess: transportationAccess,
      whatCanIShare: whatCanIShare,
      additionalInformation: additionalInformation,
    };

    const response = await axiosInstance.post(`/hostingform/${id}`, createData);

    if (response.data) {
      console.log(response.data.message);
      setTimeout(() => {
        toast.success(response.data.message);
      }, 0);
      navigate(`/profile`);
    } else {
      toast.error("failed to save your preferences!");
      console.log("data not found");
    }
  };


  return (
    <div className="">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mx-4 px-1 flex flex-col border-b pt-4">
          <div>
            <h1 className="text-[0.85rem] text-green-800 font-[650]">
              MY PREFERENCES
            </h1>
          </div>
          {/* <div className="py-4 flex flex-col md:flex-row md:gap-4 ">
            <h1 className="w-48  text-slate-700 text-base font-semibold">
              Available Nights to Host
            </h1>
            <div className="w-auto md:mx-6 flex flex-wrap gap-4 relative">
              {Object.keys(availability).map((day) => (
                <div key={day}>
                  <label className="flex flex-col">
                    {day}
                    <input
                      type="checkbox"
                      checked={availability[day]}
                      onChange={() => handleCheckboxChange(day)}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div> */}
          <div className="py-4 flex flex-col md:flex-row md:gap-4 ">
            <h1 className="w-48  text-slate-700 text-base font-semibold">
              Maximum Number of Guests
            </h1>
            <div className="w-auto md:mx-6 flex flex-col relative">
              <input
                type="text"
                onClick={() => setGuestMenuOpen(!guestMenuOpen)}
                ref={guestUlRef}
                value={noOfGuests ? noOfGuests : selectedGuestMenu}
                className="block w-16 rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6 cursor-pointer"
              />
              {guestMenuOpen && (
                <div className="bg-white w-auto md:w-60 text-sm shadow-xl -left-1 border rounded-md absolute ml-1 mt-9 md:mt-7 cursor-pointer z-50">
                  <ul>
                    {GuestMenus.map((menu, index) => (
                      <li
                        key={index}
                        className="px-2 py-0.5 cursor-pointer hover:bg-blue-100"
                        onClick={() => {
                          setSelectedGuestMenu(String(menu));
                          setNoOfGuests(String(menu));
                          setGuestMenuOpen(false);
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
          <div className="py-4 flex flex-col md:flex-row md:gap-4 ">
            <h1 className="w-48  text-slate-700 text-base font-semibold">
              Preferred Gender to Host
            </h1>
            <div className="w-auto md:mx-6 flex flex-col relative">
              <input
                type="text"
                onClick={() => setGenderMenuOpen(!genderMenuOpen)}
                ref={genderUlRef}
                value={genderAccepting ? genderAccepting : selectedGenderMenu}
                className="cursor-pointer block w-16 rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
              />
              {genderMenuOpen && (
                <div className="bg-white cursor-pointer w-auto md:w-60 text-sm shadow-xl -left-1 border rounded-md absolute ml-1 mt-9 md:mt-7 z-50">
                  <ul>
                    {GenderMenus.map((menu, index) => (
                      <li
                        key={index}
                        className="px-2 py-0.5 cursor-pointer hover:bg-blue-100"
                        onClick={() => {
                          setSelectedGenderMenu(menu);
                          setGenderAccepting(menu);
                          setGenderMenuOpen(false);
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
          <div className="py-4 flex flex-col md:flex-row md:gap-4 ">
            <h1 className="w-48  text-slate-700 text-base font-semibold">
              Preferred Gender to Host
            </h1>
            <div className="w-auto md:mx-6 flex flex-col relative">
              <Checkbox label="Kid Friendly" onChange={handleChangeOne} value={checkedOne} />
              <Checkbox label="Pet Friendly" onChange={handleChangeTwo} value={checkedTwo} />
              <Checkbox label="Smoking is Allowed" onChange={handleChangeThree} value={checkedThree} />
            </div>
          </div>
        </div>
        <div className="mx-4 px-1 flex flex-col border-b pt-4">
          <h6 className="text-[0.85rem] text-green-800 font-[650]">
            MY PROPERTY
          </h6>
          <div className="py-4 flex flex-col md:flex-row md:gap-9 ">
            <div>
              <h1 className="w-48  text-slate-700 text-base font-semibold">
                Sleeping Arrangement
              </h1>
            </div>
            <div className="w-full relative">
              <input
                type="text"
                onClick={() => setSleepingMenuOpen(!sleepingMenuOpen)}
                ref={sleepingUlRef}
                value={
                  sleepingArrangement
                    ? sleepingArrangement
                    : selectedSleepingMenu
                }
                className="cursor-pointer rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
              />
              {sleepingMenuOpen && (
                <div className="bg-white w-auto md:w-60 text-sm shadow-xl -left-1 border rounded-md absolute ml-1 cursor-pointer z-50">
                  <ul>
                    {sleepingMenus.map((menu, index) => (
                      <li
                        key={index}
                        className="px-2 py-0.5 cursor-pointer hover:bg-blue-100"
                        onClick={() => {
                          setSelectedSleepingMenu(menu);
                          setSleepingArrangement(menu);
                          setSleepingMenuOpen(false);
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
          <div className="py-4 flex flex-col md:flex-row md:gap-9 ">
            <div>
              <h1 className="w-48  text-slate-700 text-base font-semibold">
                Description of Sleeping Arrangement
              </h1>
            </div>
            <div className="w-full">
              <textarea
                name=""
                id=""
                rows={7}
                value={sleepingArrangementDescription}
                onChange={(e) =>
                  setSleepingArrangementDescription(e.target.value)
                }
                className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>
          <div className="py-4 flex flex-col md:flex-row md:gap-9 ">
            <div>
              <h1 className="w-48  text-slate-700 text-base font-semibold">
                Public Transportation Access
              </h1>
            </div>
            <div className="w-full">
              <textarea
                name=""
                id=""
                rows={7}
                value={transportationAccess}
                onChange={(e) => setTransportationAccess(e.target.value)}
                className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>
          <div className="py-4 flex flex-col md:flex-row md:gap-9 ">
            <div>
              <h1 className="w-48  text-slate-700 text-base font-semibold">
                What I Can Share With Guests
              </h1>
            </div>
            <div className="w-full">
              <textarea
                name=""
                id=""
                rows={7}
                value={whatCanIShare}
                onChange={(e) => setWhatCanIShare(e.target.value)}
                className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>
          <div className="py-4 flex flex-col md:flex-row md:gap-9 ">
            <div>
              <h1 className="w-48  text-slate-700 text-base font-semibold">
                Additional Information
              </h1>
            </div>
            <div className="w-full">
              <textarea
                name=""
                id=""
                rows={7}
                value={additionalInformation}
                onChange={(e) => setAdditionalInformation(e.target.value)}
                className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mx-4 px-1 py-4 flex flex-row gap-4">
          <button
            className="px-6 py-1 bg-green-600 text-white font-semibold rounded-sm"
            type="submit"
          >
            Save
          </button>
          <button className="px-5 py-1 bg-gray-400 text-white font-semibold rounded-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default HostingForm;
