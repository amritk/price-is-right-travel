import './Results.css'
import React from 'react'
import { connect } from 'react-redux'
import Lottie from 'react-lottie'
import ResultsCard from '../ResultsCard/ResultsCard'
import store from '../../store/store'
import animationData from '../../assets/animations/loading.json'

const mapStateToProps = state => ({ 
  loading: state.results.loading,
  searched: state.results.searched
})

const lottieOptions = {
  loop: true,
  autoplay: true, 
  animationData,  
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}


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
    const completeMatchesExist = !!store.getState().results.completeMatches.length
    const partialMatchesExist = !!store.getState().results.partialMatches.length

    // Use buffer to dynamically build element
    const buffer = []
    
    // Loading state
    if (this.props.loading) {
      buffer.push(
        <Lottie 
          options={lottieOptions}
          height={400}
          width={400}
          key="loading"
        />
        )
      }
      // Results
      else if (completeMatchesExist || partialMatchesExist) {
        
        // Build cards for matches
        const completeMatches = this.buildCards(store.getState().results.completeMatches)
        const partialMatches = this.buildCards(store.getState().results.partialMatches)
        let subheader = 'There were no perfect matches, however these fit some of your requirements:'
        
        // Render complete matches
        if (completeMatchesExist) {
        subheader = 'Trips you may enjoy'
        buffer.push(
          <div key="completeMatchesExist">
            <span className="subheader">Perfect matches for you</span>
            <div className="popular">
              { completeMatches }
            </div>
          </div>
        )
      }
      // Render partial matches
      if (partialMatchesExist) {
        buffer.push(
          <div key="partialMatchesExist">
            <span className="subheader">{ subheader }</span>
            <div className="popular">
              { partialMatches }
            </div>
          </div>
        )
      }
    }
    // Popular trips, default state as well as empty state handling
    else {
      const popular = this.buildCards(this.state.popular)
      let text = 'Recommendations for you'

      // For empty state, show the popular results
      if (this.props.searched && !completeMatchesExist && !partialMatchesExist) {
        text = 'There were no search results, here are some other trips for you:'
      }

      buffer.push(
        <div key="popular">
          <span className="subheader">{ text }</span>
          <div className="popular">
            { popular }
          </div>
        </div>
      )
    }
    
    return (
      <div className="recommendations">
        <div className="Results">
          { buffer }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Results)
