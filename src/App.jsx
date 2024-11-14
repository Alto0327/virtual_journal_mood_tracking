import React, { useRef } from "react"
import './App.css'
import { BrowserRouter as Router,Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Navbar from "./components/Navbar/Navbar"
import Authentication from "./pages/Login-Signup/Authentication"
import Footer from "./components/Footer/Footer"


function App() {


  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route index element ={<Home/>}/>
        <Route path="init" element={<Authentication/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App