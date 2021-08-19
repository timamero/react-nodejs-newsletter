import axios from "axios"
const baseUrl = 'http://localhost:3001/api/emails'

// const email = [
//   {
//     id: 1,
//     email: "roy@example.com"
//   },
//   {
//     id: 2,
//     email: "jess@example.com"
//   }
// ]

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const emailServices = {
  getAll,
}

export default emailServices