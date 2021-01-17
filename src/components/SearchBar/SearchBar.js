import './SearchBar.css'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { 
  Button, 
  Divider, 
  FormControl,
  InputLabel,
  MenuItem,
  Select, 
  TextField 
} from '@material-ui/core'
import React from 'react'
import store from '../../store/store'

class SearchBar extends React.Component {
  constructor() {
    super ()
    this.state = {
      cities: [],
      destination: null,
      startDate: null,
      minPrice: null,
      maxPrice: null,
      duration: '',
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
      alert('Server Error, please make sure the Server is running with "yarn start"')
      console.error(e)
    }
  }

  render () {
    console.log(store.getState().results);
    return (
      <div className="SearchBar">

        {/* Destination autocomplete */}
        <Autocomplete
          id="autocomplete-box"
          options={this.state.cities}
          style={{ width: 300 }}
          noOptionsText="No results"
          fullWidth={false}
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
          onChange={ ev => this.setState({ minPrice: ev.target.value })}
          variant="standard" 
        />
        <Divider orientation="vertical" flexItem />

        {/* Max Price */}
        <TextField
          label="Maximum Price" 
          type="number" 
          step="0.01"
          onChange={ ev => this.setState({ maxPrice: ev.target.value })}
          variant="standard" 
        />
        <Divider orientation="vertical" flexItem />

        {/* Start Date */}
        <TextField
          label="Departure date"
          type="date"
          onChange={ ev => this.setState({ startDate: ev.target.value })}
          variant="standard" 
          InputLabelProps={{
            shrink: true
          }}
        />
        <Divider orientation="vertical" flexItem />

        {/* Duration */}
        <FormControl className="duration">
          <InputLabel id="duration-label">Duration</InputLabel>
          <Select
            labelId="duration-label"
            value={this.state.duration}
            onChange={ ev => this.setState({ duration: ev.target.value })}
          >
            <MenuItem value={1}>One Night</MenuItem>
            <MenuItem value={2}>2-3 Nights</MenuItem>
            <MenuItem value={3}>3-5 Nights</MenuItem>
            <MenuItem value={5}>5-8 Nights</MenuItem>
          </Select>
        </FormControl>

        {/* Execute the search */}
        <Button 
          disabled={ 
            !this.state.destination ||
            !this.state.startDate ||
            typeof this.state.duration !== 'number' ||
            !this.state.maxPrice ||
            (!this.state.minPrice && this.state.minPrice !== 0)
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
  