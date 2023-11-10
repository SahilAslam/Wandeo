import React from 'react'
import { MdArrowRight,  } from "react-icons/md";

interface UserGroupProps {
    userDetails: any
}

const UserGroupCard: React.FC<UserGroupProps> = ({ userDetails }) => {
  return (
    <>
    <div className='w-auto md:w-72 bg-white flex flex-col justify-center shadow-lg'>
        <div className="py-5 px-4 border-b">
          <h1 className="text-lg text-slate-700 font-semibold uppercase">
            My groups 
          </h1>
        </div>
        <div className='px-4 py-5'>
            <h1 className='py-2'>Students</h1>
            <h1>Photography</h1>
        </div>
        <div className='flex justify-center items-center py-5'>
            <h1 className='capitalize font-medium text-sky-800'>See more groups</h1>
            <MdArrowRight className="text-sky-800 text-2xl mt-1 " />
        </div>
    </div>
    
    </>
  )
}

export default UserGroupCard