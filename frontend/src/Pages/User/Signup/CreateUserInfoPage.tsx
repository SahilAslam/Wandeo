import React, { useState } from "react";
import axiosInstance from "../../../Axios/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { FaExclamationCircle } from "react-icons/fa";
import SignupNavbar from "../../../Components/User/SignupNavbar/SignupNavbar";

const CreateUserInfoPage = () => {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const options = ["", "Male", "Female", "Others"];

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setGender((e.target as HTMLSelectElement).value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedBirthday = dateOfBirth.trim();
    const trimmedGender = gender.trim();
    const trimmedAddress = address.trim();

    if (
      trimmedBirthday === "" ||
      trimmedGender === "" ||
      trimmedAddress === ""
    ) {
      setErrMessage("Required all fields");
      setTimeout(() => {
        setErrMessage("");
      }, 3000);
      return;
    }

    const updateData = {
      dateOfBirth,
      gender,
      address,
    };

    await axiosInstance
      .post(`/createuserinfo/${id}`, updateData)
      .then((response) => {
        if (response.data.user) {
          setTimeout(() => {
            navigate(`/login`);
          }, 1000);
          toast.success("Signup successfull");
        } else {
          console.log("data not found");
        }
      })
      .catch((error: any) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <>
      <SignupNavbar />
      <ToastContainer />
      <GoogleOAuthProvider clientId="307319234489-tjsu09c3qicatftagifvbbugpv9cnr3o.apps.googleusercontent.com">
        <div className="signup flex min-h-full flex-1 flex-col justify-center px-6 md:py-12  lg:px-8 items-center h-screen ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm  md:max-w-md">
            <div className="bg-white md:text-opacity-100 pt-10 pb-16 shadow-xl rounded-lg">
              <div>
                <h2 className="text-center text-2xl font-bold leading-6 tracking-normal text-gray-800">
                  Create account
                </h2>
                <p className="text-center font-bold leading-10 tracking-normal text-green-800">
                  This information helps us fill out your profile{" "}
                </p>
              </div>
              {errMessage && (
                <div className="bg-gradient-to-r from-red-500  to-red-600 flex items-center justify-center px-2 py-4 mt-5">
                  <FaExclamationCircle className="text-white mr-1.5 text-2xl min-w-fit" />
                  <p className="text-white text-base font-semibold ">
                    {errMessage}
                  </p>
                </div>
              )}
              <div className="px-8 md:px-5 mt-5 sm:mx-auto sm:w-full sm:max-w-sm ">
                <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                  <div>
                    <div className=" mb-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Date of Birth *
                      </label>
                      <div className="mt-1">
                        <input
                          type="date"
                          className="block w-full rounded-xl border py-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2"
                          onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Gender *
                      </label>
                      <div className="mt-1">
                        {/* <input
                          type="gender"
                          placeholder="Gender"
                          className="block w-full rounded-xl border py-3 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 p-2 sm:text-sm sm:leading-6"
                          onChange={(e) => setGender(e.target.value)}
                        /> */}
                        <select
                          value={gender}
                          onChange={handleChange}
                          className="block w-1/2 rounded-xl border py-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2"
                        >
                          {options.map((option) => (
                            <option value={option} className="">{option}</option>
                          ))}
                        </select>
                        <p>{gender}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between gap-4">
                        <label
                          htmlFor="text"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City *
                        </label>
                      </div>
                      <div className="mt-1">
                        <input
                          type="text"
                          placeholder="Where do you live?"
                          className="block w-full rounded-xl border py-3 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 p-2 sm:text-sm sm:leading-6"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-xl bg-blue-500 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Create
                    </button>
                  </div>
                </form>
                <div className="flex flex-col justify-center w-full ">
                  <div className="inline-flex items-center justify-center w-full">
                    <hr className="md:w-96 w-full h-px my-8 bg-gray-200 border-0" />
                    <span className="absolute px-3 font-medium text-gray-500 -translate-x-1/2 bg-white left-1/2">
                      or
                    </span>
                  </div>
                  <div className="flex justify-center">
                    <GoogleLogin
                      onSuccess={(credRes) => {
                        axiosInstance
                          .post("/auth/google", credRes)
                          .then((res) => {
                            if (res?.data) {
                              toast.success(res.data.message);

                              setTimeout(() => {
                                navigate(`/createuserinfo/${res.data.newUser._id}`);
                              }, 1000);
                            }
                          })
                          .catch((err) =>
                            console.log(err, "axios catch err google signup")
                          );
                      }}
                      onError={() => {
                        console.log("ggogle login failed");
                      }}
                      type="standard"
                      theme="filled_blue"
                      size="large"
                      text="continue_with"
                      shape="square"
                      logo_alignment="center"
                      ux_mode="popup"
                    />
                  </div>
                </div>

                <p className="mt-5 text-center text-sm text-gray-500 mb-5">
                  Allready have an account?{" "}
                  <Link to="/login">
                    <a
                      href="#"
                      className="font-semibold leading-6 text-blue-500 hover:text-blue-600"
                    >
                      Login now
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
};

export default CreateUserInfoPage;
