import React, { useState } from 'react'

const Filter = (props) => {
  console.log('filter:', props.filter, 'handler', props.handleFilterChange)
  return (
    <div>
      <form>
        filter: <input
          value={props.filter}
          onChange={props.handleFilterChange}
        ></input>
      </form>
    </div>
  )
}

const SubmitForm = (props) => {
  //Varmaan tästä toivottaisiin jotain hieman paremmin jaoteltua kokonaisuutta...
  return (
    <div>
      <form onSubmit={props.addName}>
        Name: <input
          value={props.newName}
          onChange={props.handleNewNameChange}
        ></input>
        Number: <input
          value={props.newNumber}
          onChange={props.handleNewNumberChange}
        ></input>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

const ShowNumbers = (props) => {
  return (
    <ul>
      {props.numbersToShow().map(person => <li key={person.id}>{person.name} {person.number}</li>
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0401231244', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('add new name')
  const [newNumber, setNewNumber] = useState('add new Number')
  const [filter, setFilter] = useState('')

  const allreadyInBook = () => {
    let inBook = false
    persons.map(person => {
      // ja tästä toivottavasti muistamme miten funktiota kutsutaan.......
      console.log('Nimi:', person.name, 'newname', newName)
      console.log('ehto:', person.name === newName)
      if (person.name === newName) {
        inBook = true
      }
    })
    return inBook
  }

  const addName = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    console.log(newName, 'includes', persons.includes(newName))
    if (allreadyInBook()) {
      alert(`${newName} is already in the phonebook`)
    } else {
      setPersons(persons.concat(newObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNewNameChange = (event) => {
    /*    console.log('value: ', event.target.value)
        console.log('Name handler: ', event)
    */
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log('handleFilth', event.target.value)
    setFilter(event.target.value)
  }

  const numbersToShow = () => {
    if (filter.length === 0) {
      return persons
    }

    return persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    // ja nyt on näköjään vaikea tajuta että funktiosta voisi jotain palauttaakin..
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new number</h2>
      <SubmitForm addName={addName} newName={newName} newNumber={newNumber}
        handleNewNameChange={handleNewNameChange} handleNewNumberChange={handleNewNumberChange} />
      <h2>Numbers</h2>
      <ShowNumbers numbersToShow={numbersToShow} />
    </div>
  )

}

export default App