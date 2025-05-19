import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    setUser(userData)
  }, [])

  if (!user) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}!</h1>
      <div className="dashboard-info">
        <div className="user-info">
          <h2>Your Information</h2>
          <p><strong>Student ID:</strong> {user.studentId}</p>
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Year of Study:</strong> {user.year}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <i className="fas fa-info-circle"></i>
          <h3>Student Details</h3>
          <p>View and update your personal and academic information</p>
          <Link to="/student-details" className="btn-primary">
            View Details
          </Link>
        </div>
        <div className="dashboard-card">
          <i className="fas fa-award"></i>
          <h3>Scholarship</h3>
          <p>Apply for scholarships and check application status</p>
          <Link to="/scholarship" className="btn-primary">
            Apply Now
          </Link>
        </div>
        <div className="dashboard-card">
          <i className="fas fa-calculator"></i>
          <h3>CGPA Calculator</h3>
          <p>Calculate your CGPA based on your course grades</p>
          <Link to="/cgpa-calculator" className="btn-primary">
            Calculate CGPA
          </Link>
        </div>
        <div className="dashboard-card">
          <i className="fas fa-credit-card"></i>
          <h3>Fee Payment</h3>
          <p>Pay your tuition and other fees online</p>
          <Link to="/payment" className="btn-primary">
            Pay Now
          </Link>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <p>You logged in at {new Date().toLocaleString()}</p>
          </div>
          {user.scholarships && user.scholarships.length > 0 ? (
            user.scholarships.map((scholarship, index) => (
              <div className="activity-item" key={index}>
                <p>
                  You applied for {scholarship.name} scholarship on{' '}
                  {new Date(scholarship.appliedDate).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <div className="activity-item">
              <p>No recent scholarship applications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
