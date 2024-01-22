import { useState } from 'react'

const Header = () => <h1>Give Feedback</h1>

const StatisticLine = (props) => <tr>{props.text}: {props.value}</tr>

const Button = (props) => {

  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {

  let total = (props.good + props.neutral + props.bad)
  let average = (props.good - props.bad)/total
  let percentage = (props.good/total)*100

  if (total > 0) {
    return (
      <div>
        <h2>Statistics </h2>
        <table>
          <tbody>
            <StatisticLine text="Good" value={props.good} />
            <StatisticLine text="Neutral" value={props.neutral} />
            <StatisticLine text="Bad" value={props.bad} />
            <StatisticLine text="Total" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Percentage" value={percentage} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <p>No Feedback Given</p>
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setValue = newValue => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      <Header />
      <div>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    </div>
  )
}

export default App
