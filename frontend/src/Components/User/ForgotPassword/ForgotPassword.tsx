import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../../../Axios/Axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    localStorage.setItem("useremail", trimmedEmail);
    if (trimmedEmail === "") {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await axiosInstance.post("/forgotPassword", {
        email: trimmedEmail,
      });

      navigate("/user_forget_otp");
    } catch (error) {
      console.error(error);
      toast.error("User is blocked or please correct password");
    }
  };
  return (
    <>
      <ToastContainer />
      {/* <section className="w-full h-screen pt-12 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Forgot Password?
              </h2>
            </div>

            <div className="ml-6">
              {message ? (
                <p style={{ color: "#dc2626", fontWeight: "bold" }}>
                  Password Reset Link send successfully in your mail
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="pb-10">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3  py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section> */}
      <div className="flex  min-h-full flex-1 flex-col py-12 h-screen ">
        <div className="flex px-4 xl:justify-center w-full">
          <div className="bg-white shadow-xl w-full xl:w-[1260px]">
            <div className="bg-slate-100 px-5 py-4">
              <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Forgot Password?
              </h2>
            </div>
            {message ? (
              <p style={{ color: "#dc2626", fontWeight: "bold" }}>
                Password Reset Link send successfully in your mail
              </p>
            ) : (
              ""
            )}
            <div className="sm:mx-auto sm:w-full">
              <form className="" onSubmit={(e) => handleSubmit(e)}>
                <div className="px-5 pt-5 pb-4 flex flex-col ">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-base font-semibold leading-6 text-gray-800"
                    >
                      Email
                    </label>
                  </div>
                  <div className="mt-2 w-full max-w-[850px] xl:w-[850px]">
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 p-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="block text-link-color text-sm font-semibold leading-6">
                      Make sure that you have entered correct email, we will be
                      senting verification message to this email.
                    </label>
                  </div>
                </div>

                {/* <div className="bg-black">
                  <p className="text-red-500 text-center">{errorMessage}</p>
                </div> */}
                <div className="px-5 py-5 bg-slate-100">
                  <button
                    type="submit"
                    className="flex justify-center rounded-md bg-link-color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sent me reset mail
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
