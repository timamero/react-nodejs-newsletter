import React from 'react'
import Container from '../components/container'
import Card from '../components/card'
import Grid from '../components/grid'
import Likes from '../components/likes'
import EmailForm from '../components/emailForm'
import './home.css'
import { Link } from 'react-router-dom'

const Home = ({ articles, subscribe, handleLikeClick }) => {
  const handleSubscribeSubmit = (event) => {
    event.preventDefault()
    const emailObject = {
      email: event.target.elements.subscribeEmail.value
    }
    subscribe(emailObject)
      .then(response => window.alert('Thank you for subscribing!'))
      .catch(error => window.alert('You have already subscribed'))
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
  //article.publishDate.toLocaleDateString('en-us', dateOptions)

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
      </Grid>
    </Container>
  )
}

export default Home