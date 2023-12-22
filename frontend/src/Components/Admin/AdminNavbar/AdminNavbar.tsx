import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminNavbar.css";
import { logout, selectAdmin } from "../../../Redux/Slice/adminSlice";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";

interface Admin {
  username?: string;
  adminCred?: {
    username?: string;
    // Add other properties of adminCred if needed
  };
}

function AdminNavbar() {
  // const [isNavOpen, setIsNavOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const admin = useSelector(selectAdmin) as Admin;
  const adminUsername = admin?.username
    ? admin.username
    : admin.adminCred?.username;

  // const toggleNav = () => {
  //   setIsNavOpen(!isNavOpen);
  // };

  // const location = useLocation();
  // const isDashboard = location.pathname === "/admin/dashboard";
  // const isUsers = location.pathname === "/admin/usersList";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    setTimeout(() => {
      toast.success("Logout Successfull");
    });
    navigate("/admin/login");
  };

  const ulRef = useRef<HTMLAnchorElement | null>(null); // Specify the correct type for ulRef
  const menuRef = useRef<HTMLLIElement | null>(null); // Specify the correct type for menuRef

  const Menus = ["Logout"];

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== ulRef.current) {
      setMenuOpen(false);
    }
  });

  return (
    <>
      <ToastContainer />
      <nav className="bg-blue-900">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto  h-full ">
          <div className="px-7 flex items-center">
            <div className="rounded-full bg-slate-200 p-1">
              <RiAdminLine className="text-2xl text-blue-900 " />
            </div>
            <h1 className="text-white text-xl font-semibold">Admin Panel</h1>
          </div>
          <div className="relative">
            <a className="flex items-center cursor-pointer bg-green-900 py-3 px-4 ">
              <span
                className="self-center text-white text-xl font-bold whitespace-nowrap"
                onClick={() => setMenuOpen(!menuOpen)}
                ref={ulRef}
              >
                {adminUsername}
              </span>
              <MdOutlineKeyboardArrowDown className="text-white ml-1"  />
            </a>
            {menuOpen && (
              <div className="bg-red-600  rounded-lg border border-slate-300  shadow-xl absolute right-4 z-50">
                <ul>
                  {Menus.map((menu, index) => (
                    <li
                      key={index}
                      className="px-4 py-1 cursor-pointer text-black"
                    >
                      {menu === "Logout" ? (
                        <button className="hover:underline text-white font-bold" onClick={handleLogout}>{menu}</button>
                      ) : (
                        <span>{menu}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminNavbar;
