import React from "react"
import Container from "../components/container"
import Grid from "../components/grid"
import Likes from "../components/likes"
import Button from "../components/button"
import './article.css'
import { Link } from "react-router-dom"
import { useHistory } from "react-router"

const Article = ({handleLikeClick, handleUnpublishClick, ...props}) => {
  const history = useHistory()
  const article = props.location.state.article
  const dateOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  }

  return (
    <Container>
      <h1>{article.title}</h1>

      <Grid rowGap="0.5rem" numOfItems="3">
        {article.isPublished 
          ? <p>{article.publishDate.toLocaleDateString('en-us', dateOptions)}</p>
          : <p>Created on {article.creationDate.toLocaleDateString('en-us', dateOptions)}</p>}
        <p>Author{article.authors.length > 1 ? 's' : ''}: {' '}
          {article.authors.map((author, index) => {
            if (index === article.authors.length - 1) {
              return <span key={author}>{author}</span>
            } else {
              return <span key={author}>{author}, </span>
            }
          })}
        </p>
        <Likes article={article} handleLikeClick={handleLikeClick} />
      </Grid>
      <Grid>
        <p className="articleContent">{article.content}</p>
        <Link to={{
          pathname: `/update/${article.slug}`,
          state: {article}
          }}>
          <Button>Edit</Button> 
        </Link>
        <Button 
          handleBtnClick={handleUnpublishClick(article.id, history)}
          // value={article.id}
        >
          Unpublish
        </Button>
      </Grid>
      
    </Container>
  )
}

export default Article