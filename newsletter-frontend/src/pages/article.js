import React, { useState, useEffect } from 'react'
import Container from '../components/container'
import Grid from '../components/grid'
import Likes from '../components/likes'
import Button from '../components/button'
import './article.css'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

const Article = ({ getOneArticle, createPreview, getPreview, updateArticle, updateAndSendArticle, handleLikeClick, authorUser, createAuthorsList,...props }) => {
  const history = useHistory()
  const [article, setArticle] = useState(null)
  const [articleAuthorUser, setArticleAuthorUser] = useState(null)
  const [previewId, setPreviewId] = useState('')

  const previewGridStyle = {
    textAlign: 'center',
    backgroundColor: '#eae9ec',
    padding: '0.5rem',
    borderRadius: '0.25rem'
  }

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  console.log('article Author', articleAuthorUser)
  console.log('current user', authorUser)
  useEffect(() => {
    if (!props.location.state.preview) {
      getOneArticle(props.location.state.article.id)
        .then(retrievedArticle => {
          setArticle(retrievedArticle)
          console.log('retrieved',retrievedArticle)
          setArticleAuthorUser(retrievedArticle.authorUser) //new
        })
    } else {
      const articleTemp = {
        title: props.location.state.previewArticle.title,
        slug: props.location.state.previewArticle.article.slug,
        authors: createAuthorsList(props.location.state.previewArticle.authors),
        content: props.location.state.previewArticle.content,
      }
      createPreview(articleTemp)
        .then(returnedArticle => {
          setPreviewId(returnedArticle.id)
        })
    }
  }, [getOneArticle, props.location.state.article])

  useEffect(() => {
    if (previewId) {
      getPreview(previewId)
        .then(retrievedArticle => {
          const articleToPreview = {
            ...retrievedArticle,
            publishDate: new Date(),
            likes: 0,
            isEmailed: false,
            isPublished: true
          }
          setArticle(articleToPreview)
        })
    }
  }, [previewId])

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
        {props.location.state.preview
        &&
          <Grid rowGap="0.5rem" className="centered" style={previewGridStyle}>
            <p>In preview mode</p>
            <Link
              to={{
                pathname: `/update/${article.slug}`,
                state: {
                  article: {
                    ...props.location.state.previewArticle.article,
                  },
                  previewId: previewId
                }
              }}
            >
              <Button>Go Back To Editing</Button>
            </Link>
          </Grid>
        }
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
          <Likes article={article} handleLikeClick={handleLikeClick} disabled={previewId && true}/>
        </Grid>

        <Grid>
          <div className="articleContent" dangerouslySetInnerHTML={createMarkup()} />
          {authorUser && articleAuthorUser && authorUser.username === articleAuthorUser.username && !props.location.state.preview &&
            <Grid>
              <Link to={{
                pathname: `/update/${article.slug}`,
                state: { article }
              }}>
                <Button>Edit</Button>
              </Link>

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