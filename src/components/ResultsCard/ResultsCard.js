import './ResultsCard.css'
import React from 'react'
import Icon from '@material-ui/core/Icon'
import { format } from 'date-fns'

class ResultsCard extends React.Component {

  constructor () {
    super ()
    this.state = {
      image: null
    }
  }

  // Load image before mount
  componentDidMount() {
    import('../../assets/locations/' + this.props.trip.destination.replace(' ', '') + '.jpg')
      .then(image => {this.setState({ image: image.default })})
  }

  render () {
    const trip = this.props.trip

    // Format the dates
    console.log(trip);
    console.log(trip.start_date);
    console.log(new Date(trip.start_date))
    const formattedStartDate = format(new Date(trip.start_date), 'MMM do')
    const formattedEndDate = format(new Date(trip.end_date), 'MMM do')

    // Set background image
    const sectionStyle = {
      backgroundImage: `url(${this.state.image})`
    }

    return (
      <div 
        className="ResultsCard" 
        onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')} 
        style={sectionStyle}
      >
        <div className="info">
          {/* Left column */}
          <div>
            <div className="destination">
              { trip.destination }
            </div>
            <div className="start-date">
              <Icon fontSize="small">flight_takeoff</Icon>
              { formattedStartDate }
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="price">
              $ { trip.price }
            </div>
            <div className="end-date">
              { formattedEndDate }
              <Icon fontSize="small">flight_land</Icon>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ResultsCard
