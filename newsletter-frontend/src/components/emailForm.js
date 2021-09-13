import React, { useState } from 'react'
import './emailForm.css'

const EmailForm = ({ id, submitValue, handleEmailSubmit }) => {
  const [ email, setEmail ] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleSubmit = (event) => {
    // Clear email input after person submits
    event.preventDefault()
    setEmail('')
  }
  return (
    <form
      className="emailForm"
      onSubmit={(event) => {handleEmailSubmit(event); handleSubmit(event)}}
    >
      <div className="fieldWrapper">
        <input
          type="email"
          placeholder="Type your email..."
          value={email}
          onChange={handleEmailChange}
          id={id}
          required
        />
        <input type="submit" value={submitValue}/>
      </div>
    </form>
  )}

export default EmailForm