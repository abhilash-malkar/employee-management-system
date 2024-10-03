import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import BaseURL from '../../BaseURL';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${BaseURL}/login/check`, {
         username,
         password
      });
      
      if (response.data.status) {

        Cookies.set('username', username, { expires: 7 }); 
        navigate('/dashboard');

      } else {
        alert(response.data.message || 'Login failed');
      }
    } catch (error) {
      alert(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <>
        <div style={{backgroundColor:"#29343a"}}>
            <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-6 col-lg-4">
                <div className="card">
                    <div className="card-body">
                    <h2 className="card-title text-center mb-4">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>
                        <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    </div>
                    <div className="card-footer">
                        <div className="text-center text-dark">back to <Link to="/">Landing Page</Link></div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </>
  );
}

export default Login;