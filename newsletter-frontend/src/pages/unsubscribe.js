import React from "react"
import Container from "../components/container"
import Grid from "../components/grid"
import EmailForm from "../components/emailForm"

const Unsubscribe = ({unsubscribe}) => {
  const handleUnsubscribeSubmit = (event) => {
    event.preventDefault()

    const emailToDelete = event.target.elements.unsubscribeEmail.value
    unsubscribe(emailToDelete)
      .then(result => window.alert('You have unsubscribed to the newsletter.'))
      .catch(error => window.alert('That email does not exist or it was already deleted.'))
  }

  return (
    <Container>
      <h1>Update Email Settings</h1>
      <Grid rowGap="2rem" numOfItems="2" className="centered">
        <p>{`Are you sure you want to unsubscribe from all newsletters?`}</p>
        <EmailForm 
          id="unsubscribeEmail" 
          handleEmailSubmit={handleUnsubscribeSubmit}
          submitValue="Yes, unsubscribe."
          />
      </Grid>
    </Container>
  )
}

export default Unsubscribe