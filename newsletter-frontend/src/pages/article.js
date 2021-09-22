import React, { useState, useEffect } from 'react'
import Container from '../components/container'
import Grid from '../components/grid'
import Likes from '../components/likes'
import Button from '../components/button'
import './article.css'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

const Article = ({ getOneArticle, updateArticle, updateAndSendArticle, handleLikeClick, authorUser, ...props }) => {
  const history = useHistory()
  const [article, setArticle] = useState(null)

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  useEffect(() => {
    getOneArticle(props.location.state.article.id)
      .then(retrievedArticle => setArticle(retrievedArticle))
  }, [getOneArticle, props.location.state.article.id])

  const handleUnpublishClick = () => {
    const updatedArticle = {
      ...article,
      isPublished: false
    }

    if (window.confirm('Are you sure you want to unpublish this article?')) {
      updateArticle(article.id, updatedArticle)
      history.push('/drafts')
    }
  }

  const handleSendSubmit = () => {
    if (window.confirm(`This article will be sent to all subscribers and can only be done once for this article. Are you sure you want to send the article: ${article.title}?`)) {
      console.log('will send')
      updateAndSendArticle(article.id)
        .then(result => window.alert('Email sent to all subscribers.'))
        .catch(error => window.alert(`Error sending email: ${error}`))
      history.go(0)
    }
  }

  const createMarkup = () => {
    return { __html: article.content }
  }

  if (article) {
    return (
      <Container>
        <h1>{article.title}</h1>

        <Grid rowGap="0.5rem" className="centered">
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
          {authorUser &&
            <Grid>
              <Link to={{
                pathname: `/update/${article.slug}`,
                state: { article }
              }}>
                <Button>Edit</Button>
              </Link>

              {/* {props.location */}
              {props.location && !article.isEmailed
              && <Button
                handleBtnClick={handleSendSubmit}
                btnType="primary"
                type="button"
              >
                  Email to all Subscribers
              </Button>
              }
              <Button
                handleBtnClick={handleUnpublishClick}
              >
              Unpublish
              </Button>
            </Grid>
          }
        </Grid>
      </Container>
    )
  } else {
    return (
      <Container>
        <Grid className="centered">Loading Article</Grid>
      </Container>
    )
  }

}

export default Article