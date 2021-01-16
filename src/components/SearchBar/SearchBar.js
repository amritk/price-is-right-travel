import './SearchBar.css'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Button, TextField } from '@material-ui/core'
import React from 'react'

class SearchBar extends React.Component {
  constructor() {
    super ()
    this.state = {
      cities: [],
      destination: null,
      startDate: '',
      endDate: '',
      minPrice: null,
      maxPrice: null
    }
  }

  async componentDidMount() {
    try {
      // Grab the list of cities from our API for the autocomplete
      const response = await fetch("http://localhost:3001/cities")
      const cities = await response.json()

      this.setState({
        cities
      })
    }
    catch(e) {
      console.error(e)
    } 
  }

  render () {

    console.log(this.state)

    return (
      <div className="SearchBar">

        {/* Destination autocomplete */}
        <Autocomplete
          id="autocomplete-box"
          options={this.state.cities}
          style={{ width: 300 }}
          noOptionsText="No results"
          renderInput={(params) =>  
            <TextField {...params} 
              label="Destination" 
              autoFocus="true"
              variant="standard" 
              onChange={ ev => this.setState({destination: ev.target.value })}
            />
          }
        />

        {/* Min Price */}
        <TextField
          label="Minimum Price" 
          type="number" 
          step="0.01"
          onChange={ ev => this.setState({ minPrice: ev.target.value })}
          variant="standard" 
        />

        {/* Max Price */}
        <TextField
          label="Maximum Price" 
          type="number" 
          step="0.01"
          onChange={ ev => this.setState({ maxPrice: ev.target.value })}
          variant="standard" 
        />

        {/* Start Date */}
        <TextField
          label="Trip Start date"
          type="date"
          onChange={ ev => this.setState({ startDate: ev.target.value })}
          value={this.state.startDate} 
          variant="standard" 
          InputLabelProps={{
            shrink: true
          }}
        />

        {/* Execute the search */}
        <Button 
          disabled={ 
            !this.state.destination ||
            !this.state.startDate.length ||
            !this.state.endDate.length ||
            !this.state.maxPrice ||
            !this.state.minPrice && 
            this.state.minPrice !== 0
          } 
          variant="contained" 
          color="primary"
        >
          Search
        </Button>
      </div>
      )
    }
  }
  
  export default SearchBar
  