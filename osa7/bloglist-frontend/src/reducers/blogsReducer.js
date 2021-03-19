import blogService from '../services/blogs'

const initialState = []

const blogReducer = (state = initialState, action) => {
  let id
  switch (action.type) {
    case 'LIKE':
      id = action.data.id
      return state.map(a =>
        a.id !== id ? a : action.data
      ).sort((a, b) => b.votes - a.votes)
    case 'DELETE':
      id = action.data.id
      return state.filter(b => b.id !== id)
    case 'CREATE_NEW':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}
// const blog = { title, author, url } +id

export const likeBlog = (blog) => {
  return async dispatch => {
    const newLikes = blog.likes + 1
    const likedBlog = {
      ...blog, likes: newLikes
    }
    const updatedBlog = await blogService.update(likedBlog)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'DELETE',
      data: blog
    })
  }
}

export const createNewBlog = (newBlog) => {
  return async dispatch => {
    const createdBlog = await blogService.create(newBlog)
    dispatch({
      type: 'CREATE_NEW',
      data: createdBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs.sort((a, b) => b.likes - a.likes)
    })
  }
}

export default blogReducer