import React, { useState, useEffect } from 'react'
import Container from '../components/container'
import Button from '../components/button'
import Unauthorized from '../components/unauthorized'
import './articleForm.css'
import { useHistory } from 'react-router'

const ArticleForm = ({ getArticle, deleteArticle, updateArticle, createArticle, authorUser, ...props }) => {
  const history = useHistory()

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  const [ title, setTitle ] = useState('')
  const [ authors, setAuthors] = useState('')
  const [ content, setContent] = useState('')

  const [ article, setArticle ] =useState({
    id: null,
    creationDate: null,
    lastUpdateDate: null,
    publishDate: null,
    isPublished: false
  })

  useEffect(() => {
    if (props.location) {
      getArticle(props.location.state.article.id)
        .then(returnedArticle => {
          setArticle(returnedArticle)
          setTitle(returnedArticle.title)
          setContent(returnedArticle.content)
          if (returnedArticle.authors.length > 1) {
            setAuthors(returnedArticle.authors.join(', '))
          } else {
            setAuthors(returnedArticle.authors.join(''))
          }
        })

    } else {
      // When navigating from /update/:id to /create, need to clear form data
      setTitle('')
      setAuthors('')
      setContent('')
    }

  }, [props.location])

  const handleCancelClick = () => {
    history.goBack()
  }

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete the article: '${title}'?`)) {
      deleteArticle(article.id)
      if (article.isPublished) {
        // If deleted article was published, go back to Home page
        history.push('/')
      } else {
        // If deleted article is unpublished, go back to Drafts page
        history.push('/drafts')
      }
    }
  }

  const handleSaveSubmit = (action) => {
    // action choices:
    //  save - save changes
    //  publish - save and publish, first time to be published
    //  republish - save and republish, not the first time to be published

    return (event) => {
      event.preventDefault()
      const authorList = authors.split(',').map(author => author.replace(/^\s|\s$/g, ''))

      if (article.id) {
        const articleObject = {
          title: title,
          creationDate: article.creationDate,
          lastUpdateDate: new Date(),
          publishDate: action === 'publish' || action === 'republish'
            ? new Date() : article.publishDate,
          authors: authorList,
          content: content,
          isPublished: action === 'publish' || action === 'republish'
            ? true : article.isPublished,
          isEmailed: article.isEmailed,
          likes: article.likes
        }
        if (action === 'save' && !article.isPublished) {
          updateArticle(article.id, articleObject)
            .then(response => history.push('/drafts'))
            .catch(error => window.alert('Title must be unique'))

        } else {
          const message = action === 'save'
            ? `Are you sure you want to make changes to the article: '${title}'?`
            : action === 'publish'
              ? `Are you sure you want to publish and mail the article: '${title}'?`
              : action === 'republish'
            && `Are you sure you want to publish the article: '${title}'?`
          if (window.confirm(message)) {
            updateArticle(article.id, articleObject)
            if (action === 'save') {
              history.goBack()
            } else {
              history.push('/')
            }
          }
        }
      } else {
        // Add new article
        const articleObject = {
          title: title,
          authors: authorList,
          content: content,
        }

        createArticle(articleObject)

        history.push('/drafts')
      }
    }
  }

  return (
    <Container>
      {authorUser ?
        <div>
          {!props.location
            ?<h1>Create Article</h1>
            :<h1>Update Article</h1>
          }

          {article.lastUpdateDate
            ? <p className="dateMessage">Last updated on {`${new Date(article.lastUpdateDate).toLocaleDateString('en-us', dateOptions)}`}</p>
            : article.creationDate
              ? <p className="dateMessage">Created on {`${new Date(article.creationDate).toLocaleDateString('en-us', dateOptions)}`}</p>
              : null
          }

          <form
            className="articleForm"
            onSubmit={handleSaveSubmit('save', article.id, title, authors, content, history)}
          >
            <div className="fieldWrapper">
              <label>Title:</label>
              <input value={title} onChange={({ target }) => setTitle(target.value)} required/>
            </div>
            <div className="fieldWrapper">
              <label>Author(s):</label>
              <input
                value={authors}
                onChange={({ target }) => setAuthors(target.value)}
                placeholder="Separate multiple authors with a comma"
                required
              />
            </div>
            <div className="contentWrapper">
              <label>Content</label>
              <textarea value={content} onChange={({ target }) => setContent(target.value)} required></textarea>
            </div>

            <div className="btnContainer">
              <Button btnType="primary" type="submit">Save</Button>
              {props.location && !article.isPublished
              && <Button
                handleBtnClick={!article.publishDate
                  ? handleSaveSubmit('publish', article.id, title, authors, content, history)
                  : handleSaveSubmit('republish', article.id, title, authors, content, history)
                }
                btnType="primary"
                type="button"
              >
                  Save and Publish
              </Button>
              }
              <Button
                btnType="primary"
                type="button"
                handleBtnClick={handleCancelClick}
              >
              Cancel
              </Button>
              {props.location
              && <Button
                handleBtnClick={handleDeleteClick}
                btnType="danger"
                type="button"
              >
                  Delete
              </Button>}
            </div>
          </form>
        </div>
        :
        <Unauthorized />
      }
    </Container>
  )
}

export default ArticleForm