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

const FindUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const navigate = useNavigate();

  const location = useLocation();
  const searchQuery = location.state?.searchQuery || "";

  const user = useSelector(selectUser);
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
      <div className="py-3 px-3 flex flex-col md:flex-row justify-center items-center gap-4">
        <div className="w-full max-w-[750px] bg-white">
          <div className="border-b">
            <p className="px-5 py-3">55,914 members matchings</p>
          </div>
          {currentRecords && currentRecords.length > 0 ? (
            currentRecords.map((user) => (
              <div className="flex justify-between px-5 py-5">
                <div className="flex flex-row gap-2">
                  <div>
                    {user.profileImage ? (
                      <img
                        src={`${user?.profileImage}`}
                        alt="img"
                        onClick={() => handleClick(user._id)}
                        className="border rounded-full w-14 h-14"
                      />
                    ) : (
                      <img
                        src={`/profile-picture-placeholder.png`}
                        alt=""
                        onClick={() => handleClick(user._id)}
                        className="w-14 h-14 object-cover rounded-full opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h1>{user.name}</h1>
                    </div>
                    <div>
                      <p>
                        {user.address ? user.address : "address unspecified"}
                      </p>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                      <div className="flex items-center">
                        <RiDoubleQuotesL className="mr-1" />
                        <p>
                          {user?.references && user?.references.length > 0
                            ? user?.references.length > 1
                              ? `${user?.references.length}references`
                              : `${user?.references.length}reference`
                            : "0 reference"}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <ImUsers className="mr-1" />
                        <p>578 friends</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaGlobeAmericas className="mr-1" />
                      <p>{user?.languagesFluentIn ? (`speaks ${user?.languagesFluentIn}`) : "No language listed"}</p>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            ))
          ) : (
            <div>
              <p>No user found</p>
            </div>
          )}
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className="w-full max-w-[310px] bg-white">pc</div>
      </div>
    </>
  );
};

export default FindUsers;
