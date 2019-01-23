import React from 'react'
import styled from '@emotion/styled'
import { connect } from 'react-redux'

import { doSearch } from '../../actions'
import OSSelect from '../../components/OSSelect'
import AppSearch from '../../components/AppSearch'


const Container = styled.div`
  display:flex;  
  
  color:#171c1d;
  border-bottom:2px solid #d5d9d9;

  padding: 20px 30px;
  font-size: 2rem;
`

const SearchInput = styled.input`
  color: #171c1d;
  
  padding: 0 20px;
  width: 350px; 
  background:#eaeaea;
  margin-left: 20px;  
  border:0;
  border-bottom: 1px solid #171c1d ;
`

function Search({doSearch}) {
  return (
    <Container>
      <label htmlFor="search">Search App:</label>
      <AppSearch />
      {/* <SearchInput type="text" id="search" autoComplete="off" onChange={(e) => doSearch(e.target.value)} /> */}
      <OSSelect />
    </Container>
  )
}

const mapStateToProps = ({search}) => ({
  search
})

export default connect(mapStateToProps, { 
  doSearch
})(Search)
