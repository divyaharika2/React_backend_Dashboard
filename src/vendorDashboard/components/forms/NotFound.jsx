import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';


const NotFound = ()=> {
  return (
    <>
     <div className='errorSection'>
      <Link to="/">
      <FaArrowLeft style={{ marginRight: '8px' }} />
    <p>go back</p>
    </Link>
      <h1>404</h1>
      <div>Page Not Found</div>
    </div>
    </>

  )
}

export default NotFound
