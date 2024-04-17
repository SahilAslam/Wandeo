import React from "react";
import { MdArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../Spinner/Spinner";

interface UserGroupProps {
  userDetails: any;
  isLoading: boolean;
}

const UserGroupCard: React.FC<UserGroupProps> = ({
  userDetails,
  isLoading,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-auto md:w-72 bg-white flex flex-col justify-center shadow-lg">
        <div className="py-5 px-4 border-b">
          <h1 className="text-lg text-slate-700 font-semibold uppercase">
            My groups
          </h1>
        </div>
        {isLoading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          userDetails?.groups &&
          userDetails?.groups.length > 0 && (
            <div className="px-4 py-5">
              {userDetails?.groups?.map((group: any, index: number) => (
                <h1
                  onClick={() => navigate(`/groupDetailedPage/${group?._id}`)}
                  className="py-2 cursor-pointer text-slate-700 hover:font-semibold hover:text-shadow shadow-black/10"
                  key={index}
                >
                  {group?.name}
                </h1>
              ))}
              {/* <h1>Photography</h1> */}
            </div>
          )
        )}
        <div className="py-5 flex justify-center">
          <h1
            onClick={() => navigate(`/allGroups`)}
            className="flex justify-center items-center w-fit  cursor-pointer capitalize font-bold text-link-color hover:text-link-dark hover:text-shadow shadow-sky-700/20"
          >
            See more groups
            <MdArrowRight className="font-bold text-link-color text-2xl mt-1 " />
          </h1>
        </div>
      </div>
    </>
  );
};

export default UserGroupCard;
