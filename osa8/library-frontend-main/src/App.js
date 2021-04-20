import React, { useState } from 'react'
import { gql, useApolloClient, useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

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
    genres
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
  console.log("all Auth And Books", allAuthorsAndBooksResult)

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
        <button onClick={() => setPage('recommend')}>recommend</button>
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

      <Recommend
        show={page === 'recommend'}
      />

    </div>
  )
}

export default App