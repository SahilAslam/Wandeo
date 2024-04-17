import React from 'react'
import './spinner.css'

const Spinner = () => {
  return (
    <>
    <div className='flex justify-center items-center py-10 bg-white '>
      <svg className="spinner" >
        <circle
          className="path"
          cx="25"
          cy="25"
          r="10"
          fill="none"
          stroke-width="3"
        ></circle>
      </svg>
    </div>
    </>
  );
}

export default Spinner