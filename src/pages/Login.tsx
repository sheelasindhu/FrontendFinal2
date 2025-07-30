// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios'; // Axios instance with baseURL and token support
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/Auth/login', {
        email,
        password
      });

      const { token, user } = response.data;

      // Store token and user info
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect based on role
      if (user.role === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }

    } catch (error: any) {
      if (error.response?.status === 401) {
        alert('Invalid credentials');
      } else {
        alert('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleLogin}>Login</button>
      <p>New user? <a href="/register">Register</a></p>
    </div>
  );
};

export default Login;
