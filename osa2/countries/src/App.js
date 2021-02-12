import React, { useEffect, useState } from 'react'
import axios from 'axios'

const getAllCountries = () => {
  return axios.get('https://restcountries.eu/rest/v2/all')
}

const Filter = (props) => {
  return (
    <div>
      <form>
        Find countries: <input
          value={props.nameFilter}
          onChange={props.handleFilterChange}
        ></input>
      </form>
    </div>
  )
}


const ShowCountries = ({ nameFilter, setFilter, countries }) => {
  console.log('ShowC-filter', nameFilter, 'countries', countries)
  const filteredCountries = countries.filter(c => c.name.toLocaleLowerCase().includes(nameFilter.toLocaleLowerCase()))

  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify
      </div>
    )
  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <ul>
        {filteredCountries.map(c => {
          return (
            <div key={c.alpha3Code}>
              <li > {c.name} </li>
              <button onClick={() => setFilter(c.name) } >show </button>
            </div>
          )
        })}
      </ul>
    )
  } else if (filteredCountries.length === 1) {
    return (
      <ShowOneCountry country={filteredCountries[0]} />
    )
  }
  else {
    return (
      <div>
        No
      </div>
    )
  }
}

const ShowOneCountry = ({ country }) => {
  console.log(country);
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital} </p>
      <p>population {country.population} </p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(lang => {
          return (
            <li key={lang.iso639_2} >{lang.name}</li>
          )
        })}
      </ul>
      <img src={country.flag} alt={`flag of ${country.name}`} height={100} />
    </div>
  )
}

const App = () => {
  const [nameFilter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    getAllCountries()
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  return (
    <div>
      <h1>Countries</h1>
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />
      <ShowCountries nameFilter={nameFilter} setFilter={setFilter} countries={countries} />
    </div>
  );
}

export default App;
