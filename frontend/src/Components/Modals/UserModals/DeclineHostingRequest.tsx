import React from 'react'
import { IoMdClose } from "react-icons/io";
import axiosInstance from '../../../Axios/Axios';

interface DeclineRequestProps {
    visible: boolean;
    closeModal: () => void;
    userName: any;
    setUpdateUI: (data: any) => void;
    id: any;
}

const DeclineHostingRequest: React.FC<DeclineRequestProps> = ({
    visible,
    closeModal,
    userName,
    setUpdateUI,
    id,
  }) => {

    const declineRequest = async () => {
      const res = await axiosInstance.post(`/sendresponse/${id}`, {
        response: "Declined Request",
        updationMessage: "Declined"
      });
      if (res.data) {
        setUpdateUI((prev: boolean) => !prev);
      }
    }
  return (
    <>
      {visible && (
        <div
          className="px-4 flex justify-center pt-40 fixed z-50 top-0 left-0 inset-0 bg-[#131313] bg-opacity-30 backdrop-blur-sm w-full"
          id="wrapper"
        >
          <div className="rounded-lg bg-white h-fit w-full sm:max-w-sm">
            <div className='flex justify-between items-center px-5 py-4 rounded-t-lg bg-slate-100'>  
              <p className='font-semibold text-slate-700'>DECLINE ACCEPTANCE</p>
              <IoMdClose className='text-xl' onClick={closeModal} />
            </div>
            <div className='px-5 h-32 flex items-center'>
              <p className='text-center'>Are you sure you want to decline your acceptance to host {userName}?</p>
            </div>
            <div className='flex gap-2 justify-center py-4 bg-slate-100 rounded-b-lg'>
              <button onClick={declineRequest} className='bg-link-color text-white rounded px-2 py-1'>Yes, Decline Acceptance</button>
              <button onClick={closeModal} className='bg-slate-400 rounded px-6 py-2 text-white'>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DeclineHostingRequest