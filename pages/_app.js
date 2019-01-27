import App, { Container } from 'next/app'
// import React from 'react'
import Head from 'next/head'
import withReduxStore from '../helpers/withReduxStore'
import { Provider } from 'react-redux'
import fetch from 'isomorphic-unfetch'

const isServer = typeof window === 'undefined'

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    // TODO: set the current domain
    // TODO: t  his loads on every page render, should load once
    if (isServer) {
      // const baseUrl = 'http://localhost:' + +process.env.PORT
      const baseUrl = 'http://localhost:3000'
      let pageProps = await fetch(`${baseUrl}/data`).then(res => res.json())
      return { ...pageProps }
    }
  }

  render () {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <>
        <Head>
          <title>Keyboard Ninja</title>
          {this.props.styleTags}
          <link href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossOrigin="anonymous" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i" rel="stylesheet"/>
        </Head>
        <Container>
          <Provider store={reduxStore}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      </>
    )
  } 
}

export default withReduxStore(MyApp)