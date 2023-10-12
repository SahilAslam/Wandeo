import React, { useState } from "react";
import "./Signup.css";
import axiosInstance from "../../../Axios/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

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
    navigate("/login");
  };

  return (
    <div className="signup ">
      <div className="flex justify-center items-center">
        <div className=" bg-white w-1/4 h-80 mt-24 rounded-lg flex justify-center items-center">
          <div className="">
            <div className="text-xl text-center font-semibold mb-8">
              <h4>Sign Up Faster With</h4>
            </div>
            <div className="flex flex-col">
              <div className="border border-black w-72 h-10 rounded-sm">
                <p className="text-sm font-medium text-center mt-1">
                  Continue with Google
                </p>
              </div>

              <p className="text-sm font-medium text-center mt-1">
                We Care About Your Privacy.
              </p>
            </div>
          </div>
        </div>
        <form
          className="bg-white w-1/4 align-middle mt-24 rounded-lg ml-40"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <div className="text-xl text-center font-semibold mt-4">
              <h4>Sign Up</h4>
            </div>

            <div className="flex space-x-1 m-4 justify-center">
              <div className="flex flex-col">
                <ToastContainer />
                <label>Fullname</label>
                <input
                  className="border border-black sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-36 p-2 mr-2"
                  type="text"
                  placeholder="Fullname"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Username</label>
                <input
                  className="border border-black sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-36 p-2"
                  type="text"
                  placeholder="Username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex justify-center flex-col m-4 ">
                <label htmlFor="email">Email</label>
                <input
                  className="border border-black sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-72 p-2"
                  type="email"
                  autoComplete="email"
                  placeholder="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex flex-col m-4">
                <label htmlFor="">Password</label>
                <input
                  className="border border-black sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-72 p-2"
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="flex w-24 mb-8 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="submit"
              >
                Join
              </button>
            </div>
          </div>
        </form>
      </div>
      <p className="mt-10 text-center text-sm text-gray-500 mb-10">
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

    

  );
}

export default Signup;
