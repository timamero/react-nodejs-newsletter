import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/articles'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => {
    return response.data})
}

const getOneEdit = (id) => {
  const request = axios.get(`${baseUrl}/edit/${id}`)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  console.log('articleService - update')
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const updateAndSend = (id, newObject) => {
  console.log('articleService - updateAndSend')
  const request = axios.put(`${baseUrl}/send/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteObj = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const articleServices = {
  getAll,
  getOne,
  getOneEdit,
  create,
  update,
  updateAndSend,
  deleteObj
}

export default articleServices