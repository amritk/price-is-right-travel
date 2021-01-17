import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles'

import './style/index.css'
import App from './components/App/App'
import reportWebVitals from './reportWebVitals'
import store from './store/store'
import theme from './style/theme'

ReactDOM.render(
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
      </ThemeProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
