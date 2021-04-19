import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'

const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int!){
    editAuthor(
      name: $name,
      setBornTo: $born
    ){
      name
      born
      id
    }
  }
`

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(UPDATE_AUTHOR)

  if (!props.show) {
    return null
  }
  const authors = props.authors

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name, born: Number(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set Birthy ear</h3>
      <div>
        <form onSubmit={submit}>
          <div>
            name
            <input value={name} onChange={({ target }) => setName(target.value)}>
            </input>
          </div>
          <div>
            born
            <input type={'number'} value={born} onChange={({ target }) => setBorn(target.value)}>
            </input>
          </div>
          <button type='submit'>update</button>
        </form>
      </div>
    </div>
  )
}

export default Authors