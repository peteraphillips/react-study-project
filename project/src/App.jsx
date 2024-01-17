const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />

      <Content parts={parts} />

      <Total parts={parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>
        Course: {props.course}
      </h1>
    </div>
  )
}

const Content = (props) => {
    return (
      <div>
        <Part part={props.parts[0]}/>
        <Part part={props.parts[1]}/>
        <Part part={props.parts[2]}/>
      </div>
    )
}

const Part = (props) => {
  console.log(props.part)

    return (
      <>
        <p>{props.part.name} {props.part.exercises}</p>
      </>
    )

}

const Total = (props) => {

  let y = 0

  props.parts.forEach(value => {
    y += value.exercises
  })

  return (
    <div>
      <p>Number of exercises: {y}</p>
    </div>
  )
}

export default App
