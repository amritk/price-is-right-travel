import './App.css'
import React from 'react'
import Header from '../Header/Header'
import Results from '../Results/Results'


class App extends React.Component {
  render () {
    return (
      <div className="App">
        <Header></Header>
        <Results></Results>
      </div>
    )
  }
}

export default App
