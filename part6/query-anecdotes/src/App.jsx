import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { getAnecdotes, createAnecdote, updateAnecdote } from './utils/request'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data)
  })

  if (result.isLoading) {
    return <div>Loading Data...</div>
  }

  if (result.isError) {
    return <div>anecdote service is not available due to server problems</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
