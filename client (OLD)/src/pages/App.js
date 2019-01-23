import React, { Component } from 'react'
import { BrowserRouter as Router, Route }  from 'react-router-dom'  

import Header from '../components/Header'
import Footer from '../components/Footer'
import Global from '../components/theme'

import { Provider } from 'react-redux'
import configureStore from '../store'

import Home from './Home'
import Edit from './Edit'
import Apps from './Apps'
import About from './About'

import { shortcuts, apps } from '../data'

const storeData = {
  shortcuts,
  apps,
  search: {
    text:''    
  }
}

class App extends Component {  
  render() {
    return ( 
      <Router>
        <Provider store={configureStore(storeData)}>
          <Global/>
          <Header/>
            <Route path="/about" component={About}/>
            <Route path="/apps" component={Apps}/>
            <Route path="/edit" component={Edit}/>
            <Route exact path="/" component={Home}/>
          <Footer/>
        </Provider>
      </Router>
      )
  }
}

export default App
