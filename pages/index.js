import { Component } from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'
import Router, {withRouter} from 'next/router'

import { encodeAppName } from '../helpers'
import TopApps from './home/TopApps'
import Search from './home/Search'
import Layout from '../components/Layout'

const ResultsContainer = styled.div`
  display: grid;
  grid-gap: 30px 20px;  
  grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
`

class App extends Component {

  constructor(props) {
    super(props)
    
    let selectedAppId = props.router.query.appId    
    selectedAppId = selectedAppId ? +selectedAppId : undefined

    this.state = {
      selectedAppId,
      appName: this.getAppName(selectedAppId)
    }

  }

  componentDidMount() {
    Router.events.on('routeChangeComplete', () => {
      if (!this.props.router.query.appId) this.setState({selectedAppId: undefined, shownShortcuts:{}})
    })

  }

  getAppName(selectedAppId) {
    if (!selectedAppId) return ''
    return this.props.apps.find(item => item.id === selectedAppId).name
  }

  handleSearch(selectedAppId) {    
    const appName = this.getAppName(selectedAppId)
    Router.push('/?appId=' + selectedAppId, '/apps/' + encodeAppName(appName))

    this.setState({appName})
  }


  render() {    
    const {appName} = this.state
    const {mostSearchedApps, mostPinnedApps, mostShortcutsApps} = this.props

    return (      
      <Layout>
        <Search onChange={(selectedAppId) => this.handleSearch(selectedAppId)} value={appName}/>
        <ResultsContainer>        
          <TopApps name="Most Searched Apps" apps={mostSearchedApps}/>
          <TopApps name="Most Pinned Apps" apps={mostPinnedApps}/>
          <TopApps name="Apps With Most Shortcuts" apps={mostShortcutsApps}/>
        </ResultsContainer>
      </Layout>      
    )
  }
}


function mapStateToProps(state) {  
  return { ...state }
}


export default connect(mapStateToProps)(withRouter(App))