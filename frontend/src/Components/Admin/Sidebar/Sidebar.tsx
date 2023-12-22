import React from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  setOpen: (data: boolean) => void;
  
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {

  const location = useLocation();

  const Menus = [
    { title: "Dashboard", path: "/admin/dashboard", src: "Chart_fill" },
    { title: "Users", path: "/admin/usersList", src: "User", gap: true },
    { title: "Groups", path: "/admin/groups", src: "Chat", gap: true },
    { title: "Events", path: "/admin/events", src: "Calendar", gap: true },
    { title: "Hosts", path: "/admin/hosts", src: "Chart", gap: true },
  ];

  return (
    <div
      className={` ${
        open ? "w-full md:w-72" : "w-full md:w-20 "
      } bg-dark-purple fixed bottom-0 md:min-h-screen px-5 pb-5 md:pb-0 md:p-5 md:pt-8 duration-300 z-50`}  
    >
      <img
        src="/control.png"
        className={`hidden md:block absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
              border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src="/Wandeologo.png"
          className={`hidden md:block w-10 cursor-pointer duration-500 ${
            open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={` text-white origin-left font-medium text-xl duration-200 ${
            !open ? "scale-0" : "scale-0 md:scale-100"
          }`}
        >
          Administration
        </h1>
      </div>
      <ul className="pt-6 hidden md:block">
        {Menus.map((Menu, index) => (
          <Link to={Menu.path}>
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-5" : "mt-2"} ${location.pathname === Menu.path ? "bg-light-white" : "bg-dark-purple"} `}
            >
              <img src={`/${Menu.src}.png`} />
              <span
                className={`${
                  !open ? "hidden" : "hidden md:block"
                } origin-left duration-200`}
              >
                {Menu.title}
              </span>
            </li>
          </Link>
        ))}
      </ul>
      
      <ul className="md:hidden flex justify-between">
        {Menus.map((Menu, index) => (
          <Link to={Menu.path}>
            <li
              key={index}
              className={`flex  rounded-md px-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "" : ""} ${location.pathname === Menu.path ? "bg-light-white" : ""} `}
            >
              <img src={`/${Menu.src}.png`} />
              <span
                className={`${
                  !open ? "hidden" : "hidden md:block"
                } origin-left duration-200`}
              >
                {Menu.title}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
