const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.log.error(params)
}

module.exports = {
  info, error
}