import { Component } from 'react'
import Link from 'next/link'

import Layout from '../components/Layout'
import { AppConsumer } from '../components/AppContext'
import { encodeAppName } from '../helpers'

export default class extends Component {    
  render() {
    return (
      <Layout>
        <AppConsumer>{({ apps }) => (
          apps.map(item =>         
            <div>
              <Link href={"/?appId=" + item.id} as={"/apps/" + encodeAppName(item.name)}>
                <a>{item.name}</a>
              </Link>
            </div>
          )
        )}</AppConsumer>
      </Layout>
    )
  }
}