import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home">
      <div className="hero-container">
        <h1>STUDENT MANAGEMENT SYSTEM</h1>
        <p>Manage your academic journey with ease</p>
        <div className="hero-btns">
          <Link to="/register" className="btn-primary">
            GET STARTED
          </Link>
          <Link to="/login" className="btn-outline">
            LOGIN
          </Link>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Our Features</h2>
        <div className="features-container">
          <div className="feature-card">
            <i className="fas fa-user-graduate"></i>
            <h3>Student Registration</h3>
            <p>Register as a new student and create your profile</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-info-circle"></i>
            <h3>Student Details</h3>
            <p>View and manage your personal and academic information</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-award"></i>
            <h3>Scholarship Application</h3>
            <p>Apply for various scholarships and track your applications</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-calculator"></i>
            <h3>CGPA Calculator</h3>
            <p>Calculate your CGPA based on your course grades</p>
          </div>
        </div>
      </div>
      
      <div className="about-section">
        <h2>About Our System</h2>
        <p>
          Our Student Management System is designed to help students manage their academic journey efficiently.
          From registration to tracking your academic progress, we provide all the tools you need to succeed.
        </p>
        <p>
          With our user-friendly interface, you can easily navigate through different features and make the most
          of your academic experience.
        </p>
      </div>
    </div>
  )
}

export default Home
