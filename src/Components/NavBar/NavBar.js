import React from 'react';
import './NavBar.css'; // CSS specific to the navbar

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">Dashboard</div>
      <div className="search">Search</div>
      <div className="right-options">
        <div className="account">Account</div>
        <div className="dropdown">Dropdown</div>
        <div className="logout">Log out</div>
      </div>
    </div>
  );
};

export default Navbar;


