import './Header.css'
import React from 'react'
import SearchBar from '../SearchBar/SearchBar.js'
import backgroundImage from '../../assets/background.jpg'

const sectionStyle = {
  backgroundImage: `url(${backgroundImage})`
}


class Header extends React.Component {
  render () {
    return (
      <div className="Header" style={ sectionStyle }>
        {/* The Main Search bar */}
        <SearchBar></SearchBar>
      </div>
    )
  }
}

export default Header
