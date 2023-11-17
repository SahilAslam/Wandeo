import React from "react";
import { ImUsers } from "react-icons/im";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../../Redux/Slice/userSlice";

interface MembersCardProps {
  groupData: any;
  BASE_URL: any;
}

const MembersCard: React.FC<MembersCardProps> = ({ groupData, BASE_URL }) => {

  const user = useSelector(selectUser);
  const id = user?.id ? user?.id : user?.user?._id;

  const navigate = useNavigate();

  const handleClick = (userId: string) => {
    if(id === userId) {
      navigate("/profile")
    } else {
      navigate(`/DiffProfile/${userId}`)
    }
  }

  return (
    <div className="w-full sm:w-[320px] bg-white shadow-lg">
      <div className="px-5 pt-3 flex">
        <ImUsers className="text-sm text-slate-800 mt-0.5 mr-1" />
        <h1 className="text-sm font-semibold">MEMBERS</h1>
      </div>
      <div>
        <div key={groupData?._id} className="flex gap-4 px-5 py-4">
          {groupData?.members?.length > 0 ? (
            groupData?.members?.map((member: any) => (
              <div>
                {member.profileImage ? (
                  <img
                    src={`${member?.profileImage}`}
                    alt="img"
                    onClick={() => handleClick(member._id)}
                    className="border rounded-full w-8 h-8"
                  />
                ) : (
                  <img
                    src={`/profile-picture-placeholder.png`}
                    alt=""
                    onClick={() => handleClick(member._id)}
                    className="w-8 h-8 object-cover rounded-full opacity-100"
                  />
                )}
              </div>
            ))
          ) : (
            <p>No active members</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembersCard;
