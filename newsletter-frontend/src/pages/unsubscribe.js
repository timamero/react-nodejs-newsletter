import React from "react"
import Container from "../components/container"
import Grid from "../components/grid"
import EmailForm from "../components/emailForm"

const Unsubscribe = ({handleUnsubscribeSubmit}) => {
  return (
    <Container>
      <h1>Update Email Settings</h1>
      <Grid rowGap="2rem" numOfItems="2" className="centered">
        <p>{`Are you sure you want to remove the email (email here) and unsubscribe from all newsletters?`}</p>
        <EmailForm id="unsubscribeEmail" handleEmailSubmit={handleUnsubscribeSubmit}/>
      </Grid>
    </Container>
  )
}

export default Unsubscribe