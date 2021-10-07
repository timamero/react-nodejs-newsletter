import React from 'react'
import Container from '../components/container'
import Card from '../components/card'
import Grid from '../components/grid'
import Button from '../components/button'
import Unauthorized from '../components/unauthorized'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

const Drafts = ({ articles, authorUser }) => {
  const history = useHistory()
  console.log('articles', articles)
  console.log('authorUser', authorUser)

  // console.log('authorUser.username', authorUser.username)
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

  return (
    <Container>
      {authorUser ?
        <div>
          <h1>Drafts</h1>
          {sortedArticles.filter(article => article.isPublished === false).length !== 0
            ?
            <Grid rowGap="1rem">
              {sortedArticles.map(article => {
                if (!article.isPublished && article.authorUser.username === authorUser.username) {
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
            :
            <Grid className="centered">
              <p>You have no drafts.</p>
              <Button handleBtnClick={() => history.push('/create')}>Create an article</Button>
            </Grid>
          }
        </div>

        :
        <Unauthorized />
      }
    </Container>

  )
}

export default Drafts