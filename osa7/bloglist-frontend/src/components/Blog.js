import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { notificationFail, notificationSuccess } from '../reducers/notificationReducer'
import { deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog, user, addLike }) => {
  const dispatch = useDispatch()

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

  const removeBlog = async () => {
    if (user.username === blog.user.username && window.confirm(`delete blog ${blog.title}`)) {
      dispatch(deleteBlog(blog))
      dispatch(notificationSuccess('Blog removed'))
    } else {
      dispatch(notificationFail('Nothing to delete here'))
    }
  }

  //noooh, hieman outo ratkaisu nyt kun yrittää saada testit toimimaan toivotusti
  const like = () => {
    addLike(blog, liked, setLiked)
  }

  return (
    <div>
      <div style={hideWhenVisible} className='hide'>
        {blog.title}
        <button id='viewButton' onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='show'>
        <p>{blog.title}</p>
        <p>author: {blog.author}</p>
        <p>likes: {blog.likes}
          <button id='likeButton' onClick={like}>like</button>
        </p>
        <p>url: {blog.url}</p>
        <p>by user: {blog.user.username}</p>
        <button id='hideButton' onClick={toggleVisibility}>hide</button>
        {user.username === blog.user.username ? //username = unique
          <button id='deleteButton' onClick={removeBlog}>delete</button> :
          null
        }
      </div>
    </div>

  )
}

export default Blog
