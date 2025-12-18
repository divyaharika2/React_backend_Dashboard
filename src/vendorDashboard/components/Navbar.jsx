import React from 'react'

const Navbar = ({ showLoginHandler, showRegisterHandler, showLogOut, logOutHandler, onMenuClick }) => {

  const firmName = localStorage.getItem('firmName')

  return (
    <div className="navSection">

      {/* THREE DOTS (mobile/tablet only) */}
      <button className="threeDots" onClick={onMenuClick}>⋮</button>


      <div className="company">
        Vendor Dashboard
      </div>

      <div className="Firmname">
        <h4> Restaurant Name : {firmName} </h4>
      </div>

      <div className="userAuth">
        {!showLogOut ? (
          <>
            <span onClick={showLoginHandler}>Login</span>
            <span>/</span>
            <span onClick={showRegisterHandler}>Register</span>
          </>
        ) : (
          <span onClick={logOutHandler} className="logout">
            Logout
          </span>
        )}
      </div>

    </div>
  );

}

export default Navbar