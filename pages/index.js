import { Component } from 'react'
import Router from 'next/router'

import { encodeAppName } from '../helpers'
import Search from './home/Search'
import Layout from '../components/Layout'

class App extends Component {

  constructor(props) {
    super(props)
  }

  handleSearch(selectedAppId) {    
    const appName = this.props.apps.find(item => item.id === selectedAppId).name
    Router.push('/searchResults?appId=' + selectedAppId, '/apps/' + encodeAppName(appName))
  }

  render() {    
    return (      
      <Layout>
        <Search onChange={(selectedAppId) => this.handleSearch(selectedAppId)}/>
      </Layout>      
    )
  }
}

export default App
