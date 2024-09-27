import React, { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [formdata, setFormdata] = useState({ UserName: '', Email: '', Password: '' });
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSignup = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/adddata', formdata);
      if (response.status === 200) {
        alert('Success');
        setFormdata({ UserName: '', Email: '', Password: '' });
      }
    } catch (error) {
      alert('An error occurred during sign-up');
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formdata.UserName) errors.UserName = 'Username is required';
    if (!formdata.Email) errors.Email = 'Email is required';
    if (!formdata.Password) errors.Password = 'Password is required';
    return errors;
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <form onSubmit={handleSignup}>
          <h1>Sign-Up</h1>
          <input
            type="text"
            placeholder="Username"
            value={formdata.UserName}
            onChange={(e) => setFormdata({ ...formdata, UserName: e.target.value })}
            className="form-control mb-3"
          />
          {fieldErrors.UserName && <p className="text-danger">{fieldErrors.UserName}</p>}
          <input
            type="email"
            placeholder="Email"
            value={formdata.Email}
            onChange={(e) => setFormdata({ ...formdata, Email: e.target.value })}
            className="form-control mb-3"
          />
          {fieldErrors.Email && <p className="text-danger">{fieldErrors.Email}</p>}
          <input
            type="password"
            placeholder="Password"
            value={formdata.Password}
            onChange={(e) => setFormdata({ ...formdata, Password: e.target.value })}
            className="form-control mb-3"
          />
          {fieldErrors.Password && <p className="text-danger">{fieldErrors.Password}</p>}
          <button className="btn btn-success w-100">Sign up</button>
          <a href="/login" className="btn btn-default border w-100 bg-light mt-3">Login</a>
        </form>
      </div>
    </div>
  );
}
