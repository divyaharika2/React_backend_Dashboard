import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showFirm, setShowFirm] = useState(false)
  const [showProduct, setShowProduct] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [showLogOut, setShowLogOut] = useState(false)
  const [showFirmTitle, setShowFirmTitle] = useState(true)

  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken');
    if(loginToken){
      setShowLogOut(true)
      setShowWelcome(true)
    }
  }, [])

  useEffect(()=>{
       const firmName = localStorage.getItem('firmName');
      const firmId = localStorage.getItem('firmId')
      if(firmName || firmId ){
        setShowFirmTitle(false)
        setShowWelcome(true)
    }
  },[])

  const logOutHandler =()=>{
    if (confirm("Are you sure you want to logout?")) {
  localStorage.removeItem("loginToken");
  localStorage.removeItem("firmId");
  localStorage.removeItem("firmName");
  setShowLogOut(false);
  setShowFirmTitle(true);
  setShowWelcome(false)
}


  }

  const showLoginHandler = () =>{
    setShowLogin(true)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false) 
    setShowWelcome(false)
    setShowAllProducts(false)
  }
  const showRegisterHandler = () =>{
    setShowRegister(true)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false) 
    setShowWelcome(false)
   setShowAllProducts(false)
  }
  const showFirmHandler = () =>{
    if(showLogOut){
    setShowFirm(true)
    setShowLogin(false)
    setShowRegister(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
       
    }else{
      alert("please login")
      setShowLogin(true)
    }
  }
  const showProductHandler = () =>{
    if(showLogOut){
    setShowProduct(true)
    setShowFirm(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }else{
      alert("please login")
      setShowLogin(true)
    }
  }
  const showWelcomeHandler = () =>{
    setShowWelcome(true)
    setShowProduct(false)
    setShowFirm(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowAllProducts(false)
  }

  const showAllProductsHandler = () =>{
    if(showLogOut){
    setShowProduct(false)
    setShowFirm(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowWelcome(false)
    setShowAllProducts(true)
    }else{
      alert("please login")
      setShowLogin(true)
    }
  }

  return (
    <>
      <section className='landingSection'>
        <Navbar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler}
        showLogOut ={showLogOut}
        logOutHandler={logOutHandler}/>

        <div className="collectionSection">
          <Sidebar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} 
          showAllProductsHandler = {showAllProductsHandler}
          showFirmTitle = {showFirmTitle} />

          {showFirm && showLogOut && <AddFirm />}
          {showProduct && showLogOut && <AddProduct />}
          {showWelcome && <Welcome />}
          {showAllProducts && showLogOut && <AllProducts />}
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler = {showLoginHandler} />}
        </div>
      </section>
    </>
  )
}

export default LandingPage
