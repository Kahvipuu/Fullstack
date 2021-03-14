import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (event) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    console.log('newAnecdote', content)
    event.target.newAnecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createNewAnecdote(newAnecdote))
    dispatch(changeNotification(`You added anecdote: ${content}`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='newAnecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}


export default AnecdoteForm