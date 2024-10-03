import React from 'react'
import { Link } from 'react-router-dom'
import '../components/header/style.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../auth/logout/Logout';

function LandingPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
      logout(navigate);
    };
  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav-bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">Logo</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {Cookies.get('username') ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link">{Cookies.get('username') || "Unknown"}</span>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link" style={{cursor: 'pointer'}} onClick={handleLogout}>Logout</span>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              )}

            </ul>
          </div>
        </div>
      </nav>

      <header className="bg-primary text-white text-center py-5 " style={{height: '87vh'}} >
        <div className="container" style={{paddingTop: '150px'}}>
          <h1 className="display-4">Welcome to Employee Management System</h1>
          <p className="lead">Employee Management System built on MERN Stack</p>
          <a href="#features" className="btn btn-light btn-lg">Learn More</a>
        </div>
      </header>


      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p>&copy; 2023 Your Company Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage