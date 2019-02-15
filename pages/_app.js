import App, { Container } from "next/app"
import Head from "next/head"
import withReduxStore from "../helpers/withReduxStore"
import { Provider } from "react-redux"
import fetch from "isomorphic-unfetch"

const isServer = typeof window === "undefined"

class MyApp extends App {
  // static async getInitialProps({ Component, router, ctx, req }) {
  //   // TODO: set the current domain
  //   // TODO: t  his loads on every page render, should load once
  //   if (isServer) {
  //     // const baseUrl = 'http://localhost:' + +process.env.PORT
  //     const baseUrl = "http://localhost:3000"
  //     let pageProps = await fetch(`${baseUrl}/api/data`).then(res => res.json())
  //     return { ...pageProps }
  //   }
  // }

  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <>
        <Head>
          <title>Keyboard Ninja</title>
          {this.props.styleTags}
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
