import React from 'react'
import ReactDOM from 'react-dom/client'
 
import './style.css'
import { JournalApp } from './JournalApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/index.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>

    <BrowserRouter>
      <JournalApp />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
