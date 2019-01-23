import React from 'react'
import ShortcutsCategories from './home/ShortcutsCategories'
import Search from './home/Search'
import MainContainer from '../components/MainContainer'

function Home () {
  return (
    <>
      <MainContainer>
        <Search/>   
        <ShortcutsCategories/>
      </MainContainer>
    </>
  )
}

export default Home
