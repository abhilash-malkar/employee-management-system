import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import LandingPage from './app/landingPage/LandingPage';
import Login from './auth/login/Login';
import Dashboard from './app/dashboard/Dashboard';
import EmployeeList from './app/employeePages/employee-list/EmployeeList';
import CreateEmployee from './app/employeePages/create-employee/CreateEmployee';
import EmployeeEdit from './app/employeePages/employee-edit/EmployeeEdit';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = Cookies.get('username');
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const LoginRoute = ({ children }) => {
  const isLoggedIn = Cookies.get('username');
  return isLoggedIn ? <Navigate to="/dashboard" /> : children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginRoute><Login /></LoginRoute>} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/employee-list" element={<PrivateRoute><EmployeeList /></PrivateRoute>} />
        <Route path="/create-employee" element={<PrivateRoute><CreateEmployee /></PrivateRoute>} />
        <Route path="/edit-employee/:id" element={<PrivateRoute><EmployeeEdit /></PrivateRoute>} />
        
      </Routes>
    </Router>
  );
}

export default App;
