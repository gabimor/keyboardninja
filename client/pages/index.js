import { Component } from 'react'
import styled from 'styled-components'
import ShortcutsCategory from './home/ShortcutsCategory'
// import Router from 'next/router'

import { AppConsumer } from '../components/AppContext';

import Search from './home/Search'
import Layout from '../components/Layout'

const Container = styled.div`
  display: grid;
  grid-gap: 30px 20px;  
  grid-template-columns: repeat(auto-fit, minmax(500px,1fr));
`

export default class extends Component {
  state = {
    selectedAppId: undefined,
    shownShortcuts:{}
  }

  handleSearch(selectedAppId, shortcuts, appSections) {    

    const appShortcuts = shortcuts.filter(item => item.appId === selectedAppId)

    const shownShortcuts = appShortcuts.reduce((acc, curr) => {
      if (!acc[curr.appSectionId]) acc[curr.appSectionId] = []
      acc[curr.appSectionId].push(curr)

      return acc
    },{})
    
    this.setState({shownShortcuts})
  }

  render() {
    const {shownShortcuts} = this.state
    const sectionIds = Object.keys(shownShortcuts)

    return (
      <Layout>
        <AppConsumer>
          {({ shortcuts, appSections }) => (
            <>
              <Search onChange={(selectedAppId) => this.handleSearch(selectedAppId, shortcuts, appSections)}/>
              <Container>        
                {
                  sectionIds.length > 0 && 
                    sectionIds.map(key => <ShortcutsCategory key={key} shortcuts={shownShortcuts[key]} 
                                                             title={appSections.find(item => item.id === +key).name}/>)
                }
              </Container>
            </>
          )}
        </AppConsumer>
      </Layout>
    )
  }
}