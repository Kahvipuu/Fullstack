import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { gql, useQuery } from '@apollo/client'

const ALL_AUTHORS_AND_BOOKS = gql`
query {
  allAuthors {
    name,
    born,
    bookCount
    id
  }
  allBooks {
    title,
    author,
    published
    id
  }
}`

const App = () => {
  const [page, setPage] = useState('authors')
  const result = useQuery(ALL_AUTHORS_AND_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} authors={result.data.allAuthors}
      />

      <Books
        show={page === 'books'} books={result.data.allBooks}
      />

      <NewBook
        show={page === 'add'} allBooksQuery={ALL_AUTHORS_AND_BOOKS}
      />

    </div>
  )
}

export default App