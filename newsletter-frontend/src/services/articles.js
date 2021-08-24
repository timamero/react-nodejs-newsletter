import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/articles'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    console.log('getAll service - response.data', response.data)
    return response.data
  })
}

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => {
    console.log('getOne service - response.data', response.data)
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
  const request = axios.put(`${baseUrl}/${id}`, newObject)
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
  deleteObj
}

export default articleServices