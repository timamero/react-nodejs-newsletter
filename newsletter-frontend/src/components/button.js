/*
Button props to set:
  btnType (default: "primary")
    primary - normal button
    danger - red button
*/
import React from 'react'
import './button.css'

const Button = ({ children, btnType='primary', handleBtnClick, ...props }) => {
  const classes = btnType === 'danger'
    ? 'btn danger'
    : 'btn primary'
  return (
    <button
      className={classes}
      onClick={handleBtnClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button