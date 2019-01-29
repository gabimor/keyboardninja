import React, {Component} from 'react'

import Layout from '../components/Layout'
import ShortcutForm from './add/ShortcutForm'


class Add extends Component {

  render() {
    return (
      <Layout>
        <ShortcutForm />
      </Layout>
    )
  }
}

export default Add
