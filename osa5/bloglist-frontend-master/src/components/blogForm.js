import React, { useState } from 'react'

const BlogForm = ({ createNewBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = (event) => {
        event.preventDefault()
        const blog = { title, author, url }
        createNewBlog(blog)
        console.log('newBlog in hadleNewBlog', blog);
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h3>Create new blog</h3>
            <form onSubmit={createBlog}>
                <div>
                    title:
                    <input
                        type='text'
                        value={title}
                        name='Title'
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type='text'
                        value={author}
                        name='Author'
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        type='text'
                        value={url}
                        name='Url'
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    )

}

export default BlogForm