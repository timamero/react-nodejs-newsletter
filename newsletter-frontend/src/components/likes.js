import React, { useState } from 'react'
import './likes.css'

const Likes = ({ article, handleLikeClick, disabled = false }) => {
  const [ likes, setLikes ] = useState(article.likes)

  const handleClick = () => {
    if (!disabled) {
      setLikes(likes + 1)
      handleLikeClick(article.id)
    }
  }

  return (
    <div className="likesContainer">
      {/*Heart SVG*/}
      <svg
        onClick={handleClick}
        className={article.likes > 0 ? 'likesIcon hasLikes' : 'likesIcon noLikes'}
        viewBox="0 0 54.596 48.128">
        <g transform="matrix(.1125 0 0 .1125 0 -3.2344)">
          <g>
            <g>
              <path d="m349.6 28.95c-36.3 0-70.5 14.2-96.2 39.9l-10.6
              10.6-10.8-10.8c-25.7-25.7-59.9-39.9-96.2-39.9-36.2 0-70.3
              14.1-96 39.8s-39.8 59.8-39.8 96.1 14.2 70.4 39.9 96.1l190.9
              190.9c3.3 3.3 7.7 4.9 12 4.9 4.4 0 8.8-1.7
              12.1-5l190.5-190.5c25.7-25.7
              39.9-59.8 39.9-96.1s-14.1-70.5-39.8-96.1c-25.6-25.8-59.7-39.9-95.9-39.9zm71.6
              207.8-178.3 178.4-178.7-178.7c-19.2-19.2-29.8-44.7-29.9-71.9 0-27.1
              10.5-52.6 29.7-71.8 19.2-19.1 44.7-29.7 71.7-29.7 27.2 0 52.7 10.6 72
              29.9l22.9 22.9c6.4 6.4 17.8 6.4 24.3 0l22.8-22.8c19.2-19.2
              44.8-29.8 71.9-29.8s52.6 10.6 71.8 29.8 29.8 44.7 29.7 71.9c0
              27.1-10.6 52.6-29.9 71.8z"/>
            </g>
          </g>
        </g>
      </svg>
      {likes > 0 && <p>{likes}</p>}
    </div>
  )}

export default Likes