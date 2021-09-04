import React from "react"
import Container from "../components/container"
import Grid from "../components/grid"
import Likes from "../components/likes"
import Button from "../components/button"
import './article.css'
import { Link } from "react-router-dom"
import { useHistory } from "react-router"

const Article = ({getOneArticle, articles, handleLikeClick, handleUnpublishClick, handleSendSubmit, ...props}) => {
  const history = useHistory()
  const article = articles.find(article => article.id === props.location.state.article.id)

  const dateOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  }

  const createMarkup = () => {
    return {__html: article.content}
  }

  return (
    <Container>
      <h1>{article.title}</h1>

      <Grid rowGap="0.5rem" numOfItems="3" className="centered">
        {article.isPublished 
          ? <p>{new Date(article.publishDate).toLocaleDateString('en-us', dateOptions)}</p>
          : <p>Created on {new Date(article.creationDate).toLocaleDateString('en-us', dateOptions)}</p>}
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
        <div className="articleContent" dangerouslySetInnerHTML={createMarkup()} />
        <Link to={{
          pathname: `/update/${article.slug}`,
          state: {article}
          }}>
          <Button>Edit</Button> 
        </Link>
        
        {/* {props.location */}
        {props.location && !article.isEmailed   
          && <Button 
              handleBtnClick={handleSendSubmit(article.id, article.title, history)} 
              btnType="primary" 
              type="button"
            >
              Email to all Subscribers
            </Button>
        }
        <Button 
          handleBtnClick={handleUnpublishClick(article.id, history)}
        >
          Unpublish
        </Button>
      </Grid>     
    </Container>
  )
}

export default Article