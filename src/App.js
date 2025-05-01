// src/App.js
import { Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

function App() {
  return (
    <div className="App">
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;