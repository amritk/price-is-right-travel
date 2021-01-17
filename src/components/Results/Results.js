import './Results.css'
import React from 'react'
import ResultsCard from '../ResultsCard/ResultsCard'
import store from '../../store/store'

class Results extends React.Component {
  constructor() {
    super ()
    this.state = {
      popular: []
    }
  }

  async componentDidMount() {
    try {
      // Grab a list of "recommendations" for the user
      const response = await fetch("http://localhost:3001/popular")
      const popular = await response.json()

      this.setState({
        popular
      })
    }
    catch(e) {
      console.error(e)
    } 
  }

  /**
   * A simple function to create an array of results cards
   * @param { array } trips the collection of trip results 
   */
  buildCards = trips => {
    const cards = []
    for (const [index, trip] of trips.entries()) {
      cards.push(<ResultsCard key={index} trip={trip}></ResultsCard>)
    }
    return cards
  }

  render () {

    // Loop on the popular cards 
    const popular = this.buildCards(this.state.popular)
    const completeMatches = this.buildCards(store.getState().results.completeMatches)
    const partialMatches = this.buildCards(store.getState().results.partialMatches)
    const loading = store.getState().results.loading

    return (
      <div className="Results">
        <div className="recommendations">
          <span className="subheader">Recommendations for you</span>
          
          {/* Popular cards */}
          <div className="popular">
            { popular }
          </div>
        </div>
      </div>
    )
  }
}

export default Results
