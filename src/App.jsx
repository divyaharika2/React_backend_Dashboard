import React from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage'
import "./App.css"
import "./UserDetails.css"
import "./Navbar.css"
import "./Sidebar.css"
import "./LoginRegisterForms.css"
import "./AddingFP.css"
import { Routes, Route } from 'react-router-dom'
import NotFound from './vendorDashboard/components/forms/NotFound'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
