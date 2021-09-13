import React from 'react'
import './nav.css'
import { Link } from 'react-router-dom'

const Nav = ({ links, type }) => {
  const classes = type === 'main'
    ? 'navWrapper main'
    : type === 'author'
    && 'navWrapper author'

  return (
    <div className={classes}>
      <nav>
        <ul>
          {links.map(link => (
            <li key={link.label}>
              <Link to={link.url}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Nav