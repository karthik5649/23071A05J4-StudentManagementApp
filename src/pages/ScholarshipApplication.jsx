import { useState, useEffect } from 'react'

const ScholarshipApplication = () => {
  const [user, setUser] = useState(null)
  const [scholarships, setScholarships] = useState([
    {
      id: 1,
      name: 'Merit Scholarship',
      description: 'For students with outstanding academic performance',
      eligibility: 'CGPA 3.5 or above',
      amount: '$5,000',
      deadline: '2023-12-31',
    }
  ])
  const [appliedScholarships, setAppliedScholarships] = useState([])
  const [formData, setFormData] = useState({
    scholarshipId: '',
    statement: '',
    cgpa: '',
    achievements: '',
    amount: '',
    contact: '',
  })
  const [message, setMessage] = useState('')
  const [isApplying, setIsApplying] = useState(false)
  const [selectedScholarship, setSelectedScholarship] = useState(null)

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    setUser(userData)

    // Get applied scholarships from user data
    if (userData.scholarships) {
      setAppliedScholarships(userData.scholarships)
    }
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const startApplication = (scholarship) => {
    setSelectedScholarship(scholarship)
    setIsApplying(true)
    setFormData({
      scholarshipId: scholarship.id,
      statement: '',
      cgpa: '',
      achievements: '',
      amount: '',
      contact: '',
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Create new scholarship application
    const newApplication = {
      id: Date.now().toString(),
      scholarshipId: selectedScholarship.id,
      name: selectedScholarship.name,
      statement: formData.statement,
      cgpa: formData.cgpa,
      achievements: formData.achievements,
      amount: formData.amount,
      contact: formData.contact,
      status: 'Pending',
      appliedDate: new Date().toISOString(),
    }

    // Update user's scholarships
    const updatedScholarships = [...appliedScholarships, newApplication]

    // Update user in localStorage
    const updatedUser = { ...user, scholarships: updatedScholarships }
    localStorage.setItem('user', JSON.stringify(updatedUser))

    // Update users array in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || []
    const updatedUsers = users.map((u) => (u.id === user.id ? updatedUser : u))
    localStorage.setItem('users', JSON.stringify(updatedUsers))

    setUser(updatedUser)
    setAppliedScholarships(updatedScholarships)
    setIsApplying(false)
    setMessage('Scholarship application submitted successfully!')

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  // and also make a payment component to pay fee

  if (!user) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="scholarship">
      <h1>Scholarship Applications</h1>

      {message && <div className="alert alert-success">{message}</div>}

      {isApplying ? (
        <div className="scholarship-application">
          <h2>Apply for {selectedScholarship.name}</h2>
          <p>{selectedScholarship.description}</p>
          <p><strong>Eligibility:</strong> {selectedScholarship.eligibility}</p>
          <p><strong>Amount:</strong> {selectedScholarship.amount}</p>
          <p><strong>Deadline:</strong> {selectedScholarship.deadline}</p>

          <form className="application-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="cgpa">Current CGPA</label>
              <input
                type="text"
                id="cgpa"
                name="cgpa"
                value={formData.cgpa}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="statement">Personal Statement</label>
              <textarea
                id="statement"
                name="statement"
                value={formData.statement}
                onChange={handleChange}
                required
                placeholder="Explain why you deserve this scholarship"
              />
            </div>
            <div className="form-group">
              <label htmlFor="achievements">Achievements</label>
              <textarea
                id="achievements"
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                required
                placeholder="List your academic and extracurricular achievements"
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Requested Amount ($)</label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                placeholder="Enter the amount you are requesting"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact Number</label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                placeholder="Enter your contact number"
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn-primary">
                Submit Application
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsApplying(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="scholarship-container">
          <div className="applied-scholarships">
            <h2>Your Applications</h2>
            {appliedScholarships.length > 0 ? (
              <div className="scholarship-list">
                {appliedScholarships.map((application) => (
                  <div className="scholarship-item" key={application.id}>
                    <h3>{application.name}</h3>
                    <p><strong>Status:</strong> {application.status}</p>
                    <p><strong>Applied Date:</strong> {new Date(application.appliedDate).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>You haven't applied for any scholarships yet.</p>
            )}
          </div>

          <div className="available-scholarships">
            <h2>Available Scholarships</h2>
            <div className="scholarship-list">
              {scholarships.map((scholarship) => {
                // Check if user has already applied for this scholarship
                // push my whole project into github into repository https://github.com/karthik5649/23071A05J4-StudentManagementApp.git
                const hasApplied = appliedScholarships.some(
                  (app) => app.scholarshipId === scholarship.id
                )

                return (
                  <div className="scholarship-item" key={scholarship.id}>
                    <h3>{scholarship.name}</h3>
                    <p>{scholarship.description}</p>
                    <p><strong>Eligibility:</strong> {scholarship.eligibility}</p>
                    <p><strong>Amount:</strong> {scholarship.amount}</p>
                    <p><strong>Deadline:</strong> {scholarship.deadline}</p>
                    {hasApplied ? (
                      <button className="btn-disabled" disabled>
                        Already Applied
                      </button>
                    ) : (
                      <button
                        className="btn-primary"
                        onClick={() => startApplication(scholarship)}
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScholarshipApplication
