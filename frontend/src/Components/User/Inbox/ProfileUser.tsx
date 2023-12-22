import React from "react";
import { useNavigate } from "react-router-dom";

interface ProfileUserProps {
  userData: any;
  id: any;
}

const ProfileUser: React.FC<ProfileUserProps> = ({ userData, id }) => {
  const navigate = useNavigate();

  const calculateAge = (birthdate: Date) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();

    // Check if the user's birthday has occurred this year
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }

    return age;
  };

  // Extract the date of birth from user data
  const dateOfBirth = userData?.dateOfBirth;
  // Calculate the age
  const age = dateOfBirth ? calculateAge(new Date(dateOfBirth)) : undefined;

  const handleClick = (userId: string) => {
    if (id === userId) {
      navigate("/profile");
    } else {
      navigate(`/DiffProfile/${userId}`);
    }
  };

  return (
    <>
      <div className="w-auto md:w-80 bg-white flex items-center justify-center ">
        <div className="w-auto px-6 flex flex-col">
          <div className="pt-10 flex items-center justify-center">
            {userData?.profileImage ? (
              <img
                src={`${userData?.profileImage}`}
                alt="profile img"
                onClick={() => handleClick(userData?._id)}
                className="w-56 h-56 object-cover rounded-full cursor-pointer"
              />
            ) : (
              <img
                src={`https://cdn-icons-png.flaticon.com/512/3177/3177440.png`}
                onClick={() => handleClick(userData?._id)}
                className="w-56 h-56 object-cover rounded-full opacity-70 cursor-pointer"
              />
            )}
          </div>
          <div className="text-center py-2 pb-8">
            <h1 className="text-3xl text-slate-700 font-normal capitalize cursor-pointer" onClick={() => handleClick(userData?._id)}>
              {userData?.name}
            </h1>
            {userData.address && (
              <p className="text-link-color">{userData?.address}</p>
            )}
          </div>
          <div className="w-auto sm:w-96 md:w-auto py-6 border-t flex flex-col">
            <div className="pb-5">
              <p className="text-link-color text-xs pb-2">
                {userData?.references ? (
                  <span>
                    {userData.references.length}{" "}
                    {userData.references.length > 1
                      ? "references"
                      : "reference"}
                  </span>
                ) : (
                  <span>0 references</span>
                )}
              </p>
              <p className="text-link-color text-xs">
                {userData?.friends ? (
                  <span>
                    {userData.friends.length}{" "}
                    {userData.friends.length > 1 ? "friends" : "friend"}
                  </span>
                ) : (
                  <span>0 friends</span>
                )}
              </p>
            </div>
            <div className="flex flex-col gap-5">
              {age && userData?.gender && (
                <p className="text-slate-700 font-semibold text-xs">
                  {age}, {userData.gender}
                </p>
              )}
              {userData.address && (
                <p className="text-slate-700 text-xs">
                  <span className="text-slate-400">From:</span>{" "}
                  {userData?.address}
                </p>
              )}
              {userData.languagesFluentIn && (
                <p className="text-slate-700 text-xs">
                <span className="text-slate-400">Fluent in:</span>{" "}
                {userData?.languagesFluentIn}
              </p>
              )}
                <p className="text-slate-700 text-xs">
                    <span className="text-slate-400">Learning:</span>{" "}
                    {userData?.languagesLearning ? userData?.languagesLearning : ""}
                </p>
                <p className="text-slate-700 text-xs">
                    <span className="text-slate-400">Occupation:</span>{" "}
                    {userData?.occupation ? userData?.occupation : ""}
                </p>
                <p className="text-slate-700 text-xs">
                    <span className="text-slate-400">Education:</span>{" "}
                    {userData?.education ? userData?.education : ""}
                </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUser;
