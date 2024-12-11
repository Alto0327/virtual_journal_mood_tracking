import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Authentication from "./pages/Login-Signup/Authentication";
import Footer from "./components/Footer/Footer";
import SidePanel from "./components/SidePanel/SidePanel";
import Chart from "./components/MoodChart/Chart"

function App() {
  const [ curEntry, setCurEntry] = useState(null)


  return (
    <div className="container">
      <Router>
        <SidePanel curEntry={curEntry} setCurEntry={setCurEntry}/>
        <div className="main-content">
          <Navbar />
          <div className="Routes">
            <Routes >
              <Route index element={<Main curEntry={curEntry}/>} />
              <Route path="chart" element={<Chart/>} />
              <Route path="init" element={<Authentication />} />
          </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
