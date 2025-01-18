import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const toVote = state.find(n => n.id === id)
      const voted = {
        ...toVote,
        votes: toVote.votes + 1
      }

      return state.map(e => e.id !== id ? e : voted)
    },
    appendAnectode(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { createAnecdote, voteAnecdote, appendAnectode, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
