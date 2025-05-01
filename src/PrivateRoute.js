// src/PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './spinner.css'; // 🔥 Spinner ke styling ke liye

function PrivateRoute({ children }) {
  const auth = getAuth();
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
