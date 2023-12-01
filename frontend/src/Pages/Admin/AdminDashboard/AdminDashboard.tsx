import { useEffect, useState } from "react";
import AdminNavbar from "../../../Components/Admin/AdminNavbar/AdminNavbar";
import { FaUsers, FaRegCalendarMinus } from "react-icons/fa";
import adminInstance from "../../../Axios/adminInstance";
import LineChart from "../../../Components/Admin/Charts/LineChart";
import Sidebar from "../../../Components/Admin/Sidebar/Sidebar";


export const AdminDashboard = () => {
  const [usersCount, setUsersCount] = useState<number | null>(null);
  const [userMonthlyData, setUserMonthlyData] = useState<number[]>([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    adminInstance
      .get("/")
      .then((response) => {
        if (response.data) {
          setUsersCount(response.data?.totalUsers);
          setUserMonthlyData(response.data?.userMonthlyCounts);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row">
        <Sidebar open={open} setOpen={setOpen} />
          <div className={`flex-1 duration-700 ${open ? "md:ml-72" : "md:ml-20"}`}>
            <AdminNavbar />
            <div className={`justify-center`} >
              <div className="px-7 py-3 text-slate-700 font-extrabold shadow bg-white">
                Dashboard
              </div>
              <div className="mt-5 px-4 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
                <div className="bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg h-40 border-l-4 border-white flex items-center justify-between px-4 cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out">
                  <div className="uppercase">
                    <h1 className="text-sm font-bold">Total Users</h1>
                    <h1 className="text-2xl font-bold">{usersCount}</h1>
                  </div>
                  <FaUsers className="text-3xl" />
                </div>
                <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg h-40 border-l-4 border-white flex items-center justify-between px-4 cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out">
                  <div className="uppercase">
                    <h1 className="text-sm font-bold">Total Users</h1>
                    <h1 className="text-2xl font-bold">10</h1>
                  </div>
                  <FaUsers className="text-3xl" />
                </div>

                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg h-40 border-l-4 border-white flex items-center justify-between px-4 cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out">
                  <div className="uppercase">
                    <h1 className="text-sm font-bold">Total Users</h1>
                    <h1 className="text-2xl font-bold">10</h1>
                  </div>
                  <FaUsers className="text-3xl" />
                </div>
                <div className="bg-gradient-to-r from-red-400 to-red-500 rounded-lg h-40 border-l-4 border-white flex items-center justify-between px-4 cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out">
                  <div className="uppercase">
                    <h1 className="text-sm font-bold">Total Users</h1>
                    <h1 className="text-2xl font-bold">{usersCount}</h1>
                  </div>
                  <FaUsers className="text-3xl" />
                </div>
              </div>
              <div className="flex justify-center px-4 sm:px-6 md:px-8">
                <div className="bg-[#FBE9E7] rounded w-full lg:w-3/4 h-full my-10 p-5">
                  <LineChart userMonthlyData={userMonthlyData} />
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};
