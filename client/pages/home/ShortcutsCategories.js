import ShortcutsCategory from './ShortcutsCategory'
import { css } from 'styled-components'

const shortcutsCategories = css`
  display: grid;
  grid-gap: 30px 20px;  
  grid-template-columns: repeat(auto-fit, minmax(500px,1fr));
`

function ShortcutsCategories({shortcuts}) {
  return (
    <div className={shortcutsCategories}>        
      <ShortcutsCategory shortcuts={shortcuts} title={"Title 1"}/>
      <ShortcutsCategory shortcuts={shortcuts} title={"Title 2"}/>
      <ShortcutsCategory shortcuts={shortcuts} title={"Title 3"}/>
    </div>
  )
}

export default ShortcutsCategories