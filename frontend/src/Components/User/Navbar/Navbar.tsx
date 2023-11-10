import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/Slice/userSlice";
import { toast } from "react-toastify";
import "./Navbar.css";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isEventsPage = location.pathname === "/events";
  const isProfilePage = location.pathname === "/profile";
  const isGroupPage = location.pathname === "/groups";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logout Successfull");
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
    <nav className="bg-white shadow-md navbar">
      <div className="max-w-screen-xl flex flex-row items-center justify-between mx-2 xl:mx-28 py-1 pl-4">
        <div className="flex items-center">
          <a className="flex items-center">
            <img src="/Wandeo_logo_main.png" className="h-16" alt="Wandeo" />
            <span className="logo self-center text-2xl font-semibold whitespace-nowrap text-green-900"></span>
          </a>
          <div className="flex md:order-1 pl-10">
            <div className="search hidden md:block w-auto p-2 text-sm text-gray-900 border border-gray-300 rounded-l-lg bg-gray-50">
              Find Events
            </div>
            <div className="search relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border-y border-r border-gray-300 rounded-r-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search"
              />
            </div>
          </div>
        </div>
        <div className="flex">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="togglesearchbutton md:hidden text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 mr-1"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            className="togglesearchbutton inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
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
        <div
          className="search items-center justify-between hidden w-full md:flex md:w-auto md:order-2"
          id="navbar-search"
        >
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
          <ul className="flex flex-col md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link to="/">
                <a
                  className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${
                    isHomePage
                      ? "text-green-800 font-bold underline"
                      : "text-gray-900"
                  }`}
                  aria-current="page"
                >
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link to="/groups">
                <a
                  className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${
                    isGroupPage
                      ? "text-green-800 font-bold underline"
                      : "text-gray-900"
                  }`}
                >
                  Group
                </a>
              </Link>
            </li>
            <li>
              <Link to="/events">
                <a
                  className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${
                    isEventsPage
                      ? "text-green-800 font-bold underline"
                      : "text-gray-900"
                  }`}
                >
                  Events
                </a>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
              >
                Inbox
              </a>
            </li>
            <li>
              <Link to="/profile">
                <a
                  className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${
                    isProfilePage
                      ? "text-green-800 font-bold underline"
                      : "text-gray-900"
                  }`}
                >
                  Profile
                </a>
              </Link>
            </li>
            <div className="relative">
              <li>
                <a
                  onClick={() => setMenuOpen(!menuOpen)}
                  ref={ulRef}
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded cursor-pointer hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  Settings
                </a>
                {menuOpen && (
                  <div className="menus bg-white w-40 shadow-xl absolute xl:-left-1 md:-left-24">
                    <ul>
                      {Menus.map((menu, index) => (
                        <li
                          key={index}
                          className="p-2 cursor-pointer hover:bg-blue-100"
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
      {isNavOpen && (
        <div
          className="togglenavbardiv items-center justify-between w-full md:flex md:w-auto md:order-2"
          id="navbar-search"
        >
          <ul className="togglenavbar flex flex-col p-4 md:p-0 font-medium   rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <Link to="/">
                <a
                  className={`togglenavitem block py-2 pl-3 pr-4 md:ml-8 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${
                    isHomePage ? "bg-green-800 text-white" : "text-gray-900"
                  }`}
                  aria-current="page"
                >
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link to="/groups">
                <a
                  className={`togglenavitem block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${
                    isGroupPage ? "bg-green-800 text-white" : "text-gray-900"
                  }`}
                >
                  Group
                </a>
              </Link>
            </li>
            <li>
              <Link to="/events">
                <a
                  className={`togglenavitem block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${
                    isEventsPage ? "bg-green-800 text-white" : "text-gray-900"
                  }`}
                >
                  Events
                </a>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="togglenavitem block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Inbox
              </a>
            </li>
            <li>
              <Link to="/profile">
                <a
                  className={`togglenavitem block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${
                    isProfilePage ? "bg-green-800 text-white" : "text-gray-900"
                  }`}
                >
                  Profile
                </a>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="togglenavitem block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="togglenavitem block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                onClick={handleLogout}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
