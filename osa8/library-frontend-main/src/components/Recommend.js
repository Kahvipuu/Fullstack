import { gql, useLazyQuery, useQuery } from '@apollo/client'

const ME = gql`
  query{
    me{
      username
      favoriteGenre
      id
    }
  }
`
const FAVORITE_GENRE = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre){
      title
      published
      author{name, id}
    }
  }
`

const Recommend = (props) => {
  const [getBooks, booksResult] = useLazyQuery(FAVORITE_GENRE)
  const meResult = useQuery(ME, {
    onCompleted: d => {
      getBooks({ variables: { genre: d.me.favoriteGenre } })  
    }
  })

  if (!props.show) {
    return null
  }
  if (meResult.loading) {
    return <div>loading...</div>
  } 

  console.log("meResult", meResult)
  console.log("favGenre meResult", meResult.data.me.favoriteGenre)
  console.log("books Result", booksResult)

  if (booksResult.loading) {
    return <div>loading...</div>
  } else if (!booksResult.data.allBooks) {
    return (
      <div>
        <h2>{`No books in your favorite genre "${meResult.data.me.favoriteGenre}"`}</h2>
      </div>

    )
  }

  return (
    <div>
      <h2>{`books in your favorite genre "${meResult.data.me.favoriteGenre}"`}</h2>
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
          {booksResult.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend


