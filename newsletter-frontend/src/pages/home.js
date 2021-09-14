import React, { useState } from 'react'
import Container from '../components/container'
import Card from '../components/card'
import Grid from '../components/grid'
import Likes from '../components/likes'
import EmailForm from '../components/emailForm'
import './home.css'
import { Link } from 'react-router-dom'

const Home = ({ articles, subscribe, handleLikeClick, authorUser, authorLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

  const loginFormStyle = loginVisible ? { display: '' } : { display: 'none' }
  const loginBtnStyle = !loginVisible ? { display: '' } : { display: 'none' }

  const handleSubscribeSubmit = (event) => {
    event.preventDefault()
    const emailObject = {
      email: event.target.elements.subscribeEmail.value
    }
    subscribe(emailObject)
      .then(response => window.alert('Thank you for subscribing!'))
      .catch(error => window.alert('You have already subscribed'))
  }

  const handleAuthorLogin = (event) => {
    event.preventDefault()
    authorLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  const sortedArticles = articles.sort((a, b) => {
    if (new Date(a.publishDate) < new Date(b.publishDate)) {
      return 1
    }
    if (new Date(a.publishDate) > new Date(b.publishDate)) {
      return -1
    }
    return 0
  })

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric' }

  const numOfArticles = articles.filter(article => article.isPublished).length

  return (
    <Container>
      <h1>Newsletter</h1>
      <Grid rowGap="4rem" numOfItems="2">
        <Grid rowGap="1rem" numOfItems={numOfArticles}>
          {sortedArticles.map(article => {
            if (article.isPublished) {
              return (
                <Card key={article.id} type="primary">
                  <Link className="articleLink" to={{
                    pathname: `/article/${article.slug}`,
                    state: { article }
                  }}>
                    <h2>{article.title}</h2>
                  </Link>
                  <p>{new Date(article.publishDate).toLocaleDateString('en-us', dateOptions)}</p>
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
                </Card>
              )}
            return null
          }
          )}
        </Grid>
        <Grid className="centered">
          <EmailForm
            id="subscribeEmail"
            handleEmailSubmit={handleSubscribeSubmit}
            submitValue="Subscribe"
          />
        </Grid>
        {!authorUser &&
          <Grid className="centered">
            <form className="authorLoginForm" onSubmit={handleAuthorLogin} style={loginFormStyle}>
              <div className="fieldWrapper">
                <label>Username:</label>
                <input
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                  required
                />
              </div>
              <div className="fieldWrapper">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  required
                />
              </div>
              <button className="submitLoginBtn homeBtn" type="submit">Log In</button>
              <button
                className="closeLoginBtn homeBtn"
                type="button"
                onClick={() => setLoginVisible(false)}
              >
              Close
              </button>
            </form>
            <button
              className="loginBtn homeBtn"
              style={loginBtnStyle}
              type="button"
              onClick={() => setLoginVisible(true)}
            >
              Author Login
            </button>
          </Grid>
        }

      </Grid>
    </Container>
  )
}

export default Home