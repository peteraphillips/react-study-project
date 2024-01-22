import { useState } from 'react'

const Header = () => <h1>Give Feedback</h1>

const Display = props => <div>{props.rating}{props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

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
        <h2>Statistics </h2>
        <Display rating="Good:" value={good} />
        <Display rating="Neutral:" value={neutral} />
        <Display rating="Bad:" value={bad} />
      </div>
    </div>
  )
}

export default App
