import React, { useEffect, useState } from 'react'
import Pagination from '../../Pagination/Pagination'
import { ToastContainer, toast } from 'react-toastify'
import adminInstance from '../../../Axios/adminInstance';

const GroupTable = () => {
    const [groups, setGroups] = useState([]);
    const [searchInput, setSearchInput] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

    useEffect(() => {
        adminInstance
            .get('/getGroups')
            .then((response) => {
                setGroups(response.data?.groups)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

  const blockGroup = (groupId: string) => {
    adminInstance
      .patch(`/blockGroup/${groupId}`)
      .then((res) => {
        if (res.data.message) {
          toast.success(res.data.message);

          setGroups((groups: any) =>
            groups.map((group: any) => {
              if (group._id === groupId) {
                return { ...group, isBlocked: true };
              }
              return group;
            })
          );
        }

        if (res.data.error) {
          toast.error(res.data.error);
        }
      })
      .catch((err) => console.log(err, "verify user block axios err"));
  };

  const unBlockGroup = (groupId: string) => {
    adminInstance
      .patch(`/unblockGroup/${groupId}`)
      .then((res) => {
        if (res.data.message) {
          toast.success(res.data.message);

          setGroups((groups: any) =>
            groups.map((group: any) => {
              if (group._id === groupId) {
                return { ...group, isBlocked: false };
              }
              return group;
            })
          );
        }

        if (res.data.error) {
          toast.error(res.data.error);
        }
      })
      .catch((err) => console.log(err, "verify user block axios err"));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
  
    const response = await adminInstance.get("/usersList");
    if (response.data.users) {
      setGroups(response.data.users);
      
      const filteredGroups = groups.filter((group) => {
        return group?.name?.toLowerCase().includes(searchInput.toLowerCase())
      });
    
      setGroups(filteredGroups);
      
    } else {
      console.error("No users found");
    }
  
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = groups.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const nPages = Math.ceil(groups.length / recordsPerPage);

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
                  Group Name
                </th>
                <th scope="col" className="px-6 py-3  bg-gray-50 ">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Members
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords ? (
                currentRecords.map((group, index) => (
                  <tr className="border-b border-gray-200 ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{group?.name}</td>
                    <td className="px-6 py-4  bg-gray-50 ">{group?.description}</td>
                    <td className="px-6 py-4">{group.members.length > 0 ? group.members.length : 0}</td>
                    <td className="px-6 py-4  bg-gray-50 ">
                      {!group?.isBlocked ? (
                        <button
                          onClick={() => blockGroup(group?._id)}
                          type="button"
                          className={
                            "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 font-medium rounded-lg text-sm px-7 py-2.5 text-center mr-2 mb-2"
                          }
                        >
                          Block
                        </button>
                      ) : (
                        <button
                          onClick={() => unBlockGroup(group?._id)}
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
  )
}

export default GroupTable