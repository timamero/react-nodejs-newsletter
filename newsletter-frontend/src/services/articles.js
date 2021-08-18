import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/articles'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const articleServices = {
  getAll,
  create
}

export default articleServices