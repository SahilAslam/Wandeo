import { useState, useEffect } from "react";
import adminInstance from "../../../Axios/adminInstance";
import { toast, ToastContainer } from "react-toastify";
import "./UserTable.css";
import Pagination from "../../Pagination/Pagination";
import { useNavigate } from "react-router-dom";

function UserTable() {
  const [userDetails, setUserDetails] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const navigate = useNavigate();

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = userDetails.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const nPages = Math.ceil(userDetails.length / recordsPerPage);

  useEffect(() => {
    adminInstance
      .get("/usersList")
      .then((response) => {
        console.log(response.data);
        if (response.data.users) {
          setUserDetails(response.data.users);
        } else {
          console.error("No users found");
        }
      })
      .catch((error) => {
        if (error.message && error.message === "Network Error") {
          // Handle token expiration and redirect to the login page
          localStorage.removeItem("adminToken");
          navigate("/admin/login");
        } else {
          console.error(error);
          toast.error(error.message);
        }
      });
  }, [searchInput]);

  const blockUser = (userId: string) => {
    adminInstance
      .patch(`/blockUser/${userId}`)
      .then((res) => {
        if (res.data.message) {
          toast.success(res.data.message);

          setUserDetails((userDetails: any) =>
            userDetails.map((user: any) => {
              if (user._id === userId) {
                return { ...user, isBlocked: true };
              }
              return user;
            })
          );
        }

        if (res.data.error) {
          toast.error(res.data.error);
        }
      })
      .catch((err) => console.log(err, "verify user block axios err"));
  };

  const unBlockUser = (userId: string) => {
    adminInstance
      .patch(`/unblockUser/${userId}`)
      .then((res) => {
        if (res.data.message) {
          toast.success(res.data.message);

          setUserDetails((userDetails: any) =>
            userDetails.map((user: any) => {
              if (user._id === userId) {
                return { ...user, isBlocked: false };
              }
              return user;
            })
          );
        }

        if (res.data.error) {
          toast.error(res.data.error);
        }
      })
      .catch((err) => console.log(err, "verify user block axios err"));
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>) => {
    e.preventDefault();
  
    const response = await adminInstance.get("/usersList");
    if (response.data.users) {
      setUserDetails(response.data.users);
      
      const filteredUsers = userDetails.filter((user) => {
        return (
          user?.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
          user?.username?.toLowerCase().includes(searchInput.toLowerCase()) ||
          user?.address?.toLowerCase().includes(searchInput.toLowerCase())
        );
      });
    
      setUserDetails(filteredUsers);
    } else {
      console.error("No users found");
    }
  
  };


  return (
    <>
      <ToastContainer />
      <div className="py-2">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="border rounded-xl px-2 py-1"
            placeholder="Search"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
      </div>
      <div className="sm:rounded-lg bg-white mb-10 shadow-md ">
        <div className="overflow-x-auto sm:rounded-t-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 bg-gray-50 ">
                  No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3  bg-gray-50 ">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords ? (
                currentRecords.map((user, index) => (
                  <tr className="border-b border-gray-200 ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{user?.name}</td>
                    <td className="px-6 py-4  bg-gray-50 ">{user?.username}</td>
                    <td className="px-6 py-4">{user?.email}</td>
                    <td className="px-6 py-4  bg-gray-50 ">
                      {!user?.isBlocked ? (
                        <button
                          onClick={() => blockUser(user?._id)}
                          type="button"
                          className={
                            "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 font-medium rounded-lg text-sm px-7 py-2.5 text-center mr-2 mb-2"
                          }
                        >
                          Block
                        </button>
                      ) : (
                        <button
                          onClick={() => unBlockUser(user?._id)}
                          className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >
                          UnBlock
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <p className="px-5 py-5 text-center">No users found.</p>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}

export default UserTable;
