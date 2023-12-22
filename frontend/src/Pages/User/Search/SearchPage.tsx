import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/User/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../../../Axios/Axios";

const SearchPage: React.FC = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || "";

  useEffect(() => {
    axiosInstance
      .get("/searchGroup")
      .then((res) => {
        if (res.data.message) {
          setGroups(res.data.groups);
          console.log(groups, "dddddddd");
        }
        if (res.data.error) {
          toast.error(res.data.error);
        }
      })
      .catch((err) => console.log(err, "axios listing err"));
  }, []);

  const filteredGroups = groups.filter((group) => {
    return group?.name?.toLowerCase().includes(searchQuery.toLocaleLowerCase());
  });
  console.log(filteredGroups);
  
  return (
    <>
      <Navbar />
      <ToastContainer />
      <div>
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => <p>{group.name}</p>)
        ) : (
          <div className="flex justify-center p-4 bg-blue-gray-50 mx-4">
            <p className="text-xl font-medium">None to show</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
