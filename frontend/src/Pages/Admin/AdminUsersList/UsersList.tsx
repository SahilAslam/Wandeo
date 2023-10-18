import React from 'react'
import AdminNavbar from '../../../Components/Admin/AdminNavbar/AdminNavbar'
import UserTable from '../../../Components/Admin/UserTable/UserTable'

function UsersList() {
  return (
    <div className="h-screen bg-black text-white">
      <AdminNavbar />
      <div className="mt-5 px-2 lg:px-0">
        <div className="overflow-x-auto">
          <div className="max-w-screen-xl mx-auto">
            <div className="max-w-5/6 mx-auto">
              <UserTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersList