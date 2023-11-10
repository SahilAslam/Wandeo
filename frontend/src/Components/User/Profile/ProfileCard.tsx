import React from "react";

interface ProfileCardProps {
  userDetails: any;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userDetails }) => {
  const baseUrl =
    "https://res.cloudinary.com/dkba47utw/image/upload/v1698223651";

  return (
    <>
      <div className="w-auto md:w-80 bg-white flex items-center justify-center ">
        <div className="w-auto px-6 flex flex-col">
          <div className="pt-10 flex items-center justify-center">
            {userDetails?.profileImage ? (
              <img
                src={`${baseUrl}/${userDetails?.profileImage}`}
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
            <h1 className="text-xl font-medium py-2 ">Profile not Verified</h1>
            <p className="py-1">Payment not Verified</p>
            <p className="py-1">Phone not Verified</p>
            <p className="py-1">Government ID not verified</p>
            <div className="flex items-center justify-center">
              <button className="bg-green-600 text-white px-6 py-2 rounded-sm mt-5">
                Upgrade to Verify Profile
              </button>
            </div>
            <p className="text-xs text-center py-2 font-normal">
              Verified members find hosts faster
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
