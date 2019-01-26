import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import AppProvider from '../components/AppContext'
import fetch from 'isomorphic-unfetch'

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    // TODO: get real url
    // TODO: this loads on every page render, should load once
    const baseUrl = 'http://localhost:3000'
    let pageProps = await fetch(`${baseUrl}/data`).then(res => res.json())
    if (Component.getInitialProps) {
    }  
    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>Keyboard Ninja</title>
          {this.props.styleTags}
          <link href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossOrigin="anonymous" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i" rel="stylesheet"/>
        </Head>
        <Container>
          <AppProvider value={pageProps}>          
            <Component {...pageProps} />
          </AppProvider>
        </Container>
      </>
    )
  } 
}