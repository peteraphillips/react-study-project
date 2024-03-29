import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '07963397475' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const exists = (value) => value.length > 0 ? true : false

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    exists(persons.filter(i => i.name === newName))
    ? alert(`${newName} already exists`)
    : setPersons(persons.concat(personObject))
    
    setNewName('')
    setNewNumber('')

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input 
            value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNewNumber}  
          />
        </div>
        <div>
          <button onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
          <div key={person.number}>
            <p>
              Name: {person.name}{' '}
            </p>
            <p>
              Number: {person.number}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App