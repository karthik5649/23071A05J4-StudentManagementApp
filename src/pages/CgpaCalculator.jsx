import { useState, useEffect } from 'react'

const CgpaCalculator = () => {
  const [user, setUser] = useState(null)
  const [numGpas, setNumGpas] = useState('')
  const [gpas, setGpas] = useState([])
  const [cgpa, setCgpa] = useState(null)
  const [step, setStep] = useState(1) // 1: Enter number of GPAs, 2: Enter GPAs, 3: Show result

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    setUser(userData)
  }, [])

  // Handle number of GPAs input
  const handleNumGpasChange = (e) => {
    const value = e.target.value
    setNumGpas(value)
  }

  // Initialize GPA input fields
  const initializeGpaInputs = () => {
    if (numGpas > 0) {
      const newGpas = Array(parseInt(numGpas)).fill('').map((_, index) => ({
        id: index + 1,
        value: ''
      }))
      setGpas(newGpas)
      setStep(2)
    }
  }

  // Handle GPA value change
  const handleGpaChange = (index, value) => {
    const updatedGpas = [...gpas]
    updatedGpas[index].value = value
    setGpas(updatedGpas)
  }

  // Calculate CGPA (average of all GPAs)
  const calculateCGPA = () => {
    // Filter out empty values and convert to numbers
    const validGpas = gpas
      .map(gpa => parseFloat(gpa.value))
      .filter(value => !isNaN(value))

    if (validGpas.length === 0) {
      return 0
    }

    // Calculate the sum of all GPAs
    const sum = validGpas.reduce((total, gpa) => total + gpa, 0)

    // Return the average (CGPA)
    return (sum / validGpas.length).toFixed(2)
  }

  // Handle calculate button click
  const handleCalculate = () => {
    const calculatedCGPA = calculateCGPA()
    setCgpa(calculatedCGPA)
    setStep(3)
  }

  // Reset the calculator
  const resetCalculator = () => {
    setNumGpas('')
    setGpas([])
    setCgpa(null)
    setStep(1)
  }

  if (!user) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="cgpa-calculator">
      <h1>CGPA Calculator</h1>

      <div className="calculator-container">
        <div className="calculator-form">
          {step === 1 && (
            <div className="step-1">
              <h2>Enter Number of GPAs</h2>
              <div className="form-group">
                <label htmlFor="numGpas">How many GPAs do you want to calculate?</label>
                <input
                  type="number"
                  id="numGpas"
                  value={numGpas}
                  onChange={handleNumGpasChange}
                  min="1"
                  max="20"
                  required
                />
              </div>
              <button
                type="button"
                className="btn-primary"
                onClick={initializeGpaInputs}
                disabled={!numGpas || numGpas < 1}
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="step-2">
              <h2>Enter Your GPAs</h2>
              <div className="gpas-list">
                {gpas.map((gpa, index) => (
                  <div className="form-group" key={gpa.id}>
                    <label htmlFor={`gpa-${gpa.id}`}>GPA {gpa.id}</label>
                    <input
                      type="number"
                      id={`gpa-${gpa.id}`}
                      value={gpa.value}
                      onChange={(e) => handleGpaChange(index, e.target.value)}
                      min="0"
                      max="4"
                      step="0.01"
                      required
                      placeholder="Enter GPA (0-4)"
                    />
                  </div>
                ))}
              </div>
              <div className="calculator-buttons">
                <button type="button" className="btn-primary" onClick={handleCalculate}>
                  Calculate CGPA
                </button>
                <button type="button" className="btn-secondary" onClick={resetCalculator}>
                  Start Over
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-3">
              <h2>Your CGPA Result</h2>
              <div className="cgpa-result">
                <h3>Your CGPA: {cgpa}</h3>
                <p>Based on {gpas.length} GPAs</p>
              </div>
              <div className="gpa-details">
                <h4>GPA Details:</h4>
                <ul>
                  {gpas.map((gpa) => (
                    <li key={gpa.id}>
                      GPA {gpa.id}: {gpa.value || 'Not entered'}
                    </li>
                  ))}
                </ul>
              </div>
              <button type="button" className="btn-primary" onClick={resetCalculator}>
                Calculate Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CgpaCalculator
