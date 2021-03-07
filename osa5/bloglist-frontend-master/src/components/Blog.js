import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setSuccess, setErrorMessage }) => {
  const [visible, setVisible] = useState(false)
  const [liked, setLiked] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showWhenVisible = visible ? blogStyle : { display: 'none' }
  const hideWhenVisible = visible ? { display: 'none' } : blogStyle

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    if (liked === false) {
      try {
        blog.likes += 1
        await blogService.update(blog.id, blog)
        setLiked(true)

        setSuccess(true)
        setErrorMessage('Blog liked')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      } catch (exception) {
        setSuccess(false)
        setErrorMessage('Nothing to see here')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      }

    } else {
      setSuccess(false)
      setErrorMessage('You have already liked this blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

    }
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.title}</p>
        <p>author: {blog.author}</p>
        <p>likes: {blog.likes}
          <button onClick={addLike}>like</button>
        </p>
        <p>url: {blog.url}</p>
        <p>by user: {blog.user.username}</p>
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>

  )
}

export default Blog
