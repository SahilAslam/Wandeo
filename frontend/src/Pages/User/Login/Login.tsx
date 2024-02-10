import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { UserBaseUrl } from "../../../Api";
import { useDispatch } from "react-redux";
import { login } from "../../../Redux/Slice/userSlice";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axiosInstance from "../../../Axios/Axios";
import { FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import SignupNavbar from "../../../Components/User/SignupNavbar/SignupNavbar";


function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedEmailOrUsername = emailOrUsername.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmailOrUsername === "" || trimmedPassword === "") {
      setErrMessage("Please fill in all fields!");

      setTimeout(() => {
        setErrMessage("");
      }, 3000);
      return;
    }

    try {
      const response = await axios.post(`${UserBaseUrl}/login`, {
        emailOrUsername: trimmedEmailOrUsername,
        password: trimmedPassword,
      });

      const userData = response.data;

      if (userData.isBlocked) {
        console.log(userData.isBlocked, "user is blocked");

        toast.error("Your account is blocked. Please contact support.");
      } else {
        localStorage.setItem("token", JSON.stringify(response.data.token));

        dispatch(login(response.data));

        navigate("/");    
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === "User is blocked"
      ) {
        setErrMessage("Your account is blocked. Please contact support.");
        setTimeout(() => {
          setErrMessage("");
        }, 3000)
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <SignupNavbar />
      <ToastContainer />
      <GoogleOAuthProvider clientId="307319234489-tjsu09c3qicatftagifvbbugpv9cnr3o.apps.googleusercontent.com">
        <div className="login flex min-h-full flex-1 flex-col justify-center px-4 sm:px-6 py-12 lg:px-8 items-center h-screen">
          <div className="w-full max-w-sm sm:w-full sm:max-w-sm">
            <div className="bg-white shadow-xl rounded-lg">
              <div className="pt-7">
                <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Log in to your account
                </h2>
              </div>
              {errMessage && (
                <div className="bg-gradient-to-r from-red-500  to-red-600 flex items-center justify-center px-2 py-4 mt-5">
                  <FaExclamationCircle className="text-white mr-1.5 text-2xl min-w-fit" />
                  <p className="text-white text-base font-semibold ">
                    {errMessage}
                  </p>
                </div>
              )}
              <div className="p-7 px-6 sm:px-12 sm:mx-auto sm:w-full sm:max-w-sm ">
                <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                  <div className="">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email *
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        autoComplete="email"
                        placeholder="mail@sample"
                        className="block w-full rounded-xl border py-3 text-gray-900 shadow-sm  placeholder:text-gray-400 p-2 sm:text-sm sm:leading-6"
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password *
                      </label>
                      <div className="text-sm">
                        <a
                          onClick={() => navigate("/forget_password")}
                          className="font-semibold text-blue-500 hover:text-blue-600 cursor-pointer"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <div className="mt-2 relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Min. 8 characters"
                        className="block w-full rounded-xl border py-3 text-gray-900 shadow-sm placeholder:text-gray-400 p-2 sm:text-sm sm:leading-6"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-xl bg-blue-500 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                            if (res?.data?.message) {
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

                <p className="mt-8 text-center text-sm text-gray-500 mb-3">
                  Dont have an account?{" "}
                  <Link to="/signup">
                    <a
                      href="#"
                      className="font-semibold leading-6 text-blue-500 hover:text-blue-600"
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
