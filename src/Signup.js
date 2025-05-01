// src/Signup.js
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Signup successful");
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <div className="auth-links">
        <Link to="/login">Already have an account?</Link>
      </div>
    </div>
  );
};

export default Signup;
