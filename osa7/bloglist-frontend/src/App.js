import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/togglable'
import BlogForm from './components/blogForm'
import Notification from './components/Notification'
import { notificationFail, notificationSuccess } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { userLogin, userLogout } from './reducers/userReducer'
const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.loggedInUser)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedYouSir')
    if (loggedUserJSON) {
      const loggedInUser = JSON.parse(loggedUserJSON)
      dispatch(userLogin(loggedInUser))
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userToLogin = await loginService.login({
        username, password,
      })
      dispatch(userLogin(userToLogin))
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedYouSir', JSON.stringify(userToLogin))
      blogService.setToken(userToLogin.token)
      dispatch(notificationSuccess('Logged in successfully'))
    } catch (exception) {
      dispatch(notificationFail('wrong credentials'))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    dispatch(userLogout())
    window.localStorage.removeItem('loggedYouSir')
  }

  const addLike = async (blog, liked, setLiked) => {
    if (liked === false) {
      try {
        blog.likes += 1
        await blogService.update(blog.id, blog)
        setLiked(true)
        dispatch(notificationSuccess('Blog liked'))
      } catch (exception) {
        dispatch(notificationFail('Nothing to see here'))
      }
    } else {
      dispatch(notificationFail('You have already liked this blog'))
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input id='usernameInLogin' type='text' value={username} name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input id='passwordInLogin' type='text' value={password} name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='loginButton' type='submit'>login</button>
      </form>
    </div>
  )

  const blogsList = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id}
            blog={blog}
            user={user}
            blogs={blogs}
            addLike={addLike}
          />
        )}
      </div>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  const logout = () => (
    <div>
      <form onSubmit={handleLogout}>
        <button type='submit'>logout</button>
      </form>
    </div>
  )

  return (
    <div>
      <h1>Blog app</h1>
      <Notification />
      {console.log('user in return', user)}
      {user === null ?
        loginForm() :
        <div>
          <p>{user.username} logged in</p>
          {logout()}
          {blogForm()}
          {blogsList()}
        </div>
      }
    </div>
  )

}

export default App