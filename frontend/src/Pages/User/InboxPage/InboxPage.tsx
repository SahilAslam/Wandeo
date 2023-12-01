import React, { useState } from "react";
import Navbar from "../../../Components/User/Navbar/Navbar";
import HostingAndTravelingInbox from "../../../Components/User/Inbox/HostingAndTravelingInbox";
import DirectMessageInbox from "../../../Components/User/Inbox/DirectMessageInbox";

const InboxPage = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    "Hosting and Traveling"
  );

  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <>
      <Navbar />
      <div className="px-4 xl:px-36 py-5">
        <div className="bg-gradient-to-l from-slate-300 to-slate-200 px-4">
          <ul className="flex flex-row flex-wrap gap-x-14 gap-y-2 px-5 py-5 text-green-800 font-semibold">
            <li
              className={
                selectedMenuItem === "Hosting and Traveling"
                  ? "text-green-800 hover:text-slate-700 font-extrabold underline cursor-pointer"
                  : "text-slate-700 hover:text-green-800 cursor-pointer"
              }
              onClick={() => handleMenuItemClick("Hosting and Traveling")}
            >
              Hosting and Traveling
            </li>
            <li
              className={
                selectedMenuItem === "Direct Message"
                  ? "text-green-800 hover:text-slate-700 font-extrabold underline cursor-pointer"
                  : "text-slate-700 hover:text-green-800 cursor-pointer"
              }
              onClick={() => handleMenuItemClick("Direct Message")}
            >
              Direct Message
            </li>
          </ul>
        </div>
        {selectedMenuItem === "Hosting and Traveling" && (
          <HostingAndTravelingInbox />
        )}
        {selectedMenuItem === "Direct Message" && (
            <DirectMessageInbox />
        )}
      </div>
    </>
  );
};

export default InboxPage;
