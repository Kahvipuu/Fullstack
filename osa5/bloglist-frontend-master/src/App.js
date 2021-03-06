import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const Notification = ({ message, success }) => {
  if (message === null) {
    return null
  }
  if (success) {
    return (
      <div className='success'>
        {message}
      </div>
    )
  } else {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
}

// lue uudestaan mitä oli nested html ongelmat!!
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [success, setSuccess] = useState(true)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedYouSir')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in:', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      console.log('user in HandleLogin', user); //token ok
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedYouSir', JSON.stringify(user))
      blogService.setToken(user.token)
      setSuccess(true)
      setErrorMessage('Logged in successfully')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    } catch (exception) {
      setSuccess(false)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedYouSir')
  }


  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = { title, author, url }
      const newBlog = await blogService.create(blog)
      console.log('newBlog in hadleNewBlog', newBlog);
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setSuccess(true)
      setErrorMessage('Blog added successfully')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    } catch (e) {
      setSuccess(false)
      setErrorMessage(e.errorMessage)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
        <input type='text' value={username} name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
        <input type='text' value={password} name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const blogsList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const blogForm = () => (
    <div>
      <h3>Create new blog</h3>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
        <input type='text' value={title} name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
        <input type='text' value={author} name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
        <input type='text' value={url} name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
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
      <Notification message={errorMessage} success={success} />
      { user === null ?
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