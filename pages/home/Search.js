import styled from 'styled-components'
import OSSelect from '../../components/OSSelect'
import AppSearch from '../../components/AppSearch'
import { AppConsumer } from '../../components/AppContext';

const Container = styled.div`
  display:flex;  
  
  color:#171c1d;
  border-bottom:2px solid #d5d9d9;

  padding: 20px 30px;
  font-size: 2rem;
`

function Search({onChange, value}) {
  return (
    <Container>
      <label htmlFor="search">Search App:</label>
      <AppConsumer>
        {({ apps }) => (
          <AppSearch apps={apps} onSelection={onChange} value={value}/>
        )}
      </AppConsumer>
      <OSSelect />
    </Container>
  )
}

export default Search
