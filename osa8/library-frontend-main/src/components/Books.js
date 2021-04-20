
import React, { useState, useEffect } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState(props.books)
  const allBooks = props.books

  useEffect(() => {
    if (genre) {
      setBooks(allBooks.filter(b => b.genres.includes(genre)))
    } else {
      setBooks(allBooks)
    }
  }, [genre]) // eslint-disable-line

  console.log("props in Books", props)
  if (!props.show) {
    return null
  }

  const mapGenres = props.books.flatMap(b => b.genres)
  console.log("genres in Books", mapGenres)
  const genres = [...new Set(mapGenres)]
  console.log(genres)
  console.log("chosen genre in Books", genre)
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <table>
          <tbody>
            {genres.map(g =>
              <tr key={g}>
                <td>
                  <button onClick={() => setGenre(g)}>{g}</button>
                </td>
              </tr>
            )}
            <tr>
              <td>
                <button onClick={() => setGenre(null)}>all Genres</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Books