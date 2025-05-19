import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import StudentDetails from './pages/StudentDetails'
import ScholarshipApplication from './pages/ScholarshipApplication'
import CgpaCalculator from './pages/CgpaCalculator'
import Payment from './pages/Payment'
import NotFound from './pages/NotFound'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('user') ? true : false
  )

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setIsAuthenticated(false)
  }

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />
    }
    return children
  }

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} logout={logout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login login={login} isAuthenticated={isAuthenticated} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student-details"
              element={
                <ProtectedRoute>
                  <StudentDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/scholarship"
              element={
                <ProtectedRoute>
                  <ScholarshipApplication />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cgpa-calculator"
              element={
                <ProtectedRoute>
                  <CgpaCalculator />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
