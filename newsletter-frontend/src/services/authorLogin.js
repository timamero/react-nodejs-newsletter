import axios from 'axios'
const baseUrl = '/api/authorlogin'

const login = (authorUserObject) => {
  const request = axios.post(baseUrl, authorUserObject)
  return request.then(response => response.data)
}

const authorLoginServices = {
  login
}

export default authorLoginServices