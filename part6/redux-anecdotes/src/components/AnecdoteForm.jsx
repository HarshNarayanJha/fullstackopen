import { useDispatch } from "react-redux"
import { create } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(create(content))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name="content" /></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
