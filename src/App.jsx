import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Authentication from "./pages/Login-Signup/Authentication";
import Footer from "./components/Footer/Footer";
import SidePanel from "./components/SidePanel/SidePanel";
import Chart from "./components/MoodChart/Chart"
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([])

  const handleSave = (note) => {
    setNotes([...notes, note])
  }


  return (
    <div className="container">
      <Router>
        <SidePanel note={notes}/>
        <div className="main-content">
          <Navbar />
          <div className="Routes">
            <Routes >
              <Route index element={<Home onSave={handleSave} />} />
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
