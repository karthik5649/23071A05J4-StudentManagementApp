import { Link } from 'react-router-dom'
import { useState } from 'react'

const Navbar = ({ isAuthenticated, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Student MS
        </Link>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={toggleMenu}>
              Home
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-links" onClick={toggleMenu}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/student-details" className="nav-links" onClick={toggleMenu}>
                  Student Details
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/scholarship" className="nav-links" onClick={toggleMenu}>
                  Scholarship
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cgpa-calculator" className="nav-links" onClick={toggleMenu}>
                  CGPA Calculator
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/payment" className="nav-links" onClick={toggleMenu}>
                  Fee Payment
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={logout} className="nav-links-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links" onClick={toggleMenu}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links" onClick={toggleMenu}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
