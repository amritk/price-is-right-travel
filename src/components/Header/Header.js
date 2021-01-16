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
        {/* A nice quote */}
        <section className="container">
          <h1>A journey of a thousand miles begins with a single click</h1>
        </section>
        {/* The Main Search bar */}
        <SearchBar></SearchBar>
      </div>
    )
  }
}

export default Header
