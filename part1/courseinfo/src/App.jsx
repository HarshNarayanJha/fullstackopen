import './App.css'

const Hello = (props) => {
  console.log(props)
  return (
    <>
      <p>Hello { props.name } with { props.age } years of breathing experience!</p>
    </>
  )
}

function App() {

  const name = "Peach"
  const age = 20

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Mario" age={ 10 } />
      <Hello name="Luigi" age = { age - 15 }/>
      <Hello name={ name } age={ age } />
    </>
  )
}

export default App
