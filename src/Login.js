// src/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit">Login</button>
        <p><Link to="/forgot-password">Forgot Password?</Link></p>
        <p>Don't have an account? <Link to="/">Sign up</Link></p>
      </form>
    </div>
  );
};

export default Login;
