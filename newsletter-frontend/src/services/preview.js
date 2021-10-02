import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/preview'

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
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deleteObj = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const previewServices = {
  getOne,
  getOneEdit,
  create,
  deleteObj
}

export default previewServices