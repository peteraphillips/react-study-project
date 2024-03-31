import { useState } from 'react'

const Search = (props) => {

  var persons = props.persons

  const [newSearch, setNewSearch] = useState('')
  const [searchedPersons, setSearchedPersons] = useState('')


  const handleNewSearch = (event) => {
    event.preventDefault()
    setNewSearch(event.target.value)

  }

  const search = (event) => {
    event.preventDefault()


    setSearchedPersons(persons.filter(i => i.name.includes(newSearch)))
    setNewSearch('')
  }

  return (
    <div>
      <form>
        <div>
          search: <input 
            value={newSearch}
            onChange={handleNewSearch}
          />
        </div>
        <div>
          <button onClick={search}>Search</button>
        </div>
      </form>
      {searchedPersons.length > 0
      ? searchedPersons.map(i =>
      <div key={i.number}>
        <p>
            Name: {i.name}{' '}
        </p>
        <p>
            Number: {i.number}
        </p>
        <hr/>
      </div>
      )
      : ''
      }

    </div>
  )
}

const PersonForm = (props) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  var persons = props.persons
  var setPersons = props.setPersons

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const exists = (value) => value.length > 0 ? true : false

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
  )
}

const Persons = (props) => {

  var persons = props.persons

  return (
    <div>
    {persons.map(person => 
        <div key={person.number}>
        <p>
            Name: {person.name}{' '}
        </p>
        <p>
            Number: {person.number}
        </p>
        <hr/>
        </div>
    )}
    </div>
  )

}

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  return (
    <div>
      <h2>Phonebook</h2>

      <Search persons={persons}/>    

      <PersonForm persons={persons} setPersons={setPersons}/>  

      <h2>Numbers</h2>

      <Persons persons={persons} />
    </div>
  )
}


export default App