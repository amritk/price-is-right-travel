import './Results.css'
import React from 'react'
import ResultsCard from '../ResultsCard/ResultsCard'

class Results extends React.Component {
  constructor() {
    super ()
    this.state = {
      popular: [],
      completeMatches: [],
      partialMatches: []
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

  render () {

    // Loop on the popular cards 
    const popular = []
    for (const [index, trip] of this.state.popular.entries()) {
      popular.push(<ResultsCard key={index} trip={trip}></ResultsCard>)
    }

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
