import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import AddFirm from "../components/forms/AddFirm";
import AddProduct from "../components/forms/AddProduct";
import Welcome from "../components/Welcome";
import AllProducts from "../components/AllProducts";
import UserDetails from "../components/UserDetails";

const LandingPage = () => {
  const [view, setView] = useState("welcome");
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);

  /* ===============================
     INITIAL LOAD (SAFE CHECK)
  =============================== */
  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    const firmId = localStorage.getItem("firmId");
    const firmName = localStorage.getItem("firmName");

    if (loginToken) {
      setShowLogOut(true);

      // user has firm ONLY if both exist and valid
      if (firmId && firmName && firmName !== "undefined") {
        setShowFirmTitle(false);
        setView("product");
      } else {
        setShowFirmTitle(true);
        setView("welcome");
      }
    } else {
      setShowLogOut(false);
      setShowFirmTitle(true);
      setView("welcome");
    }
  }, []);

  /* ===============================
     LOGOUT
  =============================== */
  const logOutHandler = () => {
    const confirmLogout = window.confirm("Are you sure to logout?");
    if (!confirmLogout) return;

    localStorage.clear();
    setShowLogOut(false);
    setShowFirmTitle(true);
    setView("login");
  };

  /* ===============================
     VIEW HANDLERS
  =============================== */
  const showLoginHandler = () => setView("login");
  const showRegisterHandler = () => setView("register");

  // called AFTER successful login
  const showWelcomeHandler = () => {
    setShowLogOut(true);

    const firmId = localStorage.getItem("firmId");
    const firmName = localStorage.getItem("firmName");

    if (firmId && firmName && firmName !== "undefined") {
      setShowFirmTitle(false);
      setView("product");
    } else {
      setShowFirmTitle(true);
      setView("welcome");
    }
  };

  const showFirmHandler = () => {
    if (!showLogOut) return alert("Please login");
    setView("firm");
  };

  const showProductHandler = () => {
    if (!showLogOut) return alert("Please login");
    setView("product");
  };

  const showAllProductsHandler = () => {
    if (!showLogOut) return alert("Please login");
    setView("allProducts");
  };

  const showUserHandler = () => {
    if (!showLogOut) return alert("Please login");
    setView("user");
  };

  /* ===============================
     RENDER
  =============================== */
  return (
    <section className="landingSection">
      <NavBar
        showLoginHandler={showLoginHandler}
        showRegisterHandler={showRegisterHandler}
        showLogOut={showLogOut}
        logOutHandler={logOutHandler}
      />

      <div className="collectionSection">
        <SideBar
          showFirmHandler={showFirmHandler}
          showProductHandler={showProductHandler}
          showAllProductsHandler={showAllProductsHandler}
          showUserHandler={showUserHandler}
          showFirmTitle={showFirmTitle}
        />

        {view === "welcome" && <Welcome />}
        {view === "login" && <Login showWelcomeHandler={showWelcomeHandler} />}
        {view === "register" && <Register showLoginHandler={showLoginHandler} />}
        {view === "firm" && showLogOut && <AddFirm />}
        {view === "product" && showLogOut && <AddProduct />}
        {view === "allProducts" && showLogOut && <AllProducts />}
        {view === "user" && showLogOut && <UserDetails />}
      </div>
    </section>
  );
};

export default LandingPage;
