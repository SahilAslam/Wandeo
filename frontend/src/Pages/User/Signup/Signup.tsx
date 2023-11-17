import React, { useState } from "react";
import "./Signup.css";
import axiosInstance from "../../../Axios/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isStrongPassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (
      trimmedName === "" ||
      trimmedUsername === "" ||
      trimmedEmail === "" ||
      trimmedPassword === ""
    ) {
      toast.error("Required all fields");
      return;
    }

    if (!isStrongPassword(password)) {
      toast.error("password Must be atleast 8 characters");
      return;
    }

    try {
      const response = await axiosInstance.post("/signup", {
        name: trimmedName,
        username: trimmedUsername,
        email: trimmedEmail,
        password: trimmedPassword,
      });
      console.log(response);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setTimeout(() => {
      navigate("/login");
    }, 2000);
    toast.success("Registered Successfull");
  };

  return (
    <>
      <ToastContainer />
      <GoogleOAuthProvider clientId="307319234489-tjsu09c3qicatftagifvbbugpv9cnr3o.apps.googleusercontent.com">
        <div className="signup flex min-h-full flex-1 flex-col justify-center px-6 md:py-12 lg:px-8 items-center h-screen">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="bg-white md:text-opacity-100 px-8 md:px-12 py-7 shadow-xl rounded-lg">
              <div>
                <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign Up
                </h2>
              </div>
              <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm ">
                <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                  <div>
                    <div className="flex flex-col mb-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Fullname
                      </label>
                      <div className="mt-1">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Fullname"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-2"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor=""
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Username
                      </label>
                      <div className="mt-1">
                        <input
                          id="username"
                          name="username"
                          type="text"
                          placeholder="Username"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 p-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 p-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between gap-4">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Password
                        </label>
                        <div className="text-sm">
                          <a
                            href="#"
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                          >
                            Forgot password?
                          </a>
                        </div>
                      </div>
                      <div className="mt-1">
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
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
                <div className="flex flex-col justify-center w-full ">
                  <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-64 h-px my-8 bg-gray-200 border-0" />
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
                                navigate("/login");
                              }, 3000);
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
                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
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
}

export default Signup;
