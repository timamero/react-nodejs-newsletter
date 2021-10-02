/*
Grid props to set:
  rowGap - (default = '1rem') gap between elements
  classname (default = '')
    centered - sets justify-content:0
*/
import React from 'react'
import './grid.css'

const Grid = ({ rowGap = '1rem', className='', children, style, ...props }) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateRows: 'auto',
    rowGap: `${rowGap}`,
    ...style
  }

  return (
    <div
      className={className}
      style={gridStyle}
    >
      {children}
    </div>
  )
}

export default Grid
