import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/authorlogin'

const authorLogin = (authorUserObject) => {
  const request = axios.post(baseUrl, authorUserObject)
  return request.then(response => response.data)
}

const authorLoginServices = {
  authorLogin
}

export default authorLoginServices