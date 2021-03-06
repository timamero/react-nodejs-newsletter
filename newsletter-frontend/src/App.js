import React, { useState, useEffect } from 'react'
import articleServices from './services/articles'
import previewServices from './services/preview'
import emailServices from './services/emails'
import authorLoginServices from './services/authorLogin'
import Nav from './components/nav'
import Home from './pages/home'
import About from './pages/about'
import Article from './pages/article'
import Drafts from './pages/drafts'
import ArticleForm from './pages/articleForm'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Unsubscribe from './pages/unsubscribe'

const App = () => {
  const [articles, setArticles] = useState([])
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
    articleServices.getAll()
      .then(initialArticles => setArticles(initialArticles))
  }, [articles])

  useEffect(() => {
    const loggedInAuthorUserJSON = window.localStorage.getItem('loggedInAuthorUser')
    if (loggedInAuthorUserJSON) {
      const loggedInAuthorUser = JSON.parse(loggedInAuthorUserJSON)
      articleServices.getToken(loggedInAuthorUser.token)
      setAuthorUser(loggedInAuthorUser)
    }
  }, [])

  const getOneArticle = (id) => {
    return articleServices.getOne(id)
  }

  const getOneArticleToEdit = (id) => {
    return articleServices.getOneEdit(id)
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

  const updateAndSendArticle = (id) => {
    return articleServices.updateAndSend(id)
      .then(returnedArticle => {
        const updatedArticle = {
          ...returnedArticle,
          isEmailed: true,
        }
        updateArticle(id, updatedArticle)
      })
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

  const createPreview = (article) => {
    const loggedInAuthorUser = JSON.parse(window.localStorage.getItem('loggedInAuthorUser'))
    previewServices.getToken(loggedInAuthorUser.token)
    return previewServices.create(article)
  }

  const getPreview = (id) => {
    return previewServices.getOne(id)
  }

  const getPreviewToEdit = (id) => {
    return previewServices.getOneEdit(id)
  }

  const deletePreview = (id) => {
    return previewServices.deleteObj(id)
  }

  const deleteAllPreviews = () => {
    const loggedInAuthorUser = JSON.parse(window.localStorage.getItem('loggedInAuthorUser'))
    previewServices.getToken(loggedInAuthorUser.token)
    return previewServices.deleteAll()
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
        articleServices.getToken(returnedUser.token)
        setAuthorUser(returnedUser)
      })
      .catch(error => {
        window.alert('Wrong credentials.')
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

  const createAuthorsList = (authorsString) => {
    return authorsString.split(',').map(author => author.replace(/^\s|\s$/g, ''))
  }

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
              authorUser={authorUser}
              {...props}
            />
          }
        />
        <Route
          exact
          path={'/update/:slug'}
          render={(props) =>
            <ArticleForm
              getArticle={getOneArticleToEdit}
              deleteArticle={deleteArticle}
              updateArticle={updateArticle}
              getPreviewToEdit={getPreviewToEdit}
              deletePreview={deletePreview}
              deleteAllPreviews={deleteAllPreviews}
              authorUser={authorUser}
              createAuthorsList={createAuthorsList}
              {...props}
            />
          }
        />
        <Route
          exact
          path={'/preview/:slug'}
          render={(props) =>
            <Article
              getOneArticle={getOneArticle}
              createPreview={createPreview}
              getPreview={getPreview}
              authorUser={authorUser}
              createAuthorsList={createAuthorsList}
              {...props}
            />
          }
        />
        <Route path="/drafts">
          <Drafts
            articles={articles}
            authorUser={authorUser}
          />
        </Route>
        <Route path="/create">
          <ArticleForm
            updateArticle={updateArticle}
            createArticle={createArticle}
            authorUser={authorUser}
            createAuthorsList={createAuthorsList}
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
