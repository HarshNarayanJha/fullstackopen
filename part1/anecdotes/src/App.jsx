import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const getRandomIndex = (i) => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const rindex = Math.floor(Math.random() * i)
      if (rindex !== selected) return rindex

    }
  }

  const vote = (index) => {
    setVotes(votes.map((c, i) => {
      if (i == index) {
        return c + 1
      } else {
        return c 
      }
    }))
  }

  const getMaxVotedAnectode = () => {
    let mostVoted = 0
    let mostVotedIndex = 0
    votes.forEach((vote, c) => {
      if (vote > mostVoted) {
        mostVoted = vote
        mostVotedIndex = c
      }
    })

    return mostVotedIndex
  }

  return (
    <div>
      <h1>Anectode of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>

      <div>
        <button onClick={() => { vote(selected) }}>vote</button>
        &nbsp;&nbsp;
        <button onClick={() => { setSelected(getRandomIndex(anecdotes.length)) }}>next anectode</button>
      </div>

      <h1>Anectode with most Votes</h1>
      <div>{anecdotes[getMaxVotedAnectode()]}</div>
      <div>has {votes[getMaxVotedAnectode()]} votes</div>
    </div>
  )
}

export default App