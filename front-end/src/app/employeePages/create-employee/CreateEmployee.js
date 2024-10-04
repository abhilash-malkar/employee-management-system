import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../components/header/Header';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../../BaseURL';

function CreateEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_Gender: '',
    f_Course: [],
    f_Image: null,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.f_Email)) {
      newErrors.f_Email = 'Please enter a valid email address';
    }

    // Numeric validation for mobile
    if (!/^\d+$/.test(formData.f_Mobile)) {
      newErrors.f_Mobile = 'Mobile number must contain only digits';
    }

    // File type validation
    if (formData.f_Image && !['image/jpeg', 'image/png'].includes(formData.f_Image.type)) {
      newErrors.f_Image = 'Only JPG/PNG files are allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkEmailDuplicate = async (email) => {
    try {
      const response = await axios.get(`${baseUrl}/employee/check-email?email=${email}`);
      return response.data.isDuplicate;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const handleChange = async (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      let updatedCourses = [...formData.f_Course];
      if (checked) {
        updatedCourses.push(value);
      } else {
        updatedCourses = updatedCourses.filter(course => course !== value);
      }
      setFormData({ ...formData, f_Course: updatedCourses });
    } else if (type === 'file') {
      setFormData({ ...formData, f_Image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === 'f_Email') {
      const isDuplicate = await checkEmailDuplicate(value);
      if (isDuplicate) {
        setErrors(prev => ({ ...prev, f_Email: 'This email is already in use' }));
      } else {
        setErrors(prev => ({ ...prev, f_Email: undefined }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const submitData = new FormData();
    for (const key in formData) {
      if (key === 'f_Course') {
        submitData.append(key, formData[key].join(', '));
      } else if (key === 'f_Image') {
        if (formData[key]) {
          submitData.append(key, formData[key], formData[key].name);
        }
      } else {
        submitData.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(`${baseUrl}/employee/create`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Employee created:', response.data);
      navigate('/employee-list');
    } catch (error) {
      console.error('Error creating employee:', error);
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || {});
      }
    }
  };

  return (
    <>
      <Header />
      <header className="bg-primary text-white text-left py-5">
        <div className="container">
          <h1 className="display-4">Create Employee</h1>
          <p className="lead">Add a new employee to the system</p>
        </div>
      </header>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md"></div>
          <div className="col-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="f_Name" className="form-label">Name</label>
                <input type="text" className="form-control" id="f_Name" name="f_Name" value={formData.f_Name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="f_Email" className="form-label">Email</label>
                <input 
                  type="email" 
                  className={`form-control ${errors.f_Email ? 'is-invalid' : ''}`} 
                  id="f_Email" 
                  name="f_Email" 
                  value={formData.f_Email} 
                  onChange={handleChange} 
                  required 
                />
                {errors.f_Email && <div className="invalid-feedback">{errors.f_Email}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="f_Mobile" className="form-label">Mobile No</label>
                <input 
                  type="tel" 
                  className={`form-control ${errors.f_Mobile ? 'is-invalid' : ''}`} 
                  id="f_Mobile" 
                  name="f_Mobile" 
                  value={formData.f_Mobile} 
                  onChange={handleChange} 
                  required 
                />
                {errors.f_Mobile && <div className="invalid-feedback">{errors.f_Mobile}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="f_Designation" className="form-label">Designation</label>
                <select className="form-select" id="f_Designation" name="f_Designation" value={formData.f_Designation} onChange={handleChange} required>
                  <option value="">Select Designation</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                  <option value="Software Engineer">Software Engineer</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="f_Gender" id="male" value="Male" checked={formData.f_Gender === 'Male'} onChange={handleChange} required />
                    <label className="form-check-label" htmlFor="male">Male</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="f_Gender" id="female" value="Female" checked={formData.f_Gender === 'Female'} onChange={handleChange} required />
                    <label className="form-check-label" htmlFor="female">Female</label>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Course</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" name="f_Course" id="mca" value="MCA" checked={formData.f_Course.includes('MCA')} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="mca">MCA</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" name="f_Course" id="bca" value="BCA" checked={formData.f_Course.includes('BCA')} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="bca">BCA</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" name="f_Course" id="bsc" value="BSC" checked={formData.f_Course.includes('BSC')} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="bsc">BSC</label>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="f_Image" className="form-label">Image Upload</label>
                <input 
                  type="file" 
                  className={`form-control ${errors.f_Image ? 'is-invalid' : ''}`} 
                  id="f_Image" 
                  name="f_Image" 
                  onChange={handleChange} 
                  accept="image/jpeg,image/png" 
                />
                {errors.f_Image && <div className="invalid-feedback">{errors.f_Image}</div>}
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div className="col-md"></div>
        </div>
      </div>
    </>
  );
}

export default CreateEmployee;