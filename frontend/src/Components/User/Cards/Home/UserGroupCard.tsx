import React from 'react'
import { MdArrowRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

interface UserGroupProps {
    userDetails: any
}

const UserGroupCard: React.FC<UserGroupProps> = ({ userDetails }) => {
  const navigate = useNavigate();

  return (
    <>
    <div className='w-auto md:w-72 bg-white flex flex-col justify-center shadow-lg'>
        <div className="py-5 px-4 border-b">
          <h1 className="text-lg text-slate-700 font-semibold uppercase">
            My groups 
          </h1>
        </div>
        <div className='px-4 py-5'>
          {userDetails?.groups?.map((group) => (
            <h1 onClick={()=>navigate(`/groupDetailedPage/${group?._id}`)} className='py-2 cursor-pointer'>
              {group?.name}
            </h1>
          ))}
            {/* <h1>Photography</h1> */}
        </div>
        <div className='flex justify-center items-center py-5 cursor-pointer'>
            <h1 onClick={() => navigate(`/allGroups`)} className='capitalize font-bold text-link-color'>See more groups</h1>
            <MdArrowRight className="font-bold text-link-color text-2xl mt-1 " />
        </div>
    </div>
    
    </>
  )
}

export default UserGroupCard