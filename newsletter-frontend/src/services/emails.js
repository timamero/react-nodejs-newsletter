const email = [
  {
    id: 1,
    email: "roy@example.com"
  },
  {
    id: 2,
    email: "jess@example.com"
  }
]

const getAll = () => {
  return email
}

const emailServices = {
  getAll,
}

export default emailServices