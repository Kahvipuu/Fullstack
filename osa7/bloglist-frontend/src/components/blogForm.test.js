import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './blogForm'


describe('BlogForm updates and submits correct', () => {
  test('like button pressed twice', () => {

    const createNewBlog = jest.fn()
    const component = render(
      <BlogForm createNewBlog={createNewBlog}></BlogForm>
    )
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'title correct test' }
    })
    fireEvent.change(author, {
      target: { value: 'author correct test' }
    })
    fireEvent.change(url, {
      target: { value: 'url correct test' }
    })
    fireEvent.submit(form)

    //alan huomaamaan että logeja pitäisi välillä myös poistaa...
    const submitContent = createNewBlog.mock.calls[0][0]
    console.log('create NEW BLOG UPDATE sc', submitContent)
    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0].title).toBe('title correct test')
    expect(createNewBlog.mock.calls[0][0].author).toBe('author correct test')
    expect(createNewBlog.mock.calls[0][0].url).toBe('url correct test')
  })
})

