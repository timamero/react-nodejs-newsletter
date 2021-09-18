# Newsletter Web Application

## Description
Newsletter website and subscription application. Authors can create and edit articles, publish articles to the website, and email articles to subscribers. 
- The content of articles is written in [showdown's markdown syntax](https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax). 
- A welcome email is automatically sent to new subscribers.
- Visitors to website can like articles.

### Tech Stack
- React (this project was created with [create-react-app](https://create-react-app.dev/))
- NodeJS
- Express
- MongoDB

### Front-end Dependencies
- [react-router-dom](https://reactrouter.com/web/guides/quick-start)

### Back-end Dependencies
- [nodemailer](https://nodemailer.com/about/)
- [showdown](https://github.com/showdownjs/showdown)

## Getting Started
1. Clone this repository
  '''
  git clone https://github.com/timamero/react-nodejs-newsletter.git
  '''
2. Install backend dependencies
  ```
  cd react-nodejs-newsletter/newsletter-backend
  npm install
  ```
3. Install front-end dependencies
  ```
  cd ..
  cd newsletter-frontend
  npm install
  ```
4. Add .env file in the folder newsletter-backend (don't forget to add this to your .gitignore file)
5. Set the following environment variables to your .env file
    - MONGODB_URI
      - The address to your MongoDB connection
      - You'll need to [create an account with MongoDB](https://www.mongodb.com/cloud/atlas)
      - Create a cluster and connect ([see the procedure here](https://docs.mongodb.com/guides/cloud/connectionstring/))
    - PORT
      - Backend server port
    - SECRET
      - Can be any string
      - Used by jsonwebtoken to [create digital signatures](https://www.npmjs.com/package/jsonwebtoken#usage)
    - FILE_PATH
      - Absolute file path to newletter-backend
      - To see usage, see file newletter-backend/config/middleware.js
      - Example post request to create an new author user using VS CODE REST client: 
        ```
        POST http://localhost:3001/api/authorusers
        Content-Type: application/json

        {
          "articles": [],
          "username": "admin",
          "name": "Admin",
          "password": "adminsecret"
        }
        ```

    The following variables are required for Nodemailer. [See the Nodemailer documentation.](https://nodemailer.com/smtp/). If you want to start the project without mailing functionality, you can comment out the code in newsletter-backend/config/middleware.js
    - HOST
      - Email host or IP address to connect to
    - EMAIL_PORT
    - EMAIL_POOL_PORT
    - MAIL_USER
    - MAIL_PASSWORD
6. Add an author user. 
    - Currently, there is no way in the front-end to add a new user
    - Must be done with an HTTP post request
    - There are many tools that can be used to send HTTP requests such as [VS CODE REST client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client), [Postman](https://www.getpostman.com/) and [curl](https://curl.se/)
    - Example post request with VS CODE REST client to create an author user: 
      ```
      POST http://localhost:3001/api/authorusers
      Content-Type: application/json

      {
        "articles": [],
        "username": "olik",
        "name": "oli k",
        "password": "oliksecret"
      }
      ```
7. Start the back-end server. Go to the folder newsletter-backend and run the following command.
  ```
  npm run dev
  ``
8. Open a new terminal and go to folder newsletter-frontend. Run the following command.
  ```
  npm run start
  ```
9. Sign in as user created in step 6.