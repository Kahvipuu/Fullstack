import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const AnecdoteWithMostVotes = (props) => {
  console.log(props)
  if (props.mostVotes === 0) {
    return (
      <p>No votes given</p>
    )
  }

  return (
    <div>
      <p>{props.anecdotes[props.mostVotesIndex]}</p>
      <p>has {props.mostVotes} votes</p>
    </div>

  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotesIndex, setMostIndex] = useState(0)
  const [mostVotes, setMost] = useState(0)
  /* Hieman monimutkainen rakenne, ja mostVotesCheck toimii jotenkin oudosti...
   ilmeisesti ei päivity täysin samassa tahdissa kuin ajattelen.. 
   -> mostVotes = {votes[mostVotesIndex]} toimii mutta mostVotes = {mostVotes} ei toimi
  */
  const saveVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    mostVotesCheck()
  }

  const mostVotesCheck = () => {
    if (votes[selected] > mostVotes) {
      setMost(votes[selected])
      setMostIndex(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => saveVote()}>vote</button>
      <button onClick={() => setSelected(Math.floor((Math.random() * anecdotes.length)))} >next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <AnecdoteWithMostVotes anecdotes={props.anecdotes} mostVotes = {votes[mostVotesIndex]} mostVotesIndex = {mostVotesIndex} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)