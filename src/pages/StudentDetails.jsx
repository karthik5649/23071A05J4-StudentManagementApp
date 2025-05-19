import { useState, useEffect } from 'react'

const StudentDetails = () => {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    department: '',
    year: '',
    address: '',
    phone: '',
    dob: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    setUser(userData)
    setFormData({
      name: userData.name || '',
      email: userData.email || '',
      studentId: userData.studentId || '',
      department: userData.department || '',
      year: userData.year || '',
      address: userData.address || '',
      phone: userData.phone || '',
      dob: userData.dob || '',
    })
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Update user in localStorage
    const updatedUser = { ...user, ...formData }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    // Update users array in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || []
    const updatedUsers = users.map((u) => (u.id === user.id ? updatedUser : u))
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    
    setUser(updatedUser)
    setIsEditing(false)
    setMessage('Profile updated successfully!')
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  if (!user) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="student-details">
      <h1>Student Details</h1>
      
      {message && <div className="alert alert-success">{message}</div>}
      
      <div className="details-container">
        {!isEditing ? (
          <div className="details-view">
            <div className="details-group">
              <h3>Personal Information</h3>
              <div className="details-item">
                <span className="details-label">Name:</span>
                <span className="details-value">{user.name}</span>
              </div>
              <div className="details-item">
                <span className="details-label">Email:</span>
                <span className="details-value">{user.email}</span>
              </div>
              <div className="details-item">
                <span className="details-label">Phone:</span>
                <span className="details-value">{user.phone || 'Not provided'}</span>
              </div>
              <div className="details-item">
                <span className="details-label">Address:</span>
                <span className="details-value">{user.address || 'Not provided'}</span>
              </div>
              <div className="details-item">
                <span className="details-label">Date of Birth:</span>
                <span className="details-value">{user.dob || 'Not provided'}</span>
              </div>
            </div>
            
            <div className="details-group">
              <h3>Academic Information</h3>
              <div className="details-item">
                <span className="details-label">Student ID:</span>
                <span className="details-value">{user.studentId}</span>
              </div>
              <div className="details-item">
                <span className="details-label">Department:</span>
                <span className="details-value">{user.department}</span>
              </div>
              <div className="details-item">
                <span className="details-label">Year of Study:</span>
                <span className="details-value">{user.year}</span>
              </div>
            </div>
            
            <button className="btn-primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <form className="details-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="studentId">Student ID</label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Business Administration">Business Administration</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="year">Year of Study</label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default StudentDetails
