import { useDispatch, useSelector } from "react-redux";
import { voteId } from "../reducers/anecdoteReducer";
import { PropTypes } from "prop-types";

const Anecdote = ({ anecdote, vote }) => {
  // Add PropTypes validation
  Anecdote.propTypes = {
    anecdote: PropTypes.shape({
      content: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired
    }).isRequired,
    vote: PropTypes.func.isRequired
  };

  return (
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const vote = (id) => {
    dispatch(voteId(id))
  }

  return (
    anecdotes.sort((a, b) => a.votes < b.votes).map(anecdote =>
      <div key={anecdote.id}>
        <Anecdote anecdote={anecdote} vote={vote} />
      </div>
    )
  )
}

export default Anecdotes
