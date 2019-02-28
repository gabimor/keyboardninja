import App, { Container } from "next/app"
import Head from "next/head"
import withReduxStore from "../helpers/withReduxStore"
import { Provider } from "react-redux"

class MyApp extends App {
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
