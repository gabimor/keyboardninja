import ShortcutsCategory from './ShortcutsCategory'
import { css } from 'styled-components'
import { AppConsumer } from '../../components/AppContext';

const shortcutsCategories = css`
  display: grid;
  grid-gap: 30px 20px;  
  grid-template-columns: repeat(auto-fit, minmax(500px,1fr));
`

function ShortcutsCategories(props) {
  // console.log(props);
  return (
    <AppConsumer>
      {({ state, growAYearOlder }) => (
        
    <div className={shortcutsCategories}>
    {console.log(state, growAYearOlder)}
      <ShortcutsCategory shortcuts={[]} title={"Title 1"}/>
      <ShortcutsCategory shortcuts={[]} title={"Title 2"}/>
      <ShortcutsCategory shortcuts={[]} title={"Title 3"}/>
    </div>
    )}
    </AppConsumer>
  )
}

const mapStateToProps = ({shortcuts,search}) => ({
  shortcuts,
  search
})

export default ShortcutsCategories
// export default connect(mapStateToProps)(ShortcutsCategories)
