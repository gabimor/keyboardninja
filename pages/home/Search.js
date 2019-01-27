import styled from 'styled-components'
import OSSelect from '../../components/OSSelect'
import AppSearch from '../../components/AppSearch'
import { connect } from 'react-redux'

const Container = styled.div`
  display:flex;  
  
  color:#171c1d;
  border-bottom:2px solid #d5d9d9;

  padding: 20px 30px;
  font-size: 2rem;
`

function Search({onChange, value, apps}) {  
  return (
    <Container>
      <label htmlFor="search">Search App:</label>
        <AppSearch apps={apps} onSelection={onChange} value={value}/>
      <OSSelect />
    </Container>
  )
}

function mapStateToProps (state) {
  const { apps } = state
  return { apps }
}

export default connect(mapStateToProps)(Search)