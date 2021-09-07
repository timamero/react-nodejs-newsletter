import React, { useState, useEffect } from "react"
import articleServices from "../services/articles"
import Container from "../components/container"
import Button from "../components/button"
import './articleForm.css'
import { useHistory } from "react-router"

const ArticleForm = ({deleteArticle, handleSaveSubmit, handleSaveAndPublishClick, ...props}) => {
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
      articleServices.getOneEdit(props.location.state.article.id)
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
 
  // const handleTitleChange = (event) => {
  //   setTitle(event.target.value)
  // }

  // const handleAuthorsChange = (event) => {
  //   setAuthors(event.target.value)
  // }

  // const handleContentChange = (event) => {
  //   setContent(event.target.value)
  // }

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

  return (
    <Container>
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
        onSubmit={handleSaveSubmit("save", article.id, title, authors, content, history)}
        >
        <div className="fieldWrapper">
          <label>Title:</label>
          <input value={title} onChange={({target}) => setTitle(target.value)} required/>
        </div>
        <div className="fieldWrapper">
          <label>Author(s):</label>
          <input 
            value={authors} 
            onChange={({target}) => setAuthors(target.value)} 
            placeholder="Separate multiple authors with a comma" 
            required
          />
        </div>
        <div className="contentWrapper">
          <label>Content</label>
          <textarea value={content} onChange={({target}) => setContent(target.value)} required></textarea>
        </div>

        <div className="btnContainer">
          <Button btnType="primary" type="submit">Save</Button>
          {props.location && !article.isPublished
            && <Button 
              handleBtnClick={!article.publishDate
                ? handleSaveSubmit("publish", article.id, title, authors, content, history)
                : handleSaveSubmit("republish", article.id, title, authors, content, history)
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
    </Container>
  )
}

export default ArticleForm