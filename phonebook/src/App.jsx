import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const exists = (value) => value.length > 0 ? true : false

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName
    }

    exists(persons.filter(i => i.name === newName))
    ? alert(`${newName} already exists`)
    : setPersons(persons.concat(personObject))
    
    setNewName('')

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
          <button onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
            <p>
              {person.name}
            </p>
          )}
      </div>
    </div>
  )
}

export default App