import { useState } from "react";
import AdminNavbar from "../../../Components/Admin/AdminNavbar/AdminNavbar";
import Sidebar from "../../../Components/Admin/Sidebar/Sidebar";
import UserTable from "../../../Components/Admin/UserTable/UserTable";
import { useNavigate } from "react-router-dom";

function UsersList() {
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <Sidebar open={open} setOpen={setOpen} />
        <div
          className={`flex-1 duration-700 ${open ? "md:ml-72" : "md:ml-20"}`}
        >
          <AdminNavbar />
          <div className="px-7 py-3 text-slate-700 font-extrabold shadow bg-white">
            Users Table
          </div>
          <div className="px-2 lg:px-5 mt-2">
            <div className="overflow-x-auto">
              <div className="max-w-screen-xl mx-auto">
                <div className="max-w-7xl mx-auto">
                  <UserTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersList;
