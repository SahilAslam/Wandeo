import React from "react";
import { MdArrowDropDown  } from "react-icons/md";

interface UserDetailsProps {
  userDetails: any;
}

const UserDetailsCard: React.FC<UserDetailsProps> = ({ userDetails }) => {
  return (
    <>
      <div className="w-auto md:w-72 bg-white flex flex-col items-center justify-center shadow-lg">
        <div className="py-5 flex flex-col text-center border-b w-full">
          <h1 className="text-lg pb-2 text-slate-700 font-semibold capitalize">
            {userDetails?.name}
          </h1>
          <h1 className="text-base text-slate-700 font-normal capitalize">
            {userDetails?.address}
          </h1>
        </div>
        <div className="py-4">
          <h1 className="text-base text-slate-700 font-semibold capitalize">
            {userDetails?.hostingAvailability}
          </h1>
        </div>
      </div>
    </>
  );
};

export default UserDetailsCard;
