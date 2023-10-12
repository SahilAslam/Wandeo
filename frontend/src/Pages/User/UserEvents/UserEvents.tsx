import SignupNavbar from '../../../Components/User/Navbar/Navbar'

function UserEvents() {
  return (  
    <>
      <SignupNavbar />
      <div className="mt-2 flex items-center justify-center flex-col">
        <div className="p-6 w-80 bg-white border bottom-2">
            <h1 className='font-semibold text-slate-800 text-lg'>Event I'm Organizing</h1>
        </div>
        <div className='p-5 w-80 bg-white border bottom-2'>
          <button className='bg-slate-700 text-white p-2 pl-14 pr-14 rounded-sm'>Create an Event</button>
        </div>
      </div>
    </>
  )
}

export default UserEvents