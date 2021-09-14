import React, { useState, useEffect } from 'react'
import articleServices from './services/articles'
import emailServices from './services/emails'
import authorLoginServices from './services/authorLogin'
import Nav from './components/nav'
import Home from './pages/home'
import About from './pages/about'
import Article from './pages/article'
import Drafts from './pages/drafts'
import ArticleForm from './pages/articleForm'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import { useHistory } from 'react-router'
import Unsubscribe from './pages/unsubscribe'

const App = () => {
  // const history = useHistory()

  const [articles, setArticles] = useState([])
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const [authorUser, setAuthorUser] = useState(null)

  const mainLinks = [
    {
      label: 'Home',
      url: '/'
    },
    {
      label: 'About',
      url: '/about'
    },
  ]

  const authorLinks = [
    {
      label: 'Create',
      url: '/create'
    },
    {
      label: 'Drafts',
      url: '/drafts'
    }
  ]

  useEffect(() => {
    // Get all the articles when app is first opened
    articleServices.getAll()
      .then(initialArticles => setArticles(initialArticles))
  }, [])

  useEffect(() => {
    const loggedInAuthorUserJSON = window.localStorage.getItem('loggedInAuthorUser')
    if (loggedInAuthorUserJSON) {
      const loggedInAuthorUser = JSON.parse(loggedInAuthorUserJSON)
      setAuthorUser(loggedInAuthorUser)
    }
  }, [])

  const getOneArticle = (id) => {
    return articleServices.getOne(id)
  }

  const updateArticle = (id, updatedArticle) => {
    return articleServices.update(id, updatedArticle)
      .then(returnedArticle => {
        setArticles(articles.map(article => {
          if (article.id !== id) {
            return article
          }
          return returnedArticle
        }))
      })
  }

  const updateAndSendArticle = (articleToSend) => {
    return articleServices.updateAndSend(articleToSend.id, articleToSend)
  }

  const deleteArticle = (id) => {
    articleServices.deleteObj(id)
      .then(response => setArticles(articles.filter(article => article.id !== id)))
  }

  const createArticle = (newArticle) => {
    articleServices.create(newArticle)
      .then(returnedArticle => {
        setArticles(articles.concat(returnedArticle))
      })
  }

  const subscribe = (emailToAdd) => {
    return emailServices.create(emailToAdd)
  }

  const unsubscribe = (emailToDelete) => {
    return emailServices.deleteObj(emailToDelete)
  }

  const authorLogin = (user) => {
    authorLoginServices.login(user)
      .then(returnedUser => {
        window.localStorage.setItem('loggedInAuthorUser', JSON.stringify(returnedUser))
        setAuthorUser(returnedUser)
      })
  }

  const authorLogout = (history) => {
    window.localStorage.removeItem('loggedInAuthorUser')
    history.push('/')
    history.go(0)
  }

  const handleLikeClick = (id) => {
    const article = articles.find(article => article.id === id)
    const articleUpdated = {
      ...article,
      likes: article.likes + 1
    }

    articleServices.update(id, articleUpdated)
      .then(returnedArticle => {
        setArticles(articles.map(article => {
          if (article.id !== id) {
            return article
          }
          return returnedArticle
        }))
      })

  }

  // const handleLogin = (event) => {
  //   event.preventDefault()
  //   authorLoginServices.authorLogin({ username, password })
  //     .then(returnedUser => {
  //       window.localStorage.setItem('loggedInAuthorUser', JSON.stringify(returnedUser))
  //       setAuthorUser(returnedUser)
  //       setUsername('')
  //       setPassword('')
  //     })
  // }

  return (
    <Router>
      {authorUser && <Nav links={authorLinks} type="author" authorLogout={authorLogout}/>}
      <Nav links={mainLinks} type="main"/>
      <Switch>
        <Route
          exact
          path={'/article/:slug'}
          render={(props) =>
            <Article
              getOneArticle={getOneArticle}
              updateArticle={updateArticle}
              updateAndSendArticle={updateAndSendArticle}
              handleLikeClick={handleLikeClick}
              {...props}/>}
        />
        <Route
          exact
          path={'/update/:slug'}
          render={(props) =>
            <ArticleForm
              deleteArticle={deleteArticle}
              updateArticle={updateArticle}
              {...props}
            />}
        />
        <Route path="/drafts">
          <Drafts articles={articles} />
        </Route>
        <Route path="/create">
          <ArticleForm
            updateArticle={updateArticle}
            createArticle={createArticle}
          />
        </Route>
        <Route exact path="/unsubscribe">
          <Unsubscribe
            unsubscribe={unsubscribe}
          />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route exact path="/">
          <Home
            articles={articles}
            subscribe={subscribe}
            handleLikeClick={handleLikeClick}
            authorUser={authorUser}
            authorLogin={authorLogin}
          />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
