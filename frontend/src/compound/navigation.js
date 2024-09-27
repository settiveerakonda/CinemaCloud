import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const [Email, setEmail] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');

  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email }), // Send the email state
      });

      const data = await response.json();
      if (response.ok) {
        if (data.exists) {
          navigate('/Nav');
        } else {
          const signupModal = new window.bootstrap.Modal(document.getElementById('signupModal'));
          signupModal.show();
        }
      } else {
        console.error('Error checking email');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: loginEmail, // Corrected variable name
          Password: loginPassword, // Corrected variable name
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', loginEmail); // Store the email
        navigate("/Nav");
      } else {
        setLoginError(data.message || 'Login failed');
      }
    } catch (error) {
      setLoginError('Error occurred during login');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/adddata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserName: signupUsername, // Use the username state
          Email: signupEmail, // Use the email state
          Password: signupPassword, // Use the password state
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Signup successful');
        // Optionally, navigate to a different page after signup
        // navigate('/Nav');
      } else {
        setSignupError(data.message || 'Signup failed');
      }
    } catch (error) {
      setSignupError('successfully completed signup');
    }
  };

  return (
    <div className="container-fluid bg-dark text-light" style={{ minHeight: '90vh' }}>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <h1 className="navbar-brand text-danger" style={{ fontSize: '40px' }}>CinemaCloud</h1>
          <div className="d-flex">
            <button className="btn btn-secondary">English</button>
            <button className="btn btn-danger mx-3" data-bs-toggle="modal" data-bs-target="#signinModal">Sign in</button>
            <button className="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#signupModal">Sign up</button>
          </div>
        </div>
      </nav>

      <div className="container d-flex align-items-center justify-content-center text-center" style={{ minHeight: '70vh', marginBottom: '30px' }}>
        <div>
          <h1 className="display-4 text-light">Unlimited movies, TV shows and more</h1>
          <p className="lead text-light">Watch anywhere. Cancel anytime.</p>
          <form className="row g-3 justify-content-center" onSubmit={handleEmailSubmit}>
            <div className="col-auto">
              <input
                className="form-control"
                type="email"
                placeholder="Email Address"
                value={Email} // Use the correct email state
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-danger">Get started</button>
            </div>
          </form>
        </div>
      </div>

      {/* Login Modal */}
      <div className="modal fade" id="signinModal" tabIndex="-1" aria-labelledby="signinModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="signinModalLabel">Sign in</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="loginEmail"
                    value={loginEmail} // Use the correct login email state
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="loginPassword" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="loginPassword"
                    value={loginPassword} // Use the correct login password state
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                {loginError && <div className="text-danger">{loginError}</div>}
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      <div className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="signupModalLabel">Sign up</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label htmlFor="signupUsername" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="signupUsername"
                    value={signupUsername} // Use the correct signup username state
                    onChange={(e) => setSignupUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="signupEmail" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="signupEmail"
                    value={signupEmail} // Use the correct signup email state
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="signupPassword" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="signupPassword"
                    value={signupPassword} // Use the correct signup password state
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                  />
                </div>
                {signupError && <div className="text-danger">{signupError}</div>}
                <button type="submit" className="btn btn-primary">Sign up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
