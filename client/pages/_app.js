import React from 'react'
import App, { Container } from 'next/app'
import AppProvider from '../components/AppContext'
import fetch from 'isomorphic-unfetch'

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
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
        <AppProvider>          
          <Component {...pageProps} />
        </AppProvider>
      </Container>
    )
  } 
}