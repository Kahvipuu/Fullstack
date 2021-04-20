import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import Select from 'react-select'

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
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(UPDATE_AUTHOR)

  if (!props.show) {
    return null
  }
  /*
  authors.map(a => {
                  return [{ value: a.name, label: a.name }]
                })
  */

  const authors = props.authors
  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name: name.value, born: Number(born) } })

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
            <Select defaultValue={name}
              onChange={setName}
              options={authors.map(a =>
                ({ value: a.name, label: a.name })
              )}
            >
            </Select>
          </div>
          <div>
            born
            <input type={'number'} value={born}
              onChange={({ target }) => setBorn(target.value)} />
          </div>
          <button type='submit'>update</button>
        </form>
      </div>
    </div>
  )
}

export default Authors