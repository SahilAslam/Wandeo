import React, { useEffect, useRef } from "react";
import Navbar from "../../../Components/User/Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import { GiCheckMark } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../Axios/Axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/Slice/userSlice";

const PaymentSuccess: React.FC = () => {
  const user = useSelector(selectUser) as any;
  const id = user?.id ? user?.id : user?.user?._id;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get("success");
  const navigate = useNavigate();
  const axiosCalled = useRef(false);

  useEffect(() => {
    if (!axiosCalled.current && success === "true") {
      axiosInstance
        .post(`/payment/getVerified/${id}`)
        .then((response) => {
          if (response?.data?.message === "Verified successfully") {
            toast.success("Verification successful");
          }
        })
        .catch((error) => {
          console.log("error", error);
        });

        axiosCalled.current = true;
    }
  }, [success, id]);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="flex items-center justify-center px-4 py-24 ">
        <div className="bg-white rounded-lg w-full md:w-[30rem] h-80 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <GiCheckMark className="text-green-500 text-8xl p-2 rounded-full bg-green-100" />
          </div>
          <h1 className="text-green-500 text-5xl text-center">Success</h1>
          <p className="text-center text-xl py-7">We received your payment</p>
          <button className="bg-green-800 text-white hover:bg-green-700 rounded py-1 px-2" onClick={() => navigate('/')}>Return home</button>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
