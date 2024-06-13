import { useState } from 'react'

const Statistics = (props) => {

  const { good, neutral, bad } = props

  const getTotalFeedbacks = () => good + neutral + bad
  const getAverageFeedback = () => {
    if (getTotalFeedbacks() == 0 && neutral == 0) return 0
    return (good - bad) / getTotalFeedbacks();
  }
  const getPositiveFeedback = () => {
    if (getTotalFeedbacks() == 0 && neutral == 0) return 0
    return good / getTotalFeedbacks() * 100;
  }

  if (getAverageFeedback() == 0 && neutral == 0) return (
    <>
      <p>No feedback given</p>
    </>
  )

  return (
    <>
      <div>Good {good}</div>
      <div>Neutral {neutral}</div>
      <div>Bad {bad}</div>
      <div>All {getTotalFeedbacks()}</div>
      <div>Average {getAverageFeedback()}</div>
      <div>Positive {getPositiveFeedback()} %</div>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>

      <div>
        <button onClick={() => setGood(good + 1)}>Good</button> &nbsp;&nbsp;
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button> &nbsp;&nbsp;
        <button onClick={() => setBad(bad + 1)}>Bad</button> &nbsp;&nbsp;
      </div>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App