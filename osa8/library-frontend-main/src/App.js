import React, { useState } from 'react'
import { gql, useApolloClient, useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const ALL_AUTHORS_AND_BOOKS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
  allBooks {
    title
    published
    id
    author{name, id}
  }
}`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const allAuthorsAndBooksResult = useQuery(ALL_AUTHORS_AND_BOOKS)

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (allAuthorsAndBooksResult.loading) {
    return <div>loading...</div>
  }

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm setToken={setToken} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Authors
        show={page === 'authors'} authors={allAuthorsAndBooksResult.data.allAuthors}
      />

      <Books
        show={page === 'books'} books={allAuthorsAndBooksResult.data.allBooks}
      />

      <NewBook
        show={page === 'add'} allBooksQuery={ALL_AUTHORS_AND_BOOKS}
      />

    </div>
  )
}

export default App