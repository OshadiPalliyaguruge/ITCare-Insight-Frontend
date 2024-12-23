import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false); // State to track if sidebar is expanded

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded); // Toggle the sidebar state
  };

  return (
    <div className={`wrapper ${isExpanded ? 'expanded' : ''}`}>
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
          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <i className="lni lni-user"></i>
              <span>Profile</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <i className="lni lni-agenda"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li class="sidebar-item">
              <a href="#" class="sidebar-link">
                  <i class="lni lni-popup"></i>
                  <span>Report</span>
              </a>
          </li>
          <li class="sidebar-item">
              <a href="#" class="sidebar-link">
                  <i class="lni lni-cog"></i>
                  <span>Setting</span>
              </a>
          </li>
        </ul>
        <div className="sidebar-footer">
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

