import React, { useEffect, useState } from 'react'
import personService from './services/persons'

const Filter = (props) => {
  console.log('filter:', props.nameFilter, 'handler', props.handleFilterChange)
  return (
    <div>
      <form>
        filter: <input
          value={props.nameFilter}
          onChange={props.handleFilterChange}
        ></input>
      </form>
    </div>
  )
}

const SubmitForm = (props) => {
  //Varmaan tästä toivottaisiin jotain hieman paremmin jaoteltua kokonaisuutta...
  console.log('subForm', props);
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
  /* miksi täällä täytyy olla numberFilter() aaltosulkeilla,
   mutta ylempänä SubmitFormissa ei handleissa tarvitse?? (tai ei pidä olla) --ilmeisesti event vs funktio */
  console.log('ShowNum', props, 'ShowNum-persons', props.persons, 'ShowNum-nameFilt', props.nameFilter)
  const numbersToFilter = props.numberFilter()
  console.log('showNumFilter', numbersToFilter);
  return (
    <ul>
      {numbersToFilter.map(person => {
        return (
          <div key={person.id}>
            <li > {person.name} {person.number} </li>
            <button onClick={() => props.removeName(person)} >remove </button>
          </div>
        )
      })}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    /*    { name: 'Arto Hellas', number: '0401231244', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
        */
  ])
  const [newName, setNewName] = useState('add new name')
  const [newNumber, setNewNumber] = useState('add new Number')
  const [nameFilter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        console.log('1.datahaku', response.data);
        setPersons(response.data)
      })
  }, [])

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

  const getIdForName = (findName) => {
    const p = persons.find(person =>
      person.name === findName
    )
    return p.id
  }

  const addName = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber,
    }

    if (allreadyInBook()) {
      if (window.confirm(`${newObject.newName} is already in the phonebook, 
      do you wish to replace the old number?`)) {
        const idToChange = getIdForName(newName)
        const changedPerson = { ...(persons.find(n => n.name === newName)), number: newNumber }
        personService
          .update(idToChange, changedPerson)
          .then(response => {
            setPersons(persons.map(p => p.id !== idToChange ? p : response.data))
          })
      }
    } else {
      personService
        .create(newObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removeName = (person) => {
    console.log('removeName event', person)
    if (window.confirm(`Remove ${person.name}`)) {
      personService
        .remove(person.id)
        .then(
          setPersons(
            persons.filter(personOld =>
              (personOld.id !== person.id)
            )
          )
        )
    }
    /*   tää ei oikein toiminu, ehkä promise ongelma... 
    oli vielä "pending" kun kaatui .map ei ole funkkari virheeseen 
    setPersons(personService
          .getAll()
          .then(response => { setPersons(response.data) })
        ) */
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

  const numberFilter = () => {
    console.log('NumFilter-persons', persons, 'NumFilter-nameFilt', nameFilter)
    if (nameFilter.length === 0) {
      return persons
    }
    return persons.filter(person => person.name.toLocaleLowerCase().includes(nameFilter.toLocaleLowerCase()))
    // ja nyt on näköjään vaikea tajuta että funktiosta voisi jotain palauttaakin..
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new number</h2>
      <SubmitForm addName={addName} newName={newName} newNumber={newNumber}
        handleNewNameChange={handleNewNameChange} handleNewNumberChange={handleNewNumberChange} />
      <h2>Numbers</h2>
      <ShowNumbers removeName={removeName} persons={persons} nameFilter={nameFilter} numberFilter={numberFilter} />
    </div>
  )

}

export default App