import { useState } from 'react'

const StatisticsLine = (props) => {
  return (
    <>
      <div>{props.text} {props.value}</div>
    </>
  )
}

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
      <StatisticsLine text="Good" value={good} />
      <StatisticsLine text="Neutral" value={neutral} />
      <StatisticsLine text="Bad" value={bad} />
      <StatisticsLine text="All" value={getTotalFeedbacks()} />
      <StatisticsLine text="Average" value={getAverageFeedback()} />
      <StatisticsLine text="Positive" value={getPositiveFeedback() + " %"} />
    </>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
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
        <Button onClick={() => setGood(good + 1)} text="Good" /> &nbsp;&nbsp;
        <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" /> &nbsp;&nbsp;
        <Button onClick={() => setBad(bad + 1)} text="Bad" /> &nbsp;&nbsp;
      </div>
      
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App