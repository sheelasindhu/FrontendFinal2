// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios'; // Axios instance with baseURL and token support
import './Auth.css';

const Login = () => {
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (role === 'admin') {
        // Static admin credentials
        if (email === 'admin@smart.com' && password === 'admin123') {
          navigate('/admin');
        } else {
          alert('Invalid admin credentials');
        }
        return;
      }

      // Call backend for user login
      const response = await axios.post('/Auth/login', {
        email,
        password
      });

      const { token, user } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert('Invalid user credentials');
      } else {
        alert('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <div>
        <button onClick={() => setRole('user')} style={{ marginRight: 10 }}>User</button>
        <button onClick={() => setRole('admin')}>Admin</button>
      </div>
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
      <button onClick={handleLogin}>Login as {role}</button>
      {role === 'user' && <p>New user? <a href="/register">Register</a></p>}
    </div>
  );
};

export default Login;
