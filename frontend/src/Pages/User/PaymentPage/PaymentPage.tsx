import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Axios/Axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/Slice/userSlice";
import axios from "axios";
import { PaymentBaseUrl } from "../../../Api";
import Navbar from "../../../Components/User/Navbar/Navbar";
import { GoLock } from "react-icons/go";
import { RiCustomerServiceLine } from "react-icons/ri";
import { LuAlarmClock } from "react-icons/lu";

const PaymentPage: React.FC = () => {
  const [userDetails, setUserDetails] = useState<any>([]);

  const user = useSelector(selectUser) as any;
  const id = user?.id ? user?.id : user?.user?._id;

  useEffect(() => {
    axiosInstance
      .get(`/profile/${id}`)
      .then((res) => {
        if (res.data.user) {
          console.log(res.data.user);

          setUserDetails(res.data.user);
        } else {
          console.error("Invalid data received from the API:", res.data.user);
        }
      })
      .catch((error) => console.log(error, "user profile error"));
  }, [id]);

  const handleVerified = () => {
    axios
      .post(`${PaymentBaseUrl}/stripe/create-checkout-session`, {
        userId: id,
      })
      .then((res) => {
        console.log(res, "this is response");
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  return (
    <>
      <Navbar />
      <div className="pt-10">
        <div className="flex justify-center ">
          <div className="flex flex-col gap-8 text-slate-700 bg-white p-10 rounded-lg">
            <div>
              <h1 className="text-slate-700 text-4xl">Verification Benefits</h1>
            </div>
            <div className="flex flex-row items-center gap-8">
              <div>
                <GoLock className="border-2 border-green-500 rounded-full text-6xl p-2 text-green-500 bg-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">MORE TRUSTED</h1>
                <p className="max-w-xs">
                  Couchsurfing works because of real connections between real
                  people. Verification helps to confirm your identity.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-8">
              <div>
                <RiCustomerServiceLine className="border-2 border-green-500 rounded-full text-6xl p-2 text-green-500 bg-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">24/7 SUPPORT</h1>
                <p className="max-w-xs">
                  Our Trust and Safety team is available to you around the clock
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-8">
              <div>
                <LuAlarmClock className="border-2 border-green-500 rounded-full text-6xl p-2 text-green-500 bg-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">TAKES JUST A MINUTE</h1>
                <p className="max-w-xs">
                  You can Get Verified in less time than it takes to read this
                  page.
                </p>
              </div>
            </div>
            <div className="flex justify-center py-5">
              {userDetails?.verified === true ? (
                <p className="px-7  rounded-sm text-xl text-green-500 font-semibold underline hover:text-green-600">
                  You are allready a Verified Member
                </p>
                
              ) : (
                <button
                  className="px-7 py-4 bg-link-color rounded-sm text-white font-semibold hover:bg-link-dark"
                  onClick={() => handleVerified()}
                >
                  Verify with Credit Card
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
