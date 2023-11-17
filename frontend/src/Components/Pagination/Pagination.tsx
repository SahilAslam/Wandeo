import React from 'react'

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const goToNextPage = () => {
            if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const goToPrevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <nav className=" w-full px-4 py-4">
          <ul className="pagination justify-content-center flex justify-center text-slate-800">
            <li className="page-item w-full flex">
              <a
                className="page-link text-link-color"
                onClick={goToPrevPage}
                href="#"
              >
                Previous
              </a>
            </li>
            {/* {pageNumbers.map((pgNumber) => (
              <li
                key={pgNumber}
                className={`page-item ${
                  currentPage === pgNumber ? 'active' : ''
                } `}
              >
                <a
                  onClick={() => setCurrentPage(pgNumber)}
                  className="page-link"
                  href="#"
                >
                  {pgNumber}
                </a>
              </li>
            ))} */}
            <li className='w-full flex justify-center'>Page {currentPage} of {nPages}</li>        
            <li className="page-item flex justify-end w-full">
              <a
                className="page-link text-link-color"
                onClick={goToNextPage}
                href="#"
              >
                Next
              </a>
            </li>
          </ul>
          <p className="page-info">
            
          </p>
        </nav>
      );
}

export default Pagination