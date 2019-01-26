import React from 'react'
import App, { Container } from 'next/app'
import AppProvider from '../components/AppContext'
import fetch from 'isomorphic-unfetch'

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    // TODO: get real url
    const baseUrl = 'http://localhost:3000'
    let pageProps = await fetch(`${baseUrl}/data`).then(res => res.json())

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }  
    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <AppProvider value={pageProps}>          
          <Component {...pageProps} />
        </AppProvider>
      </Container>
    )
  } 
}