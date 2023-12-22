import React from "react";
import { useNavigate } from "react-router-dom";
import { SlOptions } from "react-icons/sl";
import { MdVerified } from "react-icons/md";

interface ProfileCardProps {
  userDetails: any;
  id: any;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  userDetails,
  id,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-auto md:w-80 bg-white flex items-center justify-center ">
        <div className="w-auto px-12 flex flex-col">
          <div className="pt-10 flex justify-center">
            {userDetails?.profileImage ? (
              <img
                src={`${userDetails?.profileImage}`}
                alt="profile img"
                className="w-56 h-56 object-cover rounded-full"
              />
            ) : (
              <img
                src={`https://cdn-icons-png.flaticon.com/512/3177/3177440.png`}
                alt=""
                className="w-56 h-56 object-cover rounded-full opacity-70"
              />
            )}
          </div>
          <div className="text-center ">
            <h1 className="text-4xl py-2 pb-8 font-normal capitalize">
              {userDetails?.name}
            </h1>
          </div>
          <div className="w-auto sm:w-96 md:w-auto py-6 border-t flex flex-col">
            {id !== userDetails?._id ? (
              userDetails?.verified === true && userDetails?.phone ? (
                <h1 className="text-xl font-medium py-2 text-slate-700">
                  Verified Profile
                </h1>
              ) : (
                <h1 className="text-xl font-medium py-2 text-slate-700">
                  Unverified Profile
                </h1>
              )
            ) : (
              userDetails?.verified === true && userDetails?.phone ? (
                <h1 className="text-xl font-medium py-2 text-slate-700">
                  Profile Verified
                </h1>
              ) : (
                <h1 className="text-xl font-medium py-2 text-slate-700">
                  Profile not Verified
                </h1>
              )
            )}
            {userDetails?.verified === true ? (
              <div className="flex items-center gap-2">
                <MdVerified className="text-green-500" />
                <p className="py-1 text-green-500">Payment Verified</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <SlOptions className="text-white bg-slate-400 rounded-xl p-0.5" />
                <p className="py-1 text-slate-400">Payment not Verified</p>
              </div>
            )}
            {userDetails?.phone ? (
              <div className="flex items-center gap-2">
                <MdVerified className="text-green-500" />
                <p className="py-1 text-green-500">Phone Mentioned</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <SlOptions className="text-white bg-slate-400 rounded-xl p-0.5" />
                <p className="py-1 text-slate-400">Phone not Mentioned</p>
              </div>
            )}
            {userDetails?.verified === false && id === userDetails?._id && (
              <div>
                <div className="flex items-center justify-center">
                  <button
                    className="bg-green-600 text-white px-6 py-2 rounded-sm mt-5"
                    onClick={() => navigate("/payment")}
                  >
                    Upgrade to Verify Profile
                  </button>
                </div>
                <p className="text-xs text-center py-2 font-normal">
                  Verified members find hosts faster
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
