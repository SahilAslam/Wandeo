import React from 'react'
import { ToastContainer } from 'react-toastify';
import { TiWarning } from "react-icons/ti";

interface DeleteGroupProps {
    visible: boolean;
    closeModal: () => void;
    deleteGroup: () => void;
}

const DeleteGroupModal: React.FC<DeleteGroupProps> = ({
    visible,
    closeModal,
    deleteGroup,
  }) => {

  return (
    <>
      {visible && (
        <div
          className="px-4 flex justify-center pt-40 fixed z-50 top-0 left-0 inset-0 bg-[#131313] bg-opacity-30 backdrop-blur-sm w-full"
          id="wrapper"
        >
          <div className="rounded-lg bg-white h-fit w-full sm:max-w-sm">
            <div className='flex justify-center pt-10'>
                <TiWarning className="text-red-600 text-6xl" />  
            </div>
            <div className='px-5 pt-5 pb-10'>
                <p className='text-center'>Are you sure you want to delete this group, once deleted you can't take it back</p>
            </div>
            <div className='flex gap-4 justify-center pb-10'>
                <button onClick={closeModal} className='bg-link-color rounded px-6 py-2 text-white'>Cancel</button>
                <button onClick={deleteGroup} className='bg-red-600 rounded px-2 py-2 text-white'>Delete Group</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DeleteGroupModal