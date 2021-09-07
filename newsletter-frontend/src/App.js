import React, { useState, useEffect } from 'react';
import articleServices from './services/articles';
import emailServices from './services/emails';
import Nav from './components/nav';
import Home from './pages/home';
import About from './pages/about';
import Article from './pages/article';
import Drafts from './pages/drafts';
import ArticleForm from './pages/articleForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Unsubscribe from './pages/unsubscribe';

const App = () => {
  const [ articles, setArticles] = useState([])
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
    },
    {
      label: 'Log Out',
      url: '/#'
    },
  ]

  // console.log('render app')

  useEffect(() => {
    // Get all the articles when app is first opened
    articleServices.getAll()
      .then(initialArticles => setArticles(initialArticles))
  }, [])

  const getOneArticle = (id) => {
    return articleServices.getOne(id)
  }

  const updateArticle = (updatedArticle) => {
    articleServices.update(updatedArticle.id, updatedArticle)
      .then(returnedArticle => {
        setArticles(articles.map(article => {
          if (article.id !== updatedArticle.id) {
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

  const handleSaveSubmit = (action, id, title, authors, content, history) => {
    // action choices:
    //  save - save changes
    //  publish - save and publish, first time to be published
    //  republish - save and republish, not the first time to be published

    return (event) => {
      event.preventDefault()
      const article = id ? articles.find(article => article.id === id) : null
      const authorList = authors.split(',').map(author => author.replace(/^\s|\s$/g, ''))

      if (id) {
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
          articleServices.update(id, articleObject)
            .then(returnedArticle => {
              setArticles(articles.map(article => {
                if (article.id !== id) {
                  return article
                }
                return returnedArticle
              }))
            })
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
            articleServices.update(id, articleObject)
              .then(returnedArticle => {
                setArticles(articles.map(article => {
                  if (article.id !== id) {
                    return article
                  }
                  return returnedArticle
                }))
              })
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

        articleServices.create(articleObject)
          .then(returnedArticle => {
            setArticles(articles.concat(returnedArticle))
          })

        history.push('/drafts')
      }      
    }
  }

  const handleSubscribeSubmit = (event) => {
    event.preventDefault()
    const emailObject = {
      email: event.target.elements.subscribeEmail.value
    }
    emailServices
      .create(emailObject)
      .then(response => window.alert('Thank you for subscribing!'))
      .catch(error => window.alert('You have already subscribed'))
  }

  const handleUnsubscribeSubmit = (event) => {
    event.preventDefault()

    const emailToDelete = event.target.elements.unsubscribeEmail.value

    emailServices.deleteObj(emailToDelete, emailToDelete.replace(/[@\\.]/g,'-'))
      .then(result => window.alert('You have unsubscribed to the newsletter.'))
      .catch(error => window.alert('That email does not exist or it was already deleted.'))
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

  return (
    <Router>
      <Nav links={authorLinks} type="author"/>
      <Nav links={mainLinks} type="main"/>
      <Switch>
        <Route
          exact
          path={`/article/:slug`}
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
          path={`/update/:slug`}
          render={(props) => 
            <ArticleForm 
              deleteArticle={deleteArticle}
              handleSaveSubmit={handleSaveSubmit}
              {...props}
            />} 
        />
        <Route path="/drafts">
          <Drafts articles={articles} />
        </Route>
        <Route path="/create">
          <ArticleForm handleSaveSubmit={handleSaveSubmit}/>
        </Route>
        <Route exact path="/unsubscribe">
          <Unsubscribe
            handleUnsubscribeSubmit={handleUnsubscribeSubmit}
          />
        </Route> 
        <Route path="/about">
          <About />
        </Route>
        <Route exact path="/">
          <Home
            articles={articles}
            handleSubscribeSubmit={handleSubscribeSubmit}
            handleLikeClick={handleLikeClick}
          />
        </Route> 
      </Switch>
    </Router>
  )
}

export default App;
