import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./AdminNavbar.css";
import { logout } from "../../../Redux/Slice/adminSlice";

function AdminNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const location = useLocation();
  const isDashboard = location.pathname === "/admin/dashboard";
  const isUsers = location.pathname === "/admin/usersList";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
   
    setTimeout(() => {
      toast.success("Logout Successfull");
    }, )
    navigate("/admin/login");
  };

  const ulRef = useRef<HTMLAnchorElement | null>(null); // Specify the correct type for ulRef
  const menuRef = useRef<HTMLLIElement | null>(null); // Specify the correct type for menuRef

  const Menus = ["Account & status", "Logout"];

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== ulRef.current) {
      setMenuOpen(false);
    }
  });

  return (
    <>
      <ToastContainer />
      <nav className="bg-slate-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center">
            <img src="" className="h-8 mr-3" alt="" />
            <span className="self-center text-red-600 text-2xl font-bold whitespace-nowrap">
              Admin
            </span>
          </a>
          <div className="flex md:order-1">
           
            <button
              data-collapse-toggle="navbar-search"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-search"
              aria-expanded={isNavOpen}
              onClick={toggleNav}
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          {isNavOpen && (
            <div
              className="items-center justify-between w-full md:flex md:w-auto md:order-2"
              id="navbar-search"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
                <li>
                  <Link to="/admin/dashboard">
                    <a
                      className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${
                        isDashboard
                          ? "bg-red-600 text-white"
                          : "text-gray-900 md:hover:text-red-600"
                      }`}
                      aria-current="page"
                    >
                      Dashboard
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/usersList">
                    <a
                      className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${
                        isUsers
                          ? "bg-red-600 text-white"
                          : "text-gray-900 md:hover:text-red-600"
                      }`}
                      aria-current="page"
                    >
                      Users
                    </a>
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 md:p-0"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-2"
            id="navbar-search"
          >
            <ul className="flex flex-col md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:">
              <li>
                <Link to="/admin/dashboard">
                  <a
                    className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${
                      isDashboard ? "text-red-600 font-bold md:hover:text-blue-700" : "text-blue-700 md:hover:text-red-600"
                    }`}
                    aria-current="page"
                  >
                    Dashboard
                  </a>
                </Link>
              </li>
              <li>
                <Link to="/admin/usersList">
                  <a
                    className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${
                      isUsers ? "text-red-600 font-bold md:hover:text-blue-700" : "text-blue-700 md:hover:text-red-600"
                    }`}
                    aria-current="page"
                  >
                    Users
                  </a>
                </Link>
              </li>
              <div className="relative">
                <li>
                  <a
                    onClick={() => setMenuOpen(!menuOpen)}
                    ref={ulRef}
                    className="block py-2 pl-3 pr-4 text-blue-700 rounded cursor-pointer hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 md:p-0"
                  >
                    Settings
                  </a>
                  {menuOpen && (
                    <div className="bg-white w-40 shadow-xl absolute -left-1">
                      <ul>
                        {Menus.map((menu, index) => (
                          <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-blue-100 text-black"
                          >
                            {menu === "Logout" ? (
                              <button onClick={handleLogout}>{menu}</button>
                            ) : (
                              <span>{menu}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminNavbar;
