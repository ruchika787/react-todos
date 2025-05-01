// src/ForgotPassword.js
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Reset email sent');
    } catch (error) {
      toast.error('Error sending email');
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input 
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <button type="submit">Send Reset Email</button>
        <p><Link to="/login">Back to Login</Link></p>
      </form>
    </div>
  );
};

export default ForgotPassword;
