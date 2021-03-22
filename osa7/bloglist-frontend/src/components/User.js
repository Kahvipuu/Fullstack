import React from 'react'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <h3>Added blogs</h3>
      {user.blogs.map(blog =>
        <p key={blog.id}>
          {blog.title}
        </p>
      )}
    </div>
  )
}

export default User