import React from 'react'

const Unauthorized = () => {
  const unauthorizedStyle = {
    height: '70vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#990000'
  }
  return (
    <div style={unauthorizedStyle}>
      <p>You are not authorized to view the content of this page.</p>
    </div>
  )
}

export default Unauthorized