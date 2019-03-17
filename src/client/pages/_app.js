import App, { Container } from "next/app"
import Head from "next/head"
import withReduxStore from "../helpers/withReduxStore"
import { Provider } from "react-redux"
import "isomorphic-unfetch"

class MyApp extends App {
  // static async getInitialProps({ Component, router, ctx }) {
  //   const pageProps = Component.getInitialProps
  //     ? await Component.getInitialProps(ctx)
  //     : {}

  //   return { pageProps }
  // }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    // console.log("reduxStore")
    // console.log(reduxStore.getState())

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
