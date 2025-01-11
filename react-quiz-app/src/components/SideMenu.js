import React from "react";
import { Link } from "react-router-dom";
import "./SideMenu.css"; // Include the CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Chapter 2 : Biology</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">What is Biology?</Link>
          </li>
          <li>
            <Link to="/about">Organisms</Link>
          </li>
          <li>
            <Link to="/dashboard">Life and Living Things</Link>
          </li>
          <li>
            <Link to="/dashboard">Movement</Link>
          </li>
          <li>
            <Link to="/dashboard">Response to the Environment</Link>
          </li>
          <li>
            <Link to="/dashboard">Growth and Development</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
