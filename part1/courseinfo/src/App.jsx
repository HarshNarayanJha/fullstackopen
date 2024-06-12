import './App.css'

function App() {

  const date = new Date()
  const a = 10
  const b = 20

  return (
    <div>
      <p>Hello World!, it is { date.toString() }</p>
      <p>{ a } plus { b } is { a + b }</p>
    </div>
  )
}

export default App
