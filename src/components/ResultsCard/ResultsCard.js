import './ResultsCard.css'
import React from 'react'

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
    // Set background image
    const sectionStyle = {
      backgroundImage: `url(${this.state.image})`
    }

    return (
      <div className="ResultsCard" style={sectionStyle}>
        <div className="title">
          { trip.destination }
          <br></br>
          { trip.price }
          <br></br>
          { trip.start_date }
        </div>
      </div>
    )
  }
}

export default ResultsCard
