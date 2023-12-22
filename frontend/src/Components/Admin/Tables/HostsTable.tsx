import React, { useEffect, useState } from 'react'
import Pagination from '../../Pagination/Pagination'
import { ToastContainer } from 'react-toastify'
import adminInstance from '../../../Axios/adminInstance';

interface Host {
  userId: {
    name: string;
    address: string;
  };
  hostingAvailability: string; 
  isBlocked: boolean;
}

const HostsTable: React.FC = () => {
    const [hosts, setHosts] = useState<Host[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    adminInstance
      .get("/gethost")
      .then((response) => {
        setHosts(response.data?.hosts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchInput]);

  const handleSearch = async (
    e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    const response = await adminInstance.get("/gethost");
    if (response.data?.hosts) {
      setHosts(response.data?.hosts);

      const filteredHosts = hosts.filter((host) => {
        return host?.userId?.name?.toLowerCase().includes(searchInput.toLowerCase());
      });

      setHosts(filteredHosts);
    } else {
      console.error("No users found");
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = hosts.slice(indexOfFirstRecord, indexOfLastRecord);

  const nPages = Math.ceil(hosts.length / recordsPerPage);


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
                  Status
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords ? (
                currentRecords.map((hosts, index) => (
                  <tr className="border-b border-gray-200 ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{hosts?.userId?.name}</td>
                    <td className="px-6 py-4  bg-gray-50">
                        {hosts?.hostingAvailability}
                    </td>
                    <td className="px-6 py-4">
                      {hosts?.userId?.address}
                    </td>
                    <td className="px-6 py-4 bg-gray-50 ">
                    {!hosts?.isBlocked ? (
                        <button
                        //   onClick={() => blockUser(user?._id)}
                          type="button"
                          className={
                            "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 font-medium rounded-lg text-sm px-7 py-2.5 text-center mr-2 mb-2"
                          }
                        >
                          Block
                        </button>
                      ) : (
                        <button
                        //   onClick={() => unBlockUser(user?._id)}
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

export default HostsTable