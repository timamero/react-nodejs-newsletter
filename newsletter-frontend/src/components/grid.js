/*
Grid props to set:
  rowGap - (default = '1rem') gap between elements
  classname (default = '')
    centered - sets justify-content:0
*/
import React from 'react'
import './grid.css'

const Grid = ({ rowGap = '1rem', className='', children, ...props }) => {
  const style = {
    display: 'grid',
    gridTemplateRows: 'auto',
    rowGap: `${rowGap}`,
  }

  return (
    <div
      className={className}
      style={style}
    >
      {children}
    </div>
  )
}

export default Grid
