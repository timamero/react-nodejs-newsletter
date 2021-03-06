import axios from 'axios'
const baseUrl = '/api/emails'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deleteObj = (email) => {
  return axios.delete(baseUrl, {
    data: {
      email: email
    }
  })
}

const emailServices = {
  getAll,
  create,
  deleteObj
}

export default emailServices