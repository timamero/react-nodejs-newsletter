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
  const [ emailList, setEmailList ] = useState([])

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

  useEffect(() => {
    // Get all the articles
    articleServices.getAll()
      .then(initialArticles => setArticles(initialArticles))
    setEmailList(emailServices.getAll()) // Don't need to get email data when connection to database is added
  }, [])

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
          isEmailed: article.isPublished,
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
          
          history.push('/drafts')

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

            history.push('/')
          }
        }  

      } else {
        // Add new article to articles
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
  console.log(articles)

  const handleUnpublishClick = (id, history) => {
    return () => {
      const article = articles.find(article => article.id === id)
      const articleUpdated = {
        ...article,
        isPublished: false
      }

      if (window.confirm('Are you sure you want to unpublish this article?')) {
        articleServices.update(article.id, articleUpdated)
          .then(returnedArticle => {
            setArticles(articles.map(article => {
              if (article.id !== id) {
                return article
              }
              return returnedArticle
            }))
          })
        
        history.push('/drafts')
      }   
    }  
  }

  const handleDeleteClick = (id, title, history) => {
    return () => {
      if (window.confirm(`Are you sure you want to delete the article: '${title}'?`)) {
        const isPublished = articles.find(article => article.id === id).isPublished
        articleServices.deleteObj(id)
          .then(response => setArticles(articles.filter(article => article.id !== id)))
        
        if (isPublished) {
          // If deleted article was published, go back to Home page
          history.push('/')
        } else {
          // If deleted article is unpublished, go back to Drafts page
          history.push('/drafts')
        }
      }
    } 
  }

  const handleSubscribeSubmit = (event) => {
    console.log('handle submit from app')
    event.preventDefault()
    const emailObject = {
      id: emailList.length + 1,
      email: event.target.elements.subscribeEmail.value
    }
    setEmailList(emailList.concat(emailObject))
    window.alert('Thank you for subscribing!')
  }

  const handleUnsubscribeSubmit = (event) => {
    event.preventDefault()
    console.log('handle unsubscribe submit from app')
    const emailToDelete = event.target.elements.unsubscribeEmail.value
    if (emailList.map(email => email.email).includes(emailToDelete)) {
      setEmailList(emailList.filter(email => email.email !== emailToDelete))
      window.alert('You have unsubscribed to the newsletter.')
    } else {
      window.alert('That email does not exist or it was already deleted.')
    }
  }

  const handleLikeClick = (id) => {
    setArticles(articles.map(article => {
      if (article.id !== id) {
        return article
      }
      const articleObject = {
        ...article,
        likes: article.likes + 1
      }
      return articleObject
    }))
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
              handleLikeClick={handleLikeClick}
              handleUnpublishClick={handleUnpublishClick} 
              {...props}/>}
        />
        <Route
          exact
          path={`/update/:slug`}
          render={(props) => 
            <ArticleForm 
              handleSaveSubmit={handleSaveSubmit}
              handleDeleteClick={handleDeleteClick}
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
