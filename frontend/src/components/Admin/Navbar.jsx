import { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className="admin-navbar">
      <div className="navbar-left">
        <button 
          className="sidebar-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <h1 className="navbar-title">Admin Dashboard</h1>
      </div>

      <div className="navbar-right">
        <div className="user-menu">
          <button 
            className="user-avatar"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <div className="avatar-circle">A</div>
            <span className="username">Admin</span>
            <svg className={`dropdown-icon ${userMenuOpen ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {userMenuOpen && (
            <div className="user-dropdown">
              <a href="#profile" className="dropdown-item">Profile</a>
              <a href="#settings" className="dropdown-item">Settings</a>
              <hr className="dropdown-divider" />
              <a href="#logout" className="dropdown-item logout">Logout</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;