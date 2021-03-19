import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = newToken
  console.log('newToken in setToken', newToken)
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  console.log('Token in blogs.Create', token)
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.post(baseUrl, newObject, config)
  return request.data
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
}