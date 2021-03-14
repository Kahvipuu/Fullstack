import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeFilter, removeFilter } from '../reducers/filterReducer'

const Filter = () => {

  const filterState = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value
    dispatch(changeFilter(filter))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter