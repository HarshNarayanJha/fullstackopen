import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../utils/request"
import { useNotification } from "./NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      showNotification(`you created '${newAnecdote.content}'`)
    },
    onError: (error) => {
      showNotification(error.response.data.error)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
