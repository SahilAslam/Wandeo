import { useState, useEffect } from 'react'
import adminInstance from '../../../Axios/adminInstance'
import { toast, ToastContainer } from 'react-toastify'
import './UserTable.css'


function UserTable() {
  const [userDetails, setUserDetails] = useState([])

  useEffect(() => {
    adminInstance
      .get("/usersList")
      .then((response) => {
        console.log(response.data);
        if(response.data.users) {
          setUserDetails(response.data.users)
        } else {
          console.error("No users found");            
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message)
      })         
  }, [])

  const blockUser = (userId : string) => {
    adminInstance.patch(`/blockUser/${userId}`).then((res) => {
      if(res.data.message) {
        toast.success(res.data.message)

        setUserDetails((userDetails: any) => userDetails.map((user: any) => {
          if(user._id === userId ){
            return {...user , isBlocked : true}
          }
          return user;
        }))
      }

      if(res.data.error) {
        toast.error(res.data.error)
      }
    }).catch((err) => console.log(err , 'verify user block axios err')
    )   
  }

  const unBlockUser = (userId : string) => {
    adminInstance.patch(`/unblockUser/${userId}`).then((res) => {
      if(res.data.message) {
        toast.success(res.data.message)

        setUserDetails((userDetails: any) => userDetails.map((user: any) => {
          if(user._id === userId ){
            return {...user , isBlocked : false}
          }
          return user;
        }))
      }

      if(res.data.error) {
        toast.error(res.data.error)
      }
    }).catch((err) => console.log(err , 'verify user block axios err')
    )
  }

  return (
    <>
      <ToastContainer/>
      <div className='overflow-x-auto shadow-md sm:rounded-lg mb-5'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 '>
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                 No.
              </th>
              <th scope="col" className="px-6 py-3">
                 Name
              </th>
              <th scope="col" className="px-6 py-3  bg-gray-50 dark:bg-gray-800">
                  Username
              </th>
              <th scope="col" className="px-6 py-3 ">
                  Email
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userDetails.map((user, index) =>(
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  {index + 1}
                </th>
                <td className="px-6 py-4">
                    {user.name}
                </td>
                <td className="px-6 py-4  bg-gray-50 dark:bg-gray-800">
                    {user.username}
                </td>
                <td className="px-6 py-4">
                    {user.email}
                </td>
                <td className="px-6 py-4  bg-gray-50 dark:bg-gray-800">
                {!user.isBlocked ? (
                    <button onClick={() => blockUser(user._id) } type="button" className={"text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 font-medium rounded-lg text-sm px-7 py-2.5 text-center mr-2 mb-2"}>
                      Block
                    </button>
                ) : (
                    <button onClick={() => unBlockUser(user._id)} 
                    className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        UnBlock 
                    </button>
                )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </>
  )
}

export default UserTable