// // src/App.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Dashboard from "./Components/Dashboard/Dashboard";
// import ProblemsSolutions from "./Components/ProblemsSolutions/ProblemsSolutions";
// import Profile from "./Components/Profile/Profile"; // Import Profile component
// import Report from "./Components/SecureEmbed/SecureEmbed"; // Import Report component
// import Settings from "./Components/Settings/Settings"; // Import Settings component
// import Sidebar from "./Components/Sidebar/Sidebar";
// import Predictions from "./Components/Predictions/Predictions";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// const App = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/data")
//       .then((response) => {
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);
 
//   if (loading) return <div>Loading data...</div>;
//   if (error) return <div>Error fetching data: {error.message}</div>;

//   return (
//     <Router>
//       <div className="app-container">
//         <Sidebar />
//         <div className="main-content">
//           <Routes>
//             <Route path="/dashboard" element={<Dashboard data={data} />} />
//             <Route path="/Q&A" element={<ProblemsSolutions />} />
//             <Route path="/predictions" element={<Predictions />} />
//             <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}
//             <Route path="/report" element={<Report />} /> {/* Add Report route */}
//             <Route path="/settings" element={<Settings />} /> {/* Add Settings route */}
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react"; 
import axios from "axios";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProblemsSolutions from "./Components/ProblemsSolutions/ProblemsSolutions";
import Profile from "./Components/Profile/Profile";
import Report from "./Components/SecureEmbed/SecureEmbed";
import Settings from "./Components/Settings/Settings";
import Sidebar from "./Components/Sidebar/Sidebar";
import Predictions from "./Components/Predictions/Predictions";
import Login from "./Components/LoginForm/login";
import SignUp from "./Components/SignUpForm/signUp";
import ForgotPassword from "./Components/ForgotPasswordForm/forgotPassword";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import DashboardSummary from "./Components/Dashboard/DashboardSummery"
import DashboardAnalytics from "./Components/Dashboard/DashboardAnalytics";
import AnswerSuggesstions from "./Components/AnswerSuggesstions/AnswerSuggesstions"

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
            <AppContent data={data} />
        </Router>
    );
};

// Separate component to manage layout and conditional background
// Separate component to manage layout and conditional background
const AppContent = ({ data }) => {
    const location = useLocation();
    const pagesWithBackgroundImage = []; // Define pages that need the background image
    const useBackgroundImage = pagesWithBackgroundImage.includes(location.pathname);
    
    // Hide sidebar when on Profile page ("/")
    const hideSidebar = location.pathname === "/";

    return (
        <div className={`app-container ${useBackgroundImage ? "bg-image" : "bg-color"}`}>
            {!hideSidebar && <Sidebar />} {/* Render sidebar only if NOT on Profile page */}
            <div className={`main-content ${hideSidebar ? "full-width" : ""}`}>
                <Routes>
                    <Route path="/dashboard" element={<DashboardSummary data={data} />} />
                    <Route path="/analytics" element={<DashboardAnalytics data={data} />} />
                    {/* <Route path="/dashboard" element={<Dashboard data={data} />} /> */}
                    <Route path="/Q&A" element={<ProblemsSolutions />} />
                    <Route path="/suggestions" element={<AnswerSuggesstions />} />
                    <Route path="/predictions" element={<Predictions />} />
                    <Route path="/" element={<Profile />} />
                    <Route path="/report" element={<Report />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
            </div>
        </div>
    );
};


export default App;
