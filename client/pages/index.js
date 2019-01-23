import { Component } from 'react'

import ShortcutsCategories from './home/ShortcutsCategories'
import Search from './home/Search'
import Layout from '../components/Layout'

class Home extends Component {

  handleSearch(appId) {
    console.log(appId)
  }

  render() {
    return (
      <Layout>
        <Search onChange={this.handleSearch}/>
        <ShortcutsCategories/>
      </Layout>

    )
  }
}

export default Home