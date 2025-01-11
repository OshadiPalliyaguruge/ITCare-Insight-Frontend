// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProblemsSolutions from "./Components/ProblemsSolutions/ProblemsSolutions";
import Profile from "./Components/Profile/Profile"; // Import Profile component
import Report from "./Components/SecureEmbed/SecureEmbed"; // Import Report component
import Settings from "./Components/Settings/Settings"; // Import Settings component
import Sidebar from "./Components/Sidebar/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
 
  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard data={data} />} />
            <Route path="/Q&A" element={<ProblemsSolutions />} />
            <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}
            <Route path="/report" element={<Report />} /> {/* Add Report route */}
            <Route path="/settings" element={<Settings />} /> {/* Add Settings route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

