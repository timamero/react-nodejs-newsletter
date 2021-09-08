/*
Card props to set:
  type (default: "primary")
    primary - no border, white background
    dashed - dashed border, gray background
*/
import React from 'react'
import './card.css'

const Card = ({children, type="primary"}) => {
  const classes = type === "dashed" 
    ? "card dashed"
    : "card primary"
    
  return <div className={classes}>{children}</div>
}

export default Card