import React, { useState, useEffect } from "react"
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
  const [ id, setId ] = useState('')
  const [ creationDate, setCreationDate ] = useState(null)
  const [ lastUpdateDate, setLastUpdateDate ] = useState(null)
  const [ publishDate, setPublishDate ] = useState(null)
  const [ isPublished, setIsPublished ] = useState(false)

  useEffect(() => {
    if (props.location) {
      console.log('in useEffect if')
      setId(props.location.state.article.id)
      setTitle(props.location.state.article.title)

      if (props.location.state.article.authors.length > 1) {
        setAuthors(props.location.state.article.authors.join(', '))
      } else {
        setAuthors(props.location.state.article.authors.join(''))
      }

      setContent(props.location.state.article.content)
      setCreationDate(props.location.state.article.creationDate)
      setLastUpdateDate(props.location.state.article.lastUpdateDate)
      setPublishDate(props.location.state.article.publishDate)
      setIsPublished(props.location.state.article.isPublished)
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

  return (
    <Container>
      {!props.location
        ?<h1>Create Article</h1>
        :<h1>Update Article</h1>
      }

      {lastUpdateDate
        ? <p className="dateMessage">Last updated on {`${lastUpdateDate.toLocaleDateString('en-us', dateOptions)}`}</p>
        : creationDate
        ? <p className="dateMessage">Created on {`${creationDate.toLocaleDateString('en-us', dateOptions)}`}</p>
        : null
      }
      
      <form 
        className="articleForm"
        onSubmit={handleSaveSubmit("save", id, title, authors, content, history)}
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
          {props.location && !isPublished
            && <Button 
              handleBtnClick={!publishDate
                ? handleSaveSubmit("publish", id, title, authors, content, history)
                : handleSaveSubmit("republish", id, title, authors, content, history)
              } 
              btnType="primary" 
              type="button"
              >
                Save and Publish
              </Button>
          }
          {props.location 
            && <Button 
              handleBtnClick={handleDeleteClick(id, title, history)} 
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