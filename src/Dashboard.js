// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import Todos from './Todos';
import { FaSun, FaMoon } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  const handleLogout = () => {
    signOut(auth);
    navigate('/login');
  };

  const toggleTheme = () => {
    document.body.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="dashboard">
      <div className="toggle-theme" onClick={toggleTheme}>
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </div>
      <h2>Welcome to your dashboard</h2>
      <p>{userEmail}</p>
      <button onClick={handleLogout}>Logout</button>
      <Todos />
    </div>
  );
};

export default Dashboard;
