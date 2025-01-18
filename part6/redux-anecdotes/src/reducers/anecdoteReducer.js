import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnectode(state, action) {
      state.push(action.payload)
    },
    replaceAnectode(state, action) {
      const updated = action.payload
      return state.map(e => e.id !== updated.id ? e : updated)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { appendAnectode, setAnecdotes, replaceAnectode } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnectode(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(id)
    dispatch(replaceAnectode(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
