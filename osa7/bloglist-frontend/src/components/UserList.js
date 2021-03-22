import React, { useState } from 'react'
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
        users.map(user =>
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
      {user.username} blogs created {user.blogs.length}
    </div>
  )
}

export default UserList