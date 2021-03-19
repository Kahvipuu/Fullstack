import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { createNewBlog } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'
import { notificationSuccess, notificationFail } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const createBlog = (event) => {
    event.preventDefault()
    const blog = { title, author, url }
    try {
      dispatch(createNewBlog(blog))
      dispatch(notificationSuccess('Blog added successfully'))
      console.log('newBlog in hadleNewBlog', blog)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (e) {
      dispatch(notificationFail(e.errorMessage))
    }
  }

  return (
    <div>
      <h3>Create new blog</h3>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            id='title'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='createBlogButton' type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm