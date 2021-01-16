import './App.css'
import React from 'react'
import SearchBar from '../SearchBar/SearchBar.js'
import backgroundImage from '../../assets/background.jpg'

const sectionStyle = {
  backgroundImage: `url(${backgroundImage})`
}
class App extends React.Component {
  render () {
    return (
      <div className="App" style={ sectionStyle }>
        {/* The Main Search bar */}
        <SearchBar></SearchBar>
      </div>
    )
  }
}

export default App
