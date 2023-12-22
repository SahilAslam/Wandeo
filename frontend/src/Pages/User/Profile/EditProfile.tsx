import React, { useState, useEffect, useRef } from "react";
import SignupNavbar from "../../../Components/User/Navbar/Navbar";
import ProfileCard from "../../../Components/User/Profile/ProfileCard";
import axiosInstance from "../../../Axios/Axios";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../../Redux/Slice/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HostingForm from "../../../Components/User/Profile/HostingForm";



const EditProfile = () => {
  const [userDatails, setUserDetails] = useState<any>({});
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<string>("Not Accepting Guests"); // Initialize with the default menu item
  const [hosting, setHosting] = useState<string>("Not Accepting Guests");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [fluentlanguage, setFluentLanguage] = useState("");
  const [languageLearning, setLanguageLearning] = useState("");
  const [about, setAbout] = useState("");
  const [isAbout, setIsAbout] = useState(true);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector(selectUser) as any;
  const id = user?.id ? user?.id : user?.user?._id;

  const ulRef = useRef(null); // Specify the correct type for ulRef
  const menuRef = useRef<HTMLLIElement | null>(null); // Specify the correct type for menuRef

  const Menus = [
    "Accepting Guests",
    "Maybe Accepting Guests",
    "Not Accepting Guests",
    "Wants to Meet Up",
  ];

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== ulRef.current) {
      setMenuOpen(false);
    }
  });

 
  useEffect(() => {
    axiosInstance
      .get(`/profile/${id}`)
      .then((res) => {
        if (res.data.user) {
          console.log(res.data.user);

          setUserDetails(res.data.user);
          setHosting(res.data.user.hostingAvailability);
          setName(res.data.user.name);
          setBirthday(res.data.user.dateOfBirth);
          setGender(res.data.user.gender);
          setEmail(res.data.user.email);
          setPhone(res.data.user.phone);
          setAddress(res.data.user.address);
          setOccupation(res.data.user.occupation);
          setEducation(res.data.user.education);
          setFluentLanguage(res.data.user.languagesFluentIn);
          setLanguageLearning(res.data.user.languageLearning);
          setAbout(res.data.user.about);

          console.log("userDatails", userDatails);
        } else {
          console.error("Invalid data received from the API:", res.data.user);
        }
      })
      .catch((error) => console.log(error, "user profile error"));
  }, [setUserDetails]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    const updateData = {
      hostingAvailability: hosting,
      name: name,
      dateOfBirth: birthday,
      gender: gender,
      email: email,
      phone: phone,
      address: address,
      occupation: occupation,
      education: education,
      about: about,
      languagesFluentIn: fluentlanguage,
      languagesLearning: languageLearning,
    };

    await axiosInstance
      .post(`/editUser/${id}`, updateData)
      .then((response) => {
        if (response.data.user) {
          console.log(response.data.user);

          dispatch(login(response.data));
          setTimeout(() => {
            toast.success(response.data.message);
          });
          navigate(`/profile`);
        } else {
          console.log("data not found");
        }
      })
      .catch((error: any) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleClick = () => {
    setIsAbout(false);
  };

  const handleCancel = () => {
    navigate('/profile')
  }

  return (
    <>
      <SignupNavbar />
      <div className="w-full pb-20">
        <div className="py-4 px-4 xl:px-32">
          <div className="flex flex-col gap-4 md:flex-row xl:gap-8 md:gap-4">
            <div>
              <ProfileCard userDetails={userDatails} id={id} />
            </div>
            <div className="w-full md:auto flex flex-col">
              <div className=" py-2 hidden md:flex md:flex-col justify-center ">
                <h1 className="text-5xl text-slate-800 font-semibold capitalize">
                  {userDatails?.name}
                </h1>
                <h6 className="text-xl pt-2 text-slate-800 font-semibold capitalize">
                  {userDatails?.address
                    ? userDatails.address
                    : "Location not provided"}
                </h6>
              </div>
              <div className="w-full xl:w-auto h-full bg-white">
                <div className="w-full md:w-auto flex flex-col">
                  <div className="w-full md:w-auto h-[45px] border-b flex flex-row gap-1">
                    <h1
                      onClick={() => setIsAbout(true)}
                      className={`block w-20 py-2 px-4 cursor-pointer hover:animate-pulse ${
                        isAbout
                          ? "border-b-4 border-green-800 delay-75"
                          : "delay-75"
                      }`}
                    >
                      About
                    </h1>
                    <h1
                      onClick={handleClick}
                      className={`block w-20 py-2 px-3 cursor-pointer hover:animate-pulse ${
                        !isAbout
                          ? "border-b-4 border-green-800 delay-75"
                          : "delay-75"
                      }`}
                    >
                      Hosting
                    </h1>
                    {/* <div className="w-full px-4 py-1.5 flex justify-end gap-4">
                        <button
                          className="px-6 bg-green-600 text-white font-semibold rounded-md"
                          type="submit"
                        >
                          Save
                        </button>
                        <button className="px-5 bg-gray-400 text-white font-semibold rounded-md">
                          Cancel
                        </button>
                      </div> */}
                  </div>
                  {isAbout ? (
                    <div>
                      <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="mx-4 px-1 py-6 flex flex-col md:flex-row border-b">
                          <h1 className="w-44 text-slate-700 text-base font-semibold">
                            Hosting Availability
                          </h1>
                          <div className="w-auto md:mx-6 flex flex-col relative">
                            <input
                              type="text"
                              placeholder="Select an option"
                              onClick={() => setMenuOpen(!menuOpen)}
                              ref={ulRef}
                              value={hosting ? hosting : selectedMenu}
                              className="block w-fit sm:w-60 md:w-auto lg:w-60 rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
                            />
                            {menuOpen && (
                              <div className="bg-white w-auto md:w-60 text-sm shadow-xl -left-1 border rounded-md absolute ml-1 mt-9 md:mt-7">
                                <ul>
                                  {Menus.map((menu, index) => (
                                    <li
                                      key={index}
                                      className="px-2 py-0.5 cursor-pointer hover:bg-blue-100"
                                      onClick={() => {
                                        setSelectedMenu(menu);
                                        setHosting(menu);
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
                        <div className="mx-4 px-1 flex flex-col border-b">
                          <div className="py-4 flex flex-col md:flex-row md:gap-4 ">
                            <h1 className="w-44  text-slate-700 text-base font-semibold">
                              Name
                            </h1>
                            <div className="md:mx-2 md:w-auto lg:w-auto xl:w-[30rem]  flex flex-col">
                              <input
                                type="text"
                                placeholder=""
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="py-4 flex flex-col md:flex-row md:gap-6">
                            <h1 className="w-44 text-slate-700 text-base font-semibold">
                              Birthday
                            </h1>
                            <div className="md:w-auto lg:w-[12rem] xl:w-[12rem] flex flex-col">
                              <input
                                type="date"
                                onChange={(e) => setBirthday(e.target.value)}
                                value={birthday}
                                placeholder=""
                                className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="py-4 flex flex-col md:flex-row md:gap-5">
                            <h1 className="w-44 text-slate-700 text-base font-semibold">
                              Gender
                            </h1>
                            <div className="md:mx-1 md:w-auto lg:w-[12rem] xl:w-[12rem] flex flex-col">
                              <input
                                type="text"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                placeholder=""
                                className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mx-4 px-1 flex flex-col border-b">
                          <div className="py-4 flex flex-col md:flex-row md:gap-4 ">
                            <h1 className="w-44  text-slate-700 text-base font-semibold">
                              Email
                            </h1>
                            <div className="md:mx-2 md:w-auto lg:w-auto xl:w-[30rem]  flex flex-col">
                              <input
                                type="text"
                                placeholder=""
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="py-4 flex flex-col md:flex-row md:gap-6">
                            <h1 className="w-44 text-slate-700 text-base font-semibold">
                              Phone
                            </h1>
                            <div className="md:w-auto lg:w-[25rem] xl:w-[30rem] flex flex-col">
                              <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder=""
                                className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="py-4 flex flex-col md:flex-row md:gap-5">
                            <h1 className="w-44 text-slate-700 text-base font-semibold">
                              Home Address
                            </h1>
                            <div className="md:mx-1 md:w-auto lg:w-[25rem] xl:w-[30rem] flex flex-col">
                              <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder=""
                                className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mx-4 px-1 flex flex-col border-b">
                          {/* <div className="py-4 flex flex-col md:flex-row md:gap-4 ">
                            <h1 className="w-44  text-slate-700 text-base font-semibold">
                              Where I Grew Up
                            </h1>
                            <div className="md:mx-2 md:w-auto lg:w-auto xl:w-[30rem]  flex flex-col">
                              <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder=""
                                className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div> */}
                          <div className="py-4 flex flex-col md:flex-row md:gap-6">
                            <h1 className="w-44 text-slate-700 text-base font-semibold">
                              Occupation
                            </h1>
                            <div className="md:w-auto lg:w-[25rem] xl:w-[30rem] flex flex-col">
                              <input
                                type="text"
                                value={occupation}
                                onChange={(e) => setOccupation(e.target.value)}
                                placeholder=""
                                className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="py-4 flex flex-col md:flex-row md:gap-5">
                            <h1 className="w-44 text-slate-700 text-base font-semibold">
                              Education
                            </h1>
                            <div className="md:mx-1 md:w-auto lg:w-[25rem] xl:w-[30rem] flex flex-col">
                              <input
                                type="text"
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                                placeholder=""
                                className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mx-4 px-1 flex flex-col border-b">
                          <div className="py-4 flex flex-col md:flex-row">
                            <h1 className="w-44 text-slate-700 text-base font-semibold">
                              Languages I'm Fluent In
                            </h1>
                            <div className="md:mx-6 md:w-auto lg:w-[25rem] xl:w-[30rem] flex flex-col">
                              <p>Add Language</p>
                              <input
                                type="text"
                                value={fluentlanguage}
                                onChange={(e) =>
                                  setFluentLanguage(e.target.value)
                                }
                                placeholder=""
                                className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="py-4 flex flex-col md:flex-row md:gap-4">
                            <h1 className="w-44 text-slate-700 text-base font-semibold">
                              Languages I'm Learning
                            </h1>
                            <div className="md:mx-2 md:w-auto lg:w-[25rem] xl:w-[30rem]  flex flex-col">
                              <p>Add Language</p>
                              <input
                                type="text"
                                value={languageLearning}
                                onChange={(e) =>
                                  setLanguageLearning(e.target.value)
                                }
                                placeholder=""
                                className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mx-4 px-1 py-6 flex flex-col gap-4 border-b">
                          <div>
                            <h1 className="w-auto text-slate-700 text-base font-semibold">
                              About Me
                            </h1>
                            <textarea
                              name=""
                              id=""
                              rows={6}
                              value={about}
                              onChange={(e) => setAbout(e.target.value)}
                              className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
                            ></textarea>
                          </div>
                          {/* <div>
                            <h1 className="w-auto text-slate-700 text-base font-semibold">
                              Why I'm on Wandeo
                            </h1>
                            <textarea
                              name=""
                              id=""
                              rows="6"
                              className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
                            ></textarea>
                          </div>
                          <div>
                            <h1 className="w-auto text-slate-700 text-base font-semibold">
                              One Amazing Thing I've Done
                            </h1>
                            <textarea
                              name=""
                              id=""
                              rows="6"
                              className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
                            ></textarea>
                          </div>
                          <div>
                            <h1 className="w-auto text-slate-700 text-base font-semibold">
                              Teach, Learn, Share
                            </h1>
                            <textarea
                              name=""
                              id=""
                              rows="6"
                              className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
                            ></textarea>
                          </div>
                          <div>
                            <h1 className="w-auto text-slate-700 text-base font-semibold">
                              What I Can Share With Hosts
                            </h1>
                            <textarea
                              name=""
                              id=""
                              rows="6"
                              className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
                            ></textarea>
                          </div> */}
                        </div>
                        {/* <div className="mx-4 px-1 flex flex-col border-b">
                          <div className="py-4 flex flex-col md:flex-row">
                            <h1 className="text-slate-700 text-base font-semibold">
                              Countries I've Visited
                            </h1>
                            <div className="md:mx-8 md:w-auto lg:w-[25rem] xl:w-[30rem] flex flex-col">
                              <p>Add Country</p>
                              <input
                                type="text"
                                placeholder=""
                                className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="py-4 flex flex-col md:flex-row md:gap-4">
                            <h1 className="w-auto text-slate-700 text-base font-semibold">
                              Countries I've Lived In
                            </h1>
                            <div className="md:mx-2 md:w-auto lg:w-[25rem] xl:w-[30rem] flex flex-col">
                              <p>Add Country</p>
                              <input
                                type="text"
                                placeholder=""
                                className="block w-full rounded-md border-0 py-0.5 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-slate-800 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div> */}
                        <div className="mx-4 px-1 py-4 flex flex-row gap-4">
                          <button
                            className="px-6 py-1 bg-green-600 text-white font-semibold rounded-sm"
                            type="submit"
                          >
                            Save
                          </button>
                          <button onClick={handleCancel} className="px-5 py-1 bg-gray-400 text-white font-semibold rounded-sm">
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <HostingForm />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
