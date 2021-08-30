const fs = require('fs')

const unsubscribeURL = 'http://localhost:3000/unsubscribe'
const from = 'welcome@newsletter.com'
const subject = 'Newsletter Subscription Confirmation'
const text = `Welcome to the newsletter  
Thank you for subscribing!  
Go to ${unsubscribeURL} to unsubscribe
`
// const html = `<p style="text-align:center;font-size:1.5rem;font-weight:500;font-family:FreeMono,monospace;">Welcome to the newsletter</p>
// <p style="text-align:center;font-family:FreeMono,monospace;">Thank you for subscribing!<p>
// <br>
// <a href=${unsubscribeURL} style="text-align:center;">Go here to unsubscribe<a>
// `
const htmlStream = fs.createReadStream('./welcome.html')

const message = {
  from: from,
  subject: subject,
  text: text,
  html: htmlStream,
}

module.exports = message