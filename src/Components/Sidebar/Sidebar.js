// src/Components/Sidebar/Sidebar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import BackButton from '../BackButton/BackButton';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false); // State to track if sidebar is expanded
  const navigate = useNavigate(); // Hook for navigation

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded); // Toggle the sidebar state
  };

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div className={`wrapper1 ${isExpanded ? 'expanded' : ''}`}>
      <aside id="sidebar" className={isExpanded ? 'expand' : ''}>
        <div className="d-flex">
          <button className="toggle-btn" type="button" onClick={toggleSidebar}>
            <i className="lni lni-grid-alt"></i>
          </button>
          <div className="sidebar-logo">
            <a href="#">IT Helpdesk</a>
          </div>
        </div>
        <ul className="sidebar-nav">
          {/* <li className="sidebar-item" onClick={() => handleNavigation('/profile')}>
            <a href="#" className="sidebar-link">
              <i className="lni lni-user"></i>
              <span>Profile</span>
            </a>
          </li> */}
          <li className="sidebar-item" onClick={() => handleNavigation('/dashboard')}>
            <a href="#" className="sidebar-link">
              <i className="lni lni-agenda"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li className="sidebar-item" onClick={() => handleNavigation('/report')}>
            <a href="#" className="sidebar-link">
            <i className="lni lni-bar-chart"></i>
              <span>Analysis</span>
            </a>
          </li>
          <li className="sidebar-item" onClick={() => handleNavigation('/predictions')}>
            <a href="#" className="sidebar-link">
             <i className="lni lni-stats-up"></i>
              <span>Prediction</span>
            </a>
          </li>
          <li className="sidebar-item" onClick={() => handleNavigation('/Q&A')}>
            <a href="#" className="sidebar-link">
            <i className="lni lni-question-circle"></i>
              <span>Q & A</span>
            </a>
          </li>
          {/* <li className="sidebar-item" onClick={() => handleNavigation('/settings')}>
            <a href="#" className="sidebar-link">
              <i className="lni lni-cog"></i>
              <span>Settings</span>
            </a>
          </li> */}

<div className="breadcrumbs">
  <BackButton />
  <span className="breadcrumb-divider">/</span>
  <span>Current Page</span>
</div>
        </ul>
        <div className="sidebar-footer" onClick={() => handleNavigation('/')}>
          <a href="#" className="sidebar-link">
            <i className="lni lni-exit"></i>
            <span>Logout</span>
          </a>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;


