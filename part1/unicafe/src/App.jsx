import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const getTotalFeedbacks = () => good + neutral + bad
  const getAverageFeedback = () => {
    return (good - bad) / getTotalFeedbacks();
  }
  const getPositiveFeedback = () => {
    return good / getTotalFeedbacks() * 100;
  }

  return (
    <div>
      <h1>Give Feedback</h1>

      <div>
        <button onClick={ () => setGood(good + 1) }>Good</button> &nbsp;&nbsp;
        <button onClick={ () => setNeutral(neutral + 1) }>Neutral</button> &nbsp;&nbsp;
        <button onClick={ () => setBad(bad + 1) }>Bad</button> &nbsp;&nbsp;
      </div>

      <h2>Statistics</h2>

      <div>Good { good }</div>
      <div>Neutral { neutral }</div>
      <div>Bad { bad }</div>
      <div>All { getTotalFeedbacks() }</div>
      <div>Average { getAverageFeedback() }</div>
      <div>Positive { getPositiveFeedback() } %</div>
    </div>
  )
}

export default App