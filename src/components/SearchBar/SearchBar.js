import './SearchBar.css'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import React from 'react'

class SearchBar extends React.Component {
  constructor() {
    super ()
    this.state = {
      cities: []
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
          renderInput={(params) =>  
            <TextField {...params} 
              label="Destination" 
              variant="outlined" 
            />
          }
        />

        
      </div>
      )
    }
  }
  
  export default SearchBar
  