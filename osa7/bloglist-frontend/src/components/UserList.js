import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/login'

/*
const getUsers = async () => {
  const response = await userService.getAllUsers()
  console.log('response in userList', response)
  return response.data
}
*/

const UserList = ({ users }) => {
  console.log('userList')
  /*  const [users, setUsers] = useState({user: 'user'})
    setUsers(getUsers()) */
  console.log('users in userList', users)

  return (
    <div>
      { users.length === 0 ? 'loading users' :
        mapUsers(users)}
    </div>
  )
}

const mapUsers = (users) => {
  return (
    <div>
      <h1>Users</h1>
      {users.map(user =>
        <User key={user.id}
          user={user}
        />
      )}
    </div>
  )
}

const User = ({ user }) => {
  console.log('user in User', user)
  return (
    <div>
      <Link to={`/users/${user.id}`}>
        {user.username}
      </Link>
      <p>
        blogs created {user.blogs.length}
      </p>
    </div>
  )
}

export default UserList