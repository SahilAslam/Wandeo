import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Axios/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import SignupNavbar from "../../../Components/User/SignupNavbar/SignupNavbar";

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [passwordStrength , SetPasswordstrength] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      navigate("/");
    }
  }, [navigate]);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkPasswordStrength = (password: string) => {
    const passwordRequirements = {
      minLength: 7,
      requireUpperCase: true,
      requireLowerCase: true,
      requireNumbers: true,
      requireSpecialChars: true,
    };

    // Regular expressions for character classes
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numbersRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

    let strength = 0;

    if (password.length >= passwordRequirements.minLength) {
      strength++;
    }

    if (
      passwordRequirements.requireUpperCase &&
      uppercaseRegex.test(password) &&
      password.length >= passwordRequirements.minLength
    ) {
      strength++;
    }

    if (
      passwordRequirements.requireLowerCase &&
      lowercaseRegex.test(password) &&
      password.length >= passwordRequirements.minLength
    ) {
      strength++;
    }

    if (
      passwordRequirements.requireNumbers &&
      numbersRegex.test(password) &&
      password.length >= passwordRequirements.minLength
    ) {
      strength++;
    }

    if (
      passwordRequirements.requireSpecialChars &&
      specialCharRegex.test(password) &&
      password.length >= passwordRequirements.minLength
    ) {
      strength++;
    }

    if (strength < 2) {
      return "Weak";
    } else if (strength < 4) {
      return "Moderate";
    } else {
      return "Strong";
    }
  };

  const handlePasswordChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const strength = checkPasswordStrength(newPassword);
    SetPasswordstrength(strength);
  }

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
      setErrMessage("Required all fields");
      setTimeout(() => {
        setErrMessage("");
      }, 3000);
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setErrMessage("Please enter a valid email address");
      setTimeout(() => {
        setErrMessage("");
      }, 3000);
      return;
    }

    if (passwordStrength === "Weak") {
      setErrMessage("Please choose a strong password");
      setTimeout(() => {
        setErrMessage("");
      }, 3000);
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
      setTimeout(() => {
        toast.success("Registered Successfull");
      }, 0);
      navigate(`/createuserinfo/${response.data._id}`);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleShow = () => {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <SignupNavbar />
      <ToastContainer />
      <GoogleOAuthProvider clientId="307319234489-tjsu09c3qicatftagifvbbugpv9cnr3o.apps.googleusercontent.com">
        <div className="signup flex min-h-full flex-1 flex-col justify-center px-6 md:py-12  lg:px-8 items-center h-screen ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm  md:max-w-md">
            <div className="bg-white md:text-opacity-100 py-7 shadow-xl rounded-lg ">
              <div>
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
                  Sign Up
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
              <div className="px-8 md:px-5 mt-5 sm:mx-auto sm:w-full sm:max-w-sm ">
                <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                  <div>
                    <div className="flex  flex-col sm:flex-row gap-2">
                      <div className="flex flex-col mb-3">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Fullname *
                        </label>
                        <div className="mt-1">
                          <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Fullname"
                            className="block w-full rounded-xl border py-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ps-2"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Username *
                        </label>
                        <div className="mt-1">
                          <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="name_123"
                            className="block w-full rounded-xl border py-3 text-gray-900 shadow-sm placeholder:text-gray-400 p-2 sm:text-sm sm:leading-6"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email *
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="text"
                          placeholder="mail@sample"
                          className="block w-full rounded-xl border py-3 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 p-2 sm:text-sm sm:leading-6"
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
                          Password *
                        </label>
                      </div>
                      <div className="mt-1 relative">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className=" block w-full rounded-xl border py-3 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 p-2 sm:text-sm sm:leading-6"
                          onChange={handlePasswordChange}
                        />
                        <div
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={handleShow}
                        >
                          {showPassword ? (
                            <FaEyeSlash className="text-gray-400" />
                          ) : (
                            <FaEye className="text-gray-400" />
                          )}
                        </div>
                      </div>
                      {passwordStrength && (
                        <div
                          className={`text-sm mt-2 ${
                            passwordStrength === "Strong"
                              ? "text-[#5dc43e]"
                              : passwordStrength === "Moderate"
                              ? "text-orange-500"
                              : "text-[#e84848]"
                          }`}
                        >
                          Password Strength: {passwordStrength}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-xl bg-blue-500 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign Up
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
                                navigate(
                                  `/createuserinfo/${res.data.newUser._id}`
                                );
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
}

export default Signup;
