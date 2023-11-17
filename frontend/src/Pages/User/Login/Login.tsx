import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { UserBaseUrl } from "../../../Api";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, login } from "../../../Redux/Slice/userSlice";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axiosInstance from "../../../Axios/Axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail === "" || trimmedPassword === "") {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const response = await axios.post(`${UserBaseUrl}/login`, {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      const userData = response.data;

      if (userData.isBlocked) {
        console.log(userData.isBlocked, "user is blocked");

        toast.error("Your account is blocked. Please contact support.");
      } else {
        localStorage.setItem("token", JSON.stringify(response.data.token));

        dispatch(login(response.data));

        setTimeout(() => {
          navigate("/");
        }, 2000);
        toast.success("Logged In successfull");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === "User is blocked"
      ) {
        toast.error("Your account is blocked. Please contact support.");
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <GoogleOAuthProvider clientId="307319234489-tjsu09c3qicatftagifvbbugpv9cnr3o.apps.googleusercontent.com">
        <div className="login flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 items-center h-screen">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="bg-white p-7 pl-12 pr-12 shadow-xl rounded-lg">
              <div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Log in to your account
                </h2>
              </div>
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                  <div className="">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 p-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-semibold text-indigo-600 hover:text-indigo-500 "
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 p-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mb-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Log In
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
                          .post("/googleLogin", credRes)
                          .then((res) => {
                            console.log("//////////////////");
                            if (res?.data?.message) {
                              console.log(res.data.message, "response.....");
                              dispatch(login(res.data.userData));
                              localStorage.setItem(
                                "token",
                                JSON.stringify(res.data.usertoken)
                              );
                              toast.success(res.data.message);
                              setTimeout(() => {
                                navigate("/");
                              }, 3000);
                            } else if (res.data.error) {
                              toast.error(res.data.error);
                            }
                          })
                          .catch((err) =>
                            console.log(err, "axios catch err g login")
                          );
                      }}
                      onError={() => {
                        console.log("login failed");
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

                <p className="mt-10 text-center text-sm text-gray-500 mb-10">
                  Dont have an account?{" "}
                  <Link to="/signup">
                    <a
                      href="#"
                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      Register now
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

export default Login;
