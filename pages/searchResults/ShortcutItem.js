import styled from 'styled-components'
import PropTypes from 'prop-types'

import { upperFirstLetter } from '../../helpers'
import Shortcut from './Shortcut'

const Container = styled.tr`
  padding: 10px 30px;

  color: #323639;
  & td {
    padding: 8px 20px;
  }
`

const Plus = styled('span')`
  padding: 0 5px;
`

function ShortcutItem({ action, keys, isDark , isPinned}) {
  const pinClass = (isPinned ? 'fas' : 'far') + ' fa-star'

  return (
    <Container isDark={isDark}>
      <td>{upperFirstLetter(action)}</td>
      <td><Shortcut keys={keys}/></td>
      <td style={{ textAlign: 'right' }}>
        <i className={pinClass} />
      </td>
    </Container>
  )
}

ShortcutItem.propTypes = {
  shortcut: PropTypes.string.isRequired,
  isDark: PropTypes.bool.isRequired,
}

export default ShortcutItem
