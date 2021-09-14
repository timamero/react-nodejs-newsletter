import React from 'react'
import './nav.css'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

const Nav = ({ links, type, authorLogout }) => {
  const history = useHistory()

  const classes = type === 'main'
    ? 'navWrapper main'
    : type === 'author'
    && 'navWrapper author'

  const handleAuthorLogout = () => {
    authorLogout(history)
  }

  return (
    <div className={classes}>
      <nav>
        <ul>
          {links.map(link => (
            <li key={link.label}>
              <Link to={link.url}>{link.label}</Link>
            </li>
          ))}
          {type === 'author' &&
          <li>
            <button type="button" onClick={handleAuthorLogout}>Log Out</button>
          </li>
          }
        </ul>
      </nav>
    </div>
  )
}

export default Nav