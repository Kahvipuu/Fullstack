import React from 'react'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h4>Added blogs</h4>
      {user.blogs.map(blog =>
        <p key={blog.id}>
          {blog.title}
        </p>
      )}
    </div>
  )
}

export default User