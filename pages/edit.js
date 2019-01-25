import React, {Component} from 'react'

import Layout from '../components/Layout'
import ShortcutForm from './edit/ShortcutForm'


class Edit extends Component {

  render() {
    return (
      <Layout>
        <ShortcutForm />
      </Layout>
    )
  }
}

export default Edit
