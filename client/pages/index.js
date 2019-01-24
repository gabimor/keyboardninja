import { Component } from 'react'
import styled from 'styled-components'
import ShortcutsCategory from './home/ShortcutsCategory'
import {withRouter} from 'next/router'

import { AppConsumer } from '../components/AppContext';

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

    
    const shortcuts = [
      { id: 1, appId: 1, appSectionId: 1, action:"reset", win:"ctrl+alt+del", pins:0, comment:"" },
      { id: 2, appId: 1, appSectionId: 1, action:"paste", win:"ctrl+z", pins:0, comment:"" },
      { id: 3, appId: 1, appSectionId: 2, action:"cut", win:"ctrl+x", pins:0, comment:"" },
      { id: 4, appId: 1, appSectionId: 2, action:"copy", win:"ctrl+c", pins:0, comment:"" },
    
      { id: 5, appId: 2, appSectionId: 1, action:"jump to omnibar", win:"ctrl+l q", pins:0, comment:"" },
      { id: 6, appId: 2, appSectionId: 1, action:"close tab", win:"ctrl+w", pins:0, comment:"" },
      { id: 7, appId: 2, appSectionId: 2, action:"new tab", win:"ctrl+t", pins:0, comment:"" },
      { id: 8, appId: 2, appSectionId: 2, action:"open recetly closed tab", win:"ctrl+shift+t", pins:0, comment:"" },
      { id: 9, appId: 2, appSectionId: 3, action:"zoom in", win:"ctrl+plus", pins:0, comment:"" },
      { id: 10, appId: 2, appSectionId: 3, action:"zoom out", win:"ctrl+-", pins:0, comment:"" },
      { id: 11, appId: 2, appSectionId: 3, action:"reset zoom", win:"ctrl+0", pins:0, comment:"" },
    
      { id: 12, appId: 3, appSectionId: 1, action:"reset zoom", win:"ctrl+0", pins:0, comment:"" },
    
      { id: 13, appId: 4, appSectionId: 1, action:"reset zoom", win:"ctrl+0", pins:0, comment:"" },
    
      { id: 14, appId: 5, appSectionId: 1, action:"reset zoom", win:"ctrl+0", pins:0, comment:"" },
    ]
    
    const selectedAppId = +props.router.query.appId

    console.log(selectedAppId)
    this.state = {
      selectedAppId,
      shownShortcuts:this.reduceShortcuts(selectedAppId, shortcuts)
    }
  
    console.log(this.state.shownShortcuts)
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


  handleSearch(selectedAppId, shortcuts) {    
    const shownShortcuts = this.reduceShortcuts(selectedAppId, shortcuts)
    
    this.setState({shownShortcuts})
  }

  render() {
    const {shownShortcuts} = this.state
    const sectionIds = Object.keys(shownShortcuts)    

    return (
      <Layout>
        <AppConsumer>{({ shortcuts, appSections }) => (
            <>
              <Search onChange={(selectedAppId) => this.handleSearch(selectedAppId, shortcuts, appSections)}/>
              <ResultsContainer>        
                {
                  sectionIds.length > 0 && 
                    sectionIds.map(key => <ShortcutsCategory key={key} shortcuts={shownShortcuts[key]} 
                                                             title={appSections.find(item => item.id === +key).name}/>)
                }
              </ResultsContainer>
            </>
        )}</AppConsumer>
      </Layout>
    )
  }
}

export default withRouter(App)