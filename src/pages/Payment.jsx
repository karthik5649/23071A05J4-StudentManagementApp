import { useState, useEffect } from 'react'

const Payment = () => {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    amount: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    paymentType: 'tuition'
  })
  const [message, setMessage] = useState('')
  const [paymentHistory, setPaymentHistory] = useState([])

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    setUser(userData)
    
    // Get payment history from user data
    if (userData.payments) {
      setPaymentHistory(userData.payments)
    }
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Create new payment record
    const newPayment = {
      id: Date.now().toString(),
      amount: formData.amount,
      paymentType: formData.paymentType,
      cardNumber: formData.cardNumber.slice(-4), // Store only last 4 digits for security
      date: new Date().toISOString(),
      status: 'Completed'
    }
    
    // Update payment history
    const updatedPayments = [...paymentHistory, newPayment]
    
    // Update user in localStorage
    const updatedUser = { ...user, payments: updatedPayments }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    // Update users array in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || []
    const updatedUsers = users.map((u) => (u.id === user.id ? updatedUser : u))
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    
    setUser(updatedUser)
    setPaymentHistory(updatedPayments)
    setMessage('Payment successful!')
    
    // Reset form
    setFormData({
      amount: '',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      paymentType: 'tuition'
    })
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  if (!user) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="payment-page">
      <h1>Fee Payment</h1>
      
      {message && <div className="alert alert-success">{message}</div>}
      
      <div className="payment-container">
        <div className="payment-form-container">
          <h2>Make a Payment</h2>
          <form className="payment-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="paymentType">Payment Type</label>
              <select
                id="paymentType"
                name="paymentType"
                value={formData.paymentType}
                onChange={handleChange}
                required
              >
                <option value="tuition">Tuition Fee</option>
                <option value="hostel">Hostel Fee</option>
                <option value="exam">Examination Fee</option>
                <option value="library">Library Fee</option>
                <option value="other">Other Fees</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="amount">Amount ($)</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min="1"
                required
                placeholder="Enter amount to pay"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="cardName">Name on Card</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                required
                placeholder="Enter name as shown on card"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                placeholder="Enter 16-digit card number"
                maxLength="16"
                pattern="[0-9]{16}"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  placeholder="MM/YY"
                  maxLength="5"
                  pattern="[0-9]{2}/[0-9]{2}"
                />
              </div>
              
              <div className="form-group half">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  placeholder="CVV"
                  maxLength="3"
                  pattern="[0-9]{3}"
                />
              </div>
            </div>
            
            <button type="submit" className="btn-primary">
              Pay Now
            </button>
          </form>
        </div>
        
        <div className="payment-history">
          <h2>Payment History</h2>
          
          {paymentHistory.length > 0 ? (
            <div className="history-list">
              {paymentHistory.map((payment) => (
                <div className="history-item" key={payment.id}>
                  <div className="history-details">
                    <h3>${payment.amount} - {payment.paymentType}</h3>
                    <p>Date: {new Date(payment.date).toLocaleDateString()}</p>
                    <p>Card: **** **** **** {payment.cardNumber}</p>
                    <p>Status: <span className="status-completed">{payment.status}</span></p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No payment history available.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Payment
