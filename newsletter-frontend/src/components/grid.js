/*
Grid props to set:
  numOfItems - (default = '1') number of children elements in grid
  rowGap - (default = '1rem') gap between elements
  classname (default = '')
    centered - sets justify-content:0
*/
import './grid.css'

const Grid = ({numOfItems = '1', rowGap = '1rem', className='', children}) => {
  const style = {
    display: "grid",
    gridTemplateRows: `repeat(${numOfItems}, auto)`,
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
