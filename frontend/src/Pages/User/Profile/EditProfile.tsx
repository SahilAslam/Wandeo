import React from "react";
import SignupNavbar from "../../../Components/User/Navbar/Navbar";
import ProfileCard from "../../../Components/User/Profile/ProfileCard";

interface EditProfileProps {
    userDetails: any;
}

const EditProfile: React.FC<EditProfileProps> = ({ userDetails }) => {
  return (
    <>
      <SignupNavbar />
        <div className="w-full ">
          <div className="pt-2 px-4 lg:px-32">
            <div className="flex flex-col md:flex-row gap-2">
              <div>
                <ProfileCard userDetails={userDetails} />
              </div>
              <div className="w-full flex flex-col gap-2 bg-white">

              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default EditProfile;
