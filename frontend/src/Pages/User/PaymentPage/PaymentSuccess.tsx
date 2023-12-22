import React from 'react'
import Navbar from '../../../Components/User/Navbar/Navbar'
import { ToastContainer, toast } from 'react-toastify'
import { GiCheckMark } from "react-icons/gi";

const PaymentSuccess: React.FC = () => {
    toast.success("verification successfull")
  return (
    <>
        <Navbar />
        <ToastContainer />
        <div className='flex items-center justify-center py-24 '>
            <div className='bg-white rounded-lg w-96 h-64 flex flex-col items-center justify-center'>
                <div className='flex items-center justify-center'>
                    <GiCheckMark className='text-green-500 text-6xl p-2 rounded-full bg-green-100' /> 
                </div>
                <h1 className='text-green-500 text-3xl text-center'>Success</h1>      
                <p className='text-center py-5'>We received your payment</p>
            </div>
        </div>
    </>
  )
}

export default PaymentSuccess