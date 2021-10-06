import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/preview'

let token

const getToken = newToken => {
  token = `bearer ${newToken}`
}

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => {
    return response.data})
}

const getOneEdit = (id) => {
  const request = axios.get(`${baseUrl}/edit/${id}`)
  return request.then(response => {
    return response.data})
}

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const deleteObj = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const deleteAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/`, config)
}

const previewServices = {
  getOne,
  getOneEdit,
  create,
  deleteObj,
  deleteAll,
  getToken
}

export default previewServices