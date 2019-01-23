import React, {Component} from 'react'

import MainContainer from '../components/MainContainer'
import ShortcutForm from './edit/ShortcutForm'


class Edit extends Component {

  render() {
    return (
      <MainContainer>
        <ShortcutForm />
      </MainContainer>
    )
  }
}

export default Edit
