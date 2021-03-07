import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setSuccess, setErrorMessage, user, setBlogs, blogs }) => {
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
  console.log('Blog user', user, 'ja blog', blog)


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

  const deleteBlog = async () => {
    if (user.username === blog.user.username && window.confirm(`delete blog ${blog.title}`)) {
      await blogService.remove(blog.id)
      setSuccess(true)
      setErrorMessage('Blog removed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } else {
      setSuccess(false)
      setErrorMessage('Nothing to delete here')
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
        {user.username === blog.user.username ? //username = unique
          <button onClick={deleteBlog}>delete</button> :
          null
        }
      </div>
    </div>

  )
}

export default Blog
