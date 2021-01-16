import './SearchBar.css'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Button, Divider, TextField } from '@material-ui/core'
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
    return (
      <div className="SearchBar">

        {/* Destination autocomplete */}
        <Autocomplete
          id="autocomplete-box"
          options={this.state.cities}
          style={{ width: 300 }}
          noOptionsText="No results"
          onChange={ (ev, val) => this.setState({ destination: val })}
          renderInput={(params) =>  
            <TextField {...params} 
              label="Destination" 
              autoFocus={true}
              variant="standard" 
            />
          }
        />
        <Divider orientation="vertical" flexItem />

        {/* Min Price */}
        <TextField
          label="Minimum Price" 
          type="number" 
          step="0.01"
          onChange={ (ev, val) => this.setState({ minPrice: val })}
          variant="standard" 
        />
        <Divider orientation="vertical" flexItem />

        {/* Max Price */}
        <TextField
          label="Maximum Price" 
          type="number" 
          step="0.01"
          onChange={ (ev, val) => this.setState({ maxPrice: val })}
          variant="standard" 
        />
        <Divider orientation="vertical" flexItem />

        {/* Start Date */}
        <TextField
          label="Departure date"
          type="date"
          onChange={ (ev, val) => this.setState({ startDate: val })}
          variant="standard" 
          InputLabelProps={{
            shrink: true
          }}
        />
        <Divider orientation="vertical" flexItem />

        {/* Start Date */}
        {/* <TextField
          label="Duration"
          type="select"
          onChange={ (ev, val) => this.setState({ startDate: val })}
          variant="standard" 
          InputLabelProps={{
            shrink: true
          }}
        />
        <Divider orientation="vertical" flexItem /> */}

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
  