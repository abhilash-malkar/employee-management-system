import React, { useEffect, useState } from 'react'
import BaseURL from '../../../BaseURL'
import 'datatables.net';
import 'datatables.net-bs5';
import 'datatables.net-responsive';
import axios from 'axios';
import $ from 'jquery';
import Header from '../../components/header/Header';
import { Link, useNavigate } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${BaseURL}/employee/get`);
      setEmployees(response.data.data);
      initializeDataTable(response.data.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`${BaseURL}/employee/delete/${id}`);
        fetchEmployees(); 
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const initializeDataTable = (data) => {
    const table = $('#employeeTable').DataTable({
      data: data,
      
      columns: [
        { 
          data: 'f_Image',
          render: function(data, type, row) {
            return `<img src="${BaseURL}/media/${data}" alt="${row.f_Name}" width="50" height="50">`;
          }
        },
        { data: 'f_Name' },
        { data: 'f_Email' },
        { data: 'f_Mobile' },
        { data: 'f_Designation' },
        { data: 'f_Gender' },
        { data: 'f_Course' },
        {
          data: 'f_Createdate',
          render: function(data, type, row) {
            return new Date(data).toLocaleDateString();
          }
        },
        {
          data: null,
          render: function(data, type, row) {
            return `
              <button class="btn btn-primary btn-sm edit-btn" data-id="${row.f_Id}">Edit</button>
              <button class="btn btn-danger btn-sm delete-btn" data-id="${row.f_Id}">Delete</button>
            `;
          }
        }
      ],
      responsive: true,
      destroy: true
    });

    $('#employeeTable').on('click', '.edit-btn', function() {
      const id = $(this).data('id');
      navigate(`/edit-employee/${id}`);
    });

    $('#employeeTable').on('click', '.delete-btn', function() {
      const id = $(this).data('id');
      deleteEmployee(id);
    });
  };

  return (
    <>
      <Header/>
      <header className="bg-primary text-white text-left py-5">
        <div className="container">
          <h1 className="display-4">Employee List</h1>
          <p className="lead">Manage your employees</p>
          <Link to="/create-employee" className="btn btn-light btn-sm">Add Employee</Link>
        </div>
      </header>
      <div className="container mt-5">
        <table id="employeeTable" className="table table-bordered">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Created At</th>
              <th style={{width: '100px'}}>Actions</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}

export default EmployeeList;