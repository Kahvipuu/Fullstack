import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
//import { prettyDOM } from '@testing-library/dom'

describe('Content renders', () => {

  let blog
  let user
  let component
  let mockHandlerAddLike

  beforeEach(() => {
    blog = {
      title: 'Render Component testing is done with react-testing-library',
      author: 'AuthorRender',
      url: 'UrlRender',
      likes: 1,
      user: { username: 'Render username' }
    }

    user = {
      username: {
        type: 'RenderUserUsername',
      },
      name: 'UserName',
      passwordHash: 'RenderPassHash',
      blogs: [
        {
          title: 'RenderTest'
        }
      ]
    }
    mockHandlerAddLike = jest.fn()
    component = render(
      <Blog blog={blog} user={user} addLike={mockHandlerAddLike} />
    )
  })
  /*
    test('Pretty log', () => {
      const div = component.container.querySelector('div')
      console.log(prettyDOM(div))
    })
  */
  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'Render Component testing is done with react-testing-library' && 'AuthorRender'
    ) //testi authorRender toimiiko &&... näköjään toimii
  })

  test('does not render hidden components', () => {
    const div = component.container.querySelector('.hide')
    expect(div).not.toHaveStyle(
      'display: none'
    )
  })

  test('toggleVisibility shows hidden content', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.show')
    expect(div).not.toHaveStyle(
      'display: none'
    )
  })

  test('like button pressed twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandlerAddLike.mock.calls).toHaveLength(2)
  })

})

