import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router components
import App from './App'  // Main App component
import Admin from './Admin.jsx';  // Admin component
import Login from './components/auth/login/index.jsx';
import Home from './components/home/Home.jsx';
import { AuthProvider } from './contexts/auth';
import './index.css'
import ReviewsPage from './components/ReviewsPage';
import CompanyProfile from './components/CompanyProfile';

// Render the app with routing setup
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />  {/* Main App route */}
        <Route path="/admin" element={<Admin />} />  {/* Admin page route */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reviews" element={<ReviewsPage/>}/>
        <Route path="/company-profile" element={<CompanyProfile/>}></Route>
      </Routes>
    </Router>
    </AuthProvider>

  </React.StrictMode>
)
