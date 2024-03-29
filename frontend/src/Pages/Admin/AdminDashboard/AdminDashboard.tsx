import { useEffect, useState } from "react";
import AdminNavbar from "../../../Components/Admin/AdminNavbar/AdminNavbar";
import { FaUsers } from "react-icons/fa";
import adminInstance from "../../../Axios/adminInstance";
import LineChart from "../../../Components/Admin/Charts/LineChart";
import Sidebar from "../../../Components/Admin/Sidebar/Sidebar";
import { MdVerified } from "react-icons/md";
import { LiaUsersSolid } from "react-icons/lia";
import { MdEventNote } from "react-icons/md";


export const AdminDashboard = () => {
  const [usersCount, setUsersCount] = useState<number | null>(null);
  const [userMonthlyData, setUserMonthlyData] = useState<number[]>([]);
  const [verifiedUser, setVerifiedUser] = useState<number | null>(null);
  const [verifiedMonthlyData, setVerifiedMonthlyData] = useState<number[]>([]);
  const [events, setEvent] = useState<number | null>(null);
  const [groups, setGroups] = useState<number | null>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    adminInstance
      .get("/")
      .then((response) => {
        if (response.data) {
          setUsersCount(response.data?.totalUsers);
          setUserMonthlyData(response.data?.userMonthlyCounts);
          setVerifiedUser(response.data?.totalVerifiedUsers)
          setVerifiedMonthlyData(response.data?.verifiedMonthlyCounts);
          setEvent(response.data?.eventsGoingOn);
          setGroups(response.data?.totalGroups);
          
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
          <div className={`flex-1 duration-700 ${open ? "md:ml-20 lg:ml-72" : "md:ml-20"}`}>
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
                    <h1 className="text-sm font-bold">Verifed Users</h1>
                    <h1 className="text-2xl font-bold">{verifiedUser}</h1>
                  </div>
                  <MdVerified className="text-3xl" />
                </div>

                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg h-40 border-l-4 border-white flex items-center justify-between px-4 cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out">
                  <div className="uppercase">
                    <h1 className="text-sm font-bold">Events Going on</h1>
                    <h1 className="text-2xl font-bold">{events}</h1>
                  </div>
                  <MdEventNote className="text-3xl" />
                </div>
                <div className="bg-gradient-to-r from-red-400 to-red-500 rounded-lg h-40 border-l-4 border-white flex items-center justify-between px-4 cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out">
                  <div className="uppercase">
                    <h1 className="text-sm font-bold">Total Groups</h1>
                    <h1 className="text-2xl font-bold">{groups}</h1>
                  </div>
                  <LiaUsersSolid className="text-3xl" />
                </div>
              </div>
              <div className="flex justify-center px-4 sm:px-6 md:px-8">
                <div className="bg-[#FBE9E7] rounded w-full lg:w-3/4 h-full my-10 p-5">
                  <LineChart userMonthlyData={userMonthlyData} verifiedMonthlyData={verifiedMonthlyData} />
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};
