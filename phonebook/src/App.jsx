import { useState, useEffect } from 'react'
import contactService from './services/contacts'
import Notification from './components/notification'


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
    ? window.confirm(`${newName} already exists`)    
    : contactService
      .create(personObject)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setNewName('')
        setNewNumber('')
      })
    
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

const Delete = (props) => {

  const removeContact = (event) => {
    event.preventDefault()

    const id = props.id
    const person = props.persons.filter(person => person.id === id)
    const name = person[0].name

    window.confirm(`Are you sure you want to delete ${name}`)
    ? contactService
        .remove(`${id}`)
    : window.close()

  }  

  return (
    <form>
      <button onClick={removeContact}>X</button>
    </form>
  )

}

const Persons = (props) => {

  const persons = props.persons
  const setPersons = props.setPersons

  const hook = () => {
    contactService
    .getAll()
    .then(initialContacts => {
      setPersons(initialContacts)
    })
  }
  
  useEffect(hook, [])

  return (
    <div>
    {persons.map(person => 
        <div key={person.id}>
        <p>
            Name: {person.name}{' '}
        </p>
        <p>
            Number: {person.number}
        </p>
        <Delete id={person.id} persons={persons} setPersons={setPersons}/>
        <hr/>
        </div>
    )}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} />

      <Search persons={persons}/>    

      <PersonForm persons={persons} setPersons={setPersons}/>  

      <h2>Numbers</h2>

      <Persons persons={persons} setPersons={setPersons}/>
    </div>
  )
}


export default App