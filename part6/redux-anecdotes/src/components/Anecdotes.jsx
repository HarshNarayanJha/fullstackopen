import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import { PropTypes } from "prop-types"

const Anecdote = ({ anecdote, vote }) => {
  // Add PropTypes validation
  Anecdote.propTypes = {
    anecdote: PropTypes.shape({
      content: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired
    }).isRequired,
    vote: PropTypes.func.isRequired
  }

  return (
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter.length === 0) {
      return anecdotes
    }

    return anecdotes.filter(e => e.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`You voted anecdote ${anecdote.content}.`, 5))
  }

  return (
    [...anecdotes].sort((a, b) => a.votes < b.votes).map(anecdote =>
      <div key={anecdote.id}>
        <Anecdote anecdote={anecdote} vote={vote} />
      </div>
    )
  )
}

export default Anecdotes
