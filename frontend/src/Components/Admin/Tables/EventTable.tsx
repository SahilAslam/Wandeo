import React, { useEffect, useState } from "react";
import adminInstance from "../../../Axios/adminInstance";
import Pagination from "../../Pagination/Pagination";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import { IoSearch } from "react-icons/io5";

interface Event {
  _id: string;
  eventName: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  attendees: Array<any>;
  attendeesLimit: number;
}

const EventTable: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const [expandedDescriptionIndex, setExpandedDescriptionIndex] = useState(-1);

  useEffect(() => {
    adminInstance
      .get("/getEvents")
      .then((response) => {
        setEvents(response.data?.events);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchInput]);

  const handleSearch = async (
    e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    const response = await adminInstance.get("/getEvents");
    if (response.data?.events) {
      setEvents(response.data?.events);

      const filteredEvents = events.filter((event) => {
        return event?.eventName?.toLowerCase().includes(searchInput.toLowerCase());
      });

      setEvents(filteredEvents);
    } else {
      console.error("No users found");
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = events.slice(indexOfFirstRecord, indexOfLastRecord);

  const nPages = Math.ceil(events.length / recordsPerPage);

  const toggleDescriptionExpansion = (index: any) => {
    setExpandedDescriptionIndex(
      (prevIndex) => (prevIndex === index ? -1 : index)
    );
  };

  return (
    <>
      <ToastContainer />
      <div className="py-2 relative">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="border rounded-full pl-8 pr-2 py-2 w-full sm:w-3/4 md:w-72"
            placeholder="Search"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <IoSearch className="absolute top-1/2 left-3 transform -translate-y-1/2" />
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
                  Event Name
                </th>
                <th scope="col" className="px-6 py-3  bg-gray-50 ">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50">
                  Starting
                </th>
                <th scope="col" className="px-6 py-3">
                  Ending
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 ">
                  Joined
                </th>
                <th scope="col" className="px-6 py-3">
                  Limit
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords ? (
                currentRecords.map((event, index) => (
                  <tr className="border-b border-gray-200 ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{event?.eventName}</td>
                    <td className="px-6 py-4  bg-gray-50">
                      {expandedDescriptionIndex === index
                        ? event?.description
                            ?.split("\n")
                            .map((line, lineIndex) => (
                              <span key={lineIndex}>
                                {line}
                                <br />
                              </span>
                            ))
                        : event?.description
                            ?.slice(0, 200)
                            .split("\n")
                            .map((line, lineIndex) => (
                              <span key={lineIndex}>
                                {line}
                                <br />
                              </span>
                            ))}
                      {event?.description &&
                        event?.description?.length > 200 && (
                          <button
                            className="text-link-color font-medium cursor-pointer"
                            onClick={() => toggleDescriptionExpansion(index)}
                          >
                            {expandedDescriptionIndex === index
                              ? "Show Less"
                              : "Show More"}
                          </button>
                        )}
                    </td>
                    <td className="px-6 py-4">{event?.location}</td>
                    <td className="px-6 py-4 bg-gray-50 ">
                      {moment(event?.startDate).format("DD-MMM-Y")}
                    </td>
                    <td className="px-6 py-4">
                      {moment(event?.endDate).format("DD-MMM-Y")}
                    </td>
                    <td className="px-6 py-4 bg-gray-50">
                      {event?.attendees?.length > 0
                        ? event?.attendees.length
                        : 0}
                    </td>
                    <td className="px-6 py-4">{event?.attendeesLimit}</td>
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
};

export default EventTable;
