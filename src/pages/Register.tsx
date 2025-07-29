// src/pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/Auth/register', {
        username: form.username,
        email: form.email,
        password: form.password
      });

      alert('Registration successful! You can now login.');
      navigate('/');
    } catch (error: any) {
      if (error.response?.data) {
        alert(`Registration failed: ${error.response.data}`);
      } else {
        alert('An error occurred while registering');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </div>
  );
};

export default Register;
