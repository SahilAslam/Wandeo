import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
// import { ModalProps } from "../../../Interfaces/ModalInterface";

interface ModalProps {
  visible: boolean;
  closeModal: () => void;
  LeaveEvent: () => void;
}

const LeaveEventModal: React.FC<ModalProps> = ({
  visible,
  closeModal,
  LeaveEvent,
}) => {
  const handleClick = () => {
    LeaveEvent();
    closeModal();
  };

  return (
    <>
      {visible && (
        <div
          className="px-4 flex justify-center pt-40 fixed z-50 top-0 left-0 inset-0 bg-[#131313] bg-opacity-30 backdrop-blur-sm w-full"
          id="wrapper"
        >
          <div className="rounded-lg bg-white h-fit w-full sm:max-w-sm">
            <div className="flex justify-between items-center py-5 px-5 rounded-t-lg bg-slate-100">
              <div className="flex items-center gap-1">
                <FaExclamationCircle className="text-slate-700 text-xl " />
                <h1 className="text-slate-700 text-xl font-semibold">
                  Leave Event
                </h1>
              </div>
              <IoMdClose
                className="text-slate-700 text-2xl"
                onClick={closeModal}
              />
            </div>
            <div className="px-5 py-10">
              <p className="text-center">
                Are you sure you want to Leave this Event?
              </p>
            </div>
            <div className="flex gap-2 justify-end px-5 py-5 bg-slate-100 rounded-b-lg">
              <button
                onClick={closeModal}
                className="bg-link-color rounded px-6 py-2 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleClick}
                className="bg-red-600 rounded px-2 py-2 text-white"
              >
                Leave Event
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeaveEventModal;
