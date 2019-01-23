import React from 'react'
import ShortcutsCategory from './ShortcutsCategory'
import { css } from '@emotion/core'
import { connect } from 'react-redux'

const shortcutsCategories = css`
  display: grid;
  grid-gap: 30px 20px;  
  grid-template-columns: repeat(auto-fit, minmax(500px,1fr));
`

function ShortcutsCategories(props) {
  console.log(props);
  return (
    <div css={shortcutsCategories}>
      <ShortcutsCategory shortcuts={props.shortcuts} title={"Title 1"}/>
      <ShortcutsCategory shortcuts={props.shortcuts} title={"Title 2"}/>
      <ShortcutsCategory shortcuts={props.shortcuts} title={"Title 3"}/>
    </div>
  )
}

const mapStateToProps = ({shortcuts,search}) => ({
  shortcuts,
  search
})

export default connect(mapStateToProps)(ShortcutsCategories)
