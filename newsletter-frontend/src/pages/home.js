import React from 'react';
import Container from '../components/container';
import Card from '../components/card';
import Grid from '../components/grid';
import Likes from '../components/likes';
import EmailForm from '../components/emailForm';
import './home.css'
import { Link } from "react-router-dom";

const Home = ({articles, handleSubscribeSubmit, handleLikeClick}) => {
  const sortedArticles = articles.sort((a, b) => {
    if (a.publishDate < b.publishDate) {
      return 1
    }
    if (a.publishDate > b.publishDate) {
      return -1
    }
    return 0
  })

  const dateOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'}
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
                        state: {article}
                        }}>
                        <h2>{article.title}</h2>
                      </Link>
                      <p>{article.publishDate.toLocaleDateString('en-us', dateOptions)}</p>
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
            <EmailForm id="subscribeEmail" handleEmailSubmit={handleSubscribeSubmit} />
          </Grid>   
        </Grid>     
    </Container>     
  )
}

export default Home