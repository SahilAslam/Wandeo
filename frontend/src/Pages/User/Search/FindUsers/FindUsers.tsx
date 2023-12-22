import React, { useEffect, useState } from "react";
import Navbar from "../../../../Components/User/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../Axios/Axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../Redux/Slice/userSlice";
import Pagination from "../../../../Components/Pagination/Pagination";
import { RiDoubleQuotesL } from "react-icons/ri";
import { ImUsers } from "react-icons/im";
import { FaGlobeAmericas } from "react-icons/fa";
import moment from "moment";

const FindUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const navigate = useNavigate();

  const location = useLocation();
  const searchQuery = location.state?.searchQuery || "";

  const user = useSelector(selectUser) as any;
  const id = user?.id ? user?.id : user?.user?._id;

  const filteredUsers = users.filter((user) => {
    return user?.name?.toLowerCase().includes(searchQuery.toLocaleLowerCase());
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredUsers.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(filteredUsers.length / recordsPerPage);

  const handleClick = (userId: string) => {
    if (id === userId) {
      navigate("/profile");
    } else {
      navigate(`/DiffProfile/${userId}`);
    }
  };

  useEffect(() => {
    axiosInstance
      .get("/findUser")
      .then((response) => {
        if (response.data.users) {
          setUsers(response.data.users);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Navbar />
      <div className="py-3 px-3 flex flex-col md:flex-row justify-center gap-4">
        <div className="w-full max-w-[750px] bg-white">
          <div className="border-b">
            <p className="px-5 py-3 text-slate-400">{currentRecords ? currentRecords.length : "no"}{" "}users matchings</p>
          </div>
          {currentRecords && currentRecords.length > 0 ? (
            currentRecords.map((user) => (
              <div className="flex flex-col sm:flex-row justify-between px-5 py-7 border-b">
                <div className="flex flex-row gap-2 min-w-fit">
                  <div>
                    {user.profileImage ? (
                      <img
                        src={`${user?.profileImage}`}
                        alt="img"
                        onClick={() => handleClick(user._id)}
                        className="border rounded-full w-14 h-14 cursor-pointer"
                      />
                    ) : (
                      <img
                        src={`/profile-picture-placeholder.png`}
                        alt=""
                        onClick={() => handleClick(user._id)}
                        className="w-14 h-14 object-cover rounded-full opacity-100 cursor-pointer"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h1
                        className="text-slate-700 font-bold cursor-pointer"
                        onClick={() => handleClick(user._id)}
                      >
                        {user.name}
                      </h1>
                    </div>
                    <div>
                      <p className="text-slate-700">
                        {user.address ? user.address : "address unspecified"}
                      </p>
                    </div>
                    <div className="flex flex-row gap-1 items-center text-sm text-slate-400">
                      <div className="flex items-center">
                        <RiDoubleQuotesL className="mr-1" />
                        <p>
                          {user?.references && user?.references.length > 0
                            ? user?.references.length > 1
                              ? `${user?.references.length} references`
                              : `${user?.references.length} reference`
                            : "0 reference"}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <ImUsers className="mr-1" />
                        <p>
                          {user?.friends && user?.friends.length > 0
                            ? user?.friends.length > 1
                              ? `${user?.friends.length} friends`
                              : `${user?.friends.length} friends`
                            : "0 friends"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-slate-400">
                      <FaGlobeAmericas className="mr-1" />
                      <p>
                        {user?.languagesFluentIn
                          ? `speaks ${user?.languagesFluentIn}`
                          : "No language listed"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col text-center sm:text-end">
                  <div className="">
                    <h1
                      className={`text-xl font-semibold ${
                        user?.hostingAvailability === "Accepting Guests"
                          ? "text-green-500"
                          : user?.hostingAvailability === "Not Accepting Guests"
                          ? "text-red-600"
                          : "text-slate-700"
                      }`}
                    >
                      {user.hostingAvailability
                        ? user.hostingAvailability
                        : "Not updated"}
                    </h1>
                  </div>
                  {user?.isLoggin ? (
                    <p className="text-sm pt-4 text-green-500">
                      {user?.isLoggin}
                    </p>
                  ) : (
                    <p className="text-sm pt-4 text-slate-400">
                      Last login {moment(user.lastLogin).fromNow()}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-slate-100 p-5 text-center text-slate-400">
              <p>No users found matching your search.</p>
            </div>
          )}
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        {/* <div className="w-full max-w-[310px] bg-white">pc</div> */}
      </div>
    </>
  );
};

export default FindUsers;
