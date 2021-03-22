import axios from 'axios'
const baseUrl = '/api/login'
const userUrl = '/api/users'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const getAllUsers = async () => {
  console.log('getAllusers, before .get')
  const response = await axios.get(userUrl)
  console.log('getAllusers', response.data)
  return response.data
}

export default { login, getAllUsers }