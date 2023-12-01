import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../Axios/Axios";

const OtpPassword = () => {
  const [otp, setOtp] = useState("");
  const [error] = useState("");
  const [timer, setTimer] = useState(60);

  const navigate = useNavigate();

  useEffect(() => {
    // Start the timer when the component mounts
    const countdown = setInterval(() => {
      // Decrement the timer by 1 second
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Redirect to '/signup' when the timer reaches 0
    if (timer === 0) {
      navigate("/login");
    }

    // Clean up the interval when the component unmounts
    return () => clearInterval(countdown);
  }, [timer, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/otp_verify", {
        otp,
      });

      // Check the response status and handle success or error accordingly
      if (response.status === 200) {
        toast.success("Signup successful");

        navigate("/new_password");
      } else {
        // If the response contains a data property with an error message, use it; otherwise, provide a generic error message
        const errorMessage =
          response.data && response.data.message
            ? response.data.message
            : "An error occurred";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("An error occurred while verifying OTP:", error);
      toast.error("An error occurred"); // Display a generic error message
    }
  };

  return (
    <>
      {/* <div>
        <form onSubmit={handleSubmit}>
          <label>Enter OTP</label>
          <input
            type="text"
            placeholder="Please enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button type="submit" className="w-100">
            Submit
          </button>
        </form>
        {error && <div className="mt-3">{error}</div>}
        <div className="mt-3">
          Redirecting to signup page in {timer} seconds...
        </div>
      </div> */}

      <div className="flex  min-h-full flex-1 flex-col py-12 h-screen ">
        <div className="flex px-4 xl:justify-center w-full">
          <div className="bg-white shadow-xl w-full xl:w-[1260px]">
            <div className="bg-slate-100 px-5 py-4">
              <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                We have sent an OTP to your email. Please enter that OTP to
                reset your Password.
              </h2>
            </div>
            <div className="sm:mx-auto sm:w-full">
              <form className="" onSubmit={handleSubmit}>
                <div className="px-5 pt-5 pb-4 flex flex-col ">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-base font-semibold leading-6 text-gray-800"
                    >
                      Enter OTP
                    </label>
                  </div>
                  <div className="mt-2 w-full max-w-[850px] xl:w-[850px]">
                    <input
                      type="text"
                      placeholder="Please enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 p-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {error && <div className="mt-3">{error}</div>}
              <div className="pb-4 px-5 text-link-color font-medium">
                Redirecting to Login page in {timer} seconds...
              </div>
                <div className="px-5 py-5 bg-slate-100">
                  <button
                    type="submit"
                    className="flex justify-center rounded-md bg-link-color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Submit
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

export default OtpPassword;
