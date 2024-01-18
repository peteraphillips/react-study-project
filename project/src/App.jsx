import { useState } from 'react'

const Header = () => <h1>Give Feedback</h1>

const Display = props => <div>{props.value}</div>

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
      <Display value={good} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Display value={neutral} />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Display value={bad} />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
    </div>
  )
}

export default App
