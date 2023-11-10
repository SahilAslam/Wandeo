import React from "react";
import { ImUsers } from "react-icons/im";

interface MembersCardProps {
  groupData: any;
  BASE_URL: any;
}

const MembersCard: React.FC<MembersCardProps> = ({ groupData, BASE_URL }) => {
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
                    src={`${BASE_URL}/${member?.profileImage}`}
                    alt="img"
                    className="border rounded-full w-8 h-8"
                  />
                ) : (
                  <img
                    src={`/profile-picture-placeholder.png`}
                    alt=""
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
