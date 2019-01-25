// import React from 'react'
import styled from 'styled-components'

const ShortcutRowContainer = styled.tr`
  padding: 10px 30px;
  
  color:#323639;
  & td {
    padding:8px 20px;  
  }
`

const Key = styled('span')`
  display:inline-block;
  background:#fbfbfb;
  color:#4a4a4a;
  
  padding: 2px 7px;
  border-radius:5px;
  border:1px solid #dadada;
  margin:0 2px;
`

const Plus = styled('span')`
  padding:0 5px;
`


function ShortcutRow ({shortcut, isDark}) { 
  const pinClass = (true ? 'fas' : 'far') + ' fa-star'
  
  return (
    <ShortcutRowContainer isDark={isDark}>
      <td>
        {upperFirstLetter(shortcut.action)}
      </td>
      <td>
        {renderKeys(shortcut.win)}
      </td>
      <td style={{textAlign:"right"}}>
        <i className={pinClass}></i>
      </td>
    </ShortcutRowContainer>
  )
}

function renderKeys(keys) {
  const keysArr = getKeysArr(keys)
  return keysArr.map((item, index) => {
    item = upperFirstLetter(item)
    switch (item) {
      case '+':
        return <Plus key={index}>{item}</Plus>        
      case ' ':
        return undefined;
      default:
        return <Key key={index}>{item}</Key>
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

function upperFirstLetter(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default ShortcutRow



