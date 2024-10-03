import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { logout } from '../../../auth/logout/Logout'
import Cookies from 'js-cookie';
import './style.css';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
      logout(navigate);
    };

    const isActive = (path) => {
      return location.pathname === path ? 'active' : '';
    };

  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav-bg-dark">
            <div className="container-fluid">
            <Link className="navbar-brand" to="/">Logo</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className={`nav-link ${isActive('/dashboard')}`} to="/dashboard">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${isActive('/employee-list')}`} to="/employee-list">Employee List</Link>
                </li>
                </ul>
                <ul className="navbar-nav">
                <li className="nav-item">
                    <span className="nav-link">{Cookies.get('username')||"Unknown"}</span>
                </li>
                <li className="nav-item">
                    <span className="nav-link" style={{cursor: 'pointer'}} onClick={handleLogout}>Logout</span>
                </li>
                </ul>
            </div>
            </div>
        </nav>
    </>
  )
}

export default Header