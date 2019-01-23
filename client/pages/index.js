import { Component } from 'react'

import { AppConsumer } from '../components/AppContext';
import ShortcutsCategories from './home/ShortcutsCategories'
import Search from './home/Search'
import Layout from '../components/Layout'

export default class extends Component {
  state = {
    selectedAppId: undefined,
    shownShortcuts:[]
  }

  handleSearch(selectedAppId, shortcuts) {
    this.setState({shownShortcuts: shortcuts.filter(item => item.appId === selectedAppId)})
  }

  render() {
    return (
      <Layout>
        <AppConsumer>
          {({ shortcuts }) => (
            <>
              <Search onChange={(selectedAppId) => this.handleSearch(selectedAppId, shortcuts)}/>
              <ShortcutsCategories shortcuts={this.state.shownShortcuts}/>
            </>
          )}
        </AppConsumer>
      </Layout>
    )
  }
}