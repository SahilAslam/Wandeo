import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../Axios/Axios";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const userEmail = localStorage.getItem("useremail");
  console.log(userEmail, "ll");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedPassword = password.trim();
    const trimmedMatchPassword = matchPassword.trim();
    if (trimmedPassword === "" || trimmedMatchPassword === "") {
      setErrorMessage("Please fill in all required fields!");
      toast.error("Please fill in all required fields.");
      return;
    }
    if (trimmedMatchPassword !== trimmedPassword) {
      setErrorMessage("Password doesn't match");
      return;
    }
    try {
      await axiosInstance.post("/newpassword", {
        email: userEmail,
        password: trimmedPassword,
      });
      setTimeout(() => {
        toast.success("Saved new password")
      }, 0)
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("User is blocked or please correct password");
    }
  };

  return (
    <div className="flex  min-h-full flex-1 flex-col py-12 h-screen ">
      <div className="flex px-4 xl:justify-center w-full">
        <div className="bg-white shadow-xl w-full xl:w-[1260px]">
          <div className="bg-slate-100 px-5 py-4">
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Reset Password
            </h2>
          </div>
          <div className="sm:mx-auto sm:w-full">
            <form className="" onSubmit={(e) => handleSubmit(e)}>
              <div className="px-5 pt-5 pb-4 flex flex-col ">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-base font-semibold leading-6 text-gray-800"
                  >
                    New Password
                  </label>
                </div>
                <div className="mt-2 w-full max-w-[850px] xl:w-[850px]">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 p-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="px-5 pb-5 flex flex-col ">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-base font-semibold leading-6 text-gray-800"
                  >
                    Re-enter Password
                  </label>
                </div>
                <div className="mt-2 w-full max-w-[850px] xl:w-[850px]">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 p-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setMatchPassword(e.target.value)}
                  />
                </div>
                {errorMessage && 
                  <div className="pt-4 ">
                    <p className="text-red-500 font-semibold bg-red-100 px-2 py-2 ">{errorMessage}</p>
                  </div>
                }
              </div>
              <div className="px-5 py-5 bg-slate-100">
                <button
                  type="submit"
                  className="flex justify-center rounded-md bg-link-color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
