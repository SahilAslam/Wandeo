import React, { useState } from 'react'
import Sidebar from '../../../Components/Admin/Sidebar/Sidebar'
import AdminNavbar from '../../../Components/Admin/AdminNavbar/AdminNavbar';
import GroupTable from '../../../Components/Admin/Tables/GroupTable';

const AdminGroups = () => {
    const [open, setOpen] = useState(true);
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <Sidebar open={open} setOpen={setOpen} />
        <div
          className={`flex-1 duration-700 ${open ? "md:ml-72" : "md:ml-20"}`}
        >
          <AdminNavbar />
          <div className="px-7 py-3 text-slate-700 font-extrabold shadow bg-white">
            Groups Table
          </div>
          <div className="px-2 lg:px-5 mt-2">
            <div className="overflow-x-auto">
              <div className="max-w-screen-xl mx-auto">
                <div className="max-w-7xl mx-auto">
                  <GroupTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminGroups