import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/togglable'
import BlogForm from './components/blogForm'

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

  const blogFormRef = useRef()

  // mielestäni käyttäjälle parempi jos järjestäminen tehdään alussa, eikä enää sen jälkeen
  // muutoin voisi kutsua sortByLikes likettämisen yhteydessä.
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
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


  const createNewBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      console.log('newBlog in hadleNewBlog', newBlog);
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()
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
/*
  const sortBlogsByLikes = () => {
    setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  }
*/
  const blogsList = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} 
          setSuccess={setSuccess} setErrorMessage={setErrorMessage} 
          user={user} 
          setBlogs={setBlogs} blogs={blogs} />
        )}
      </div>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createNewBlog={createNewBlog} />
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
      <Notification message={errorMessage} success={success} />
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