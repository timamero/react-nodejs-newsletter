import React from 'react'
import Container from '../components/container'
import Card from '../components/card'
import Grid from '../components/grid'
import Button from '../components/button'
import { Link } from 'react-router-dom'

const Drafts = ({ articles }) => {
  const sortedArticles = articles.sort((a, b) => {
    if (a.creationDate < b.creationDate) {
      return 1
    }
    if (a.creationDate > b.creationDate) {
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
      <h1>Drafts</h1>
      <Grid rowGap="1rem" numOfItems={numOfArticles}>
        {sortedArticles.map(article => {
          if (!article.isPublished) {
            return (
              <Card key={article.id} type="dashed">
                <h2>{article.title}</h2>
                <p>Created on {new Date(article.creationDate).toLocaleDateString('en-us', dateOptions)}</p>
                <p>Author{article.authors.length > 1 ? 's' : ''}: {' '}
                  {article.authors.map((author, index) => {
                    if (index === article.authors.length - 1) {
                      return <span key={author}>{author}</span>
                    } else {
                      return <span key={author}>{author}, </span>
                    }
                  })}
                </p>
                <Link to={{
                  pathname: `/update/${article.slug}`,
                  state: { article }
                }}>
                  <Button>Edit</Button>
                </Link>
              </Card>
            )}
          return null
        }
        )}
      </Grid>
    </Container>
  )
}

export default Drafts