import { Component } from 'react'
import styled from 'styled-components'
import ShortcutsCategory from './home/ShortcutsCategory'
import {withRouter} from 'next/router'

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
      
    const selectedAppId = +props.router.query.appId

    this.state = {
      selectedAppId,
      shownShortcuts:this.reduceShortcuts(selectedAppId, props.shortcuts)
    }
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


  handleSearch(selectedAppId) {    
    const shownShortcuts = this.reduceShortcuts(selectedAppId, this.props.shortcuts)
    
    this.setState({shownShortcuts})
  }

  renderShortcutCategory(sectionId) {
    const sectionTitle = this.props.appSections.find(item => item.id === sectionId).name
    const {shownShortcuts} = this.state

    return <ShortcutsCategory key={sectionId} shortcuts={shownShortcuts[sectionId]} title={sectionTitle}/>
  }

  render() {    
    const {shownShortcuts} = this.state
    const sectionIds = Object.keys(shownShortcuts)        

    return (      
      <Layout>
        <Search onChange={(selectedAppId) => this.handleSearch(selectedAppId)}/>
        <ResultsContainer>        
          {
            sectionIds.length && sectionIds.map(key => this.renderShortcutCategory(+key))
          }
        </ResultsContainer>
      </Layout>      
    )
  }
}

export default withRouter(App)