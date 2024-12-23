import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProblemsSolutions from "./Components/ProblemsSolutions/ProblemsSolutions"; // Make sure the path is correct
import Sidebar from "./Components/Sidebar/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Ensure you import Routes
import "./App.css"; // Import the CSS for layout
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
            <Route path="/sample-problems" element={<ProblemsSolutions />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
