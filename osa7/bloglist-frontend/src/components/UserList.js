import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
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
      <h3>Users</h3>
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              Blogs created
            </TableCell>
          </TableHead>
          <TableBody>
            {users.map(user =>
              <User key={user.id}
                user={user}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

const User = ({ user }) => {
  console.log('user in User', user)
  return (
    <TableRow>
      <TableCell>
        <Link to={`/users/${user.id}`}>
          {user.username}
        </Link>
      </TableCell>
      <TableCell>
        {user.blogs.length}
      </TableCell>
    </TableRow>
  )
}

export default UserList