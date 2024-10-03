import React from 'react'
import Header from '../components/header/Header'

function Dashboard() {
  return (
    <div>
        <Header/>
        <header className="bg-primary text-white text-center py-5">
            <div className="container py-5">
            <h1 className="display-4">Welcome to Dashboard</h1>
            <p className="lead">Employee Management System built on MERN Stack</p>
            </div>
        </header>
    </div>
  )
}

export default Dashboard