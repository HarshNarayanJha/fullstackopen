import { useSelector, useDispatch } from 'react-redux'
import Filter from './components/Filter'
import Anecdotes from './components/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App
