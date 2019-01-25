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

const SearchInput = styled.input`
  color: #171c1d;
  
  padding: 0 20px;
  width: 350px; 
  background:#eaeaea;
  margin-left: 20px;  
  border:0;
  border-bottom: 1px solid #171c1d ;
`

function Search({onChange}) {
  return (
    <Container>
      <label htmlFor="search">Search App:</label>
      <AppConsumer>
        {({ apps }) => (
          <AppSearch apps={apps} onSelection={onChange}/>
        )}
      </AppConsumer>
      <OSSelect />
    </Container>
  )
}

export default Search
