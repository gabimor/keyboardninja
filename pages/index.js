import { Component } from 'react'
import styled from 'styled-components'
import {withRouter} from 'next/router'
import Router from 'next/router'

import { encodeAppName } from '../helpers'
import ShortcutsCategory from './home/ShortcutsCategory'
import TopApps from './home/TopApps'
import Search from './home/Search'
import Layout from '../components/Layout'

const ResultsContainer = styled.div`
  display: grid;
  grid-gap: 30px 20px;  
  grid-template-columns: repeat(auto-fit, minmax(500px,1fr));
`

class App extends Component {

  constructor(props) {
    super(props)
    
    let selectedAppId = props.router.query.appId    
    selectedAppId = selectedAppId ? +selectedAppId : undefined

    this.state = {
      selectedAppId,
      appName: this.getAppName(selectedAppId),
      shownShortcuts:this.reduceShortcuts(selectedAppId, props.shortcuts)
    }

  }

  componentDidMount() {
    Router.events.on('routeChangeComplete', () => {
      if (!this.props.router.query.appId) this.setState({selectedAppId: undefined, shownShortcuts:{}})
    })

  }

  reduceShortcuts(selectedAppId, shortcuts) {
    if (!selectedAppId) return {}

    const appShortcuts = shortcuts.filter(item => item.appId === selectedAppId)

    return appShortcuts.reduce((acc, curr) => {
      if (!acc[curr.appSectionId]) acc[curr.appSectionId] = []
      acc[curr.appSectionId].push(curr)

      return acc
    },{})
  }

  getAppName(selectedAppId) {
    if (!selectedAppId) return ''
    return this.props.apps.find(item => item.id === selectedAppId).name
  }

  handleSearch(selectedAppId) {    
    const shownShortcuts = this.reduceShortcuts(selectedAppId, this.props.shortcuts)
    const appName = this.getAppName(selectedAppId)
    Router.push('/?appId=' + selectedAppId, '/apps/' + encodeAppName(appName))

    this.setState({shownShortcuts, appName})
  }

  renderShortcutCategory(sectionId) {
    const sectionTitle = this.props.appSections.find(item => item.id === sectionId).name
    const {shownShortcuts} = this.state

    return <ShortcutsCategory key={sectionId} shortcuts={shownShortcuts[sectionId]} title={sectionTitle}/>
  }

  render() {    
    const {shownShortcuts, appName} = this.state
    const sectionIds = Object.keys(shownShortcuts)            
    // console.log(sectionIds.length)

    return (      
      <Layout>
        <Search onChange={(selectedAppId) => this.handleSearch(selectedAppId)} value={appName}/>
        <ResultsContainer>        
          {sectionIds.length > 0 ? (
              sectionIds.map(key => this.renderShortcutCategory(+key))
            ) : (
              <>
              <TopApps name="Most Searched Apps" apps={this.props.mostSearchedApps}/>
              <TopApps name="Most Pinned Apps" apps={this.props.mostPinnedApps}/>
              <TopApps name="Apps With Most Shortcuts" apps={this.props.mostShortcutsApps}/>
              </>
          )}
        </ResultsContainer>
      </Layout>      
    )
  }
}

export default withRouter(App)