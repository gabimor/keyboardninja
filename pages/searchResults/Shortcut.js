import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../../components/GlobalStyle'

import ShortcutKey from '../../components/ShortcutKey'
import { upperFirstLetter } from '../../helpers'

const Plus = styled.span`
  font-size: 14px;
  padding:2px;
  color: ${colors.mainBG};
`

const Text = styled.span`
  font-size: 14px;
  padding: 4px;
  color: ${colors.mainBG};
`

export default function Shortcut({ keys }) {
  const keysArr = getKeysArr(keys)
  return keysArr.map((item, index) => {
    item = upperFirstLetter(item)
    switch (item) {
      case '+':
        return <Plus>+</Plus>
      case ' ':
        return <Text>then</Text>
      default:
        return <ShortcutKey key={index}>{item}</ShortcutKey>
    }
  })
}

function getKeysArr(keys) {
  const spaceSplit = keys.split(' ')

  const arr = []

  for (const spaceItem of spaceSplit) {
    const plusSplit = spaceItem.split('+')

    for (const plusItem of plusSplit) {
      arr.push(plusItem)
      arr.push('+')
    }
    arr.pop()
    arr.push(' ')
  }

  arr.pop()
  return arr
}

Shortcut.propTypes = {
  keys: PropTypes.array,
}
