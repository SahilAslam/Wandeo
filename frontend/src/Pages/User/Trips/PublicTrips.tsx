import React from "react";
import Navbar from "../../../Components/User/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const PublicTrips = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="px-4 md:px-6 lg:px-8 xl:px-40 py-3 flex flex-col md:flex-row gap-3">
        <div className="order-2 md:order-1 w-full">
          <div className="bg-white w-full">
            <div className="px-5 py-4 border-b">
              <h1 className="text-lg text-slate-800 font-semibold">
                PUBLIC TRIPS
              </h1>
            </div>
            <p className="p-4">You have no active public trips.</p>
          </div>
        </div>
        <div className="order-1 w-full md:w-fit">
          <div className="bg-white w-full md:w-80">
            <h1 className="text-base text-slate-800 font-semibold px-4 pt-4">
              CREATE A PUBLIC TRIP
            </h1>
            <div className="px-4 py-4">
              <button
                className="bg-green-800 text-white px-4 py-2 font-semibold rounded w-full"
                onClick={() => navigate("/createPublicTrip")}
              >
                New Public Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicTrips;
