import React, { useState, useEffect } from "react"
import articleServices from "../services/articles"
import Container from "../components/container"
import Button from "../components/button"
import './articleForm.css'
import { useHistory } from "react-router"

const ArticleForm = ({handleSaveSubmit, handleDeleteClick, handleSaveAndPublishClick, ...props}) => {
  const history = useHistory()
  
  const dateOptions = { 
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  }
  
  const [ title, setTitle ] = useState('')
  const [ authors, setAuthors] = useState('')
  const [ content, setContent] = useState('')
  // const [ id, setId ] = useState('')
  // const [ creationDate, setCreationDate ] = useState(null)
  // const [ lastUpdateDate, setLastUpdateDate ] = useState(null)
  // const [ publishDate, setPublishDate ] = useState(null)
  // const [ isPublished, setIsPublished ] = useState(false)

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
          console.log('returnedArticle', returnedArticle)
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
 
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorsChange = (event) => {
    setAuthors(event.target.value)
  }

  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

  const handleCancelClick = () => {
    history.goBack()
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
          <input value={title} onChange={handleTitleChange} required/>
        </div>
        <div className="fieldWrapper">
          <label>Author(s):</label>
          <input 
            value={authors} 
            onChange={handleAuthorsChange} 
            placeholder="Separate multiple authors with a comma" 
            required
          />
        </div>
        <div className="contentWrapper">
          <label>Content</label>
          <textarea value={content} onChange={handleContentChange} required></textarea>
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
              handleBtnClick={handleDeleteClick(article.id, title, history)} 
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