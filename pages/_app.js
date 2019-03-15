import App, { Container } from "next/app"
import Head from "next/head"
import withReduxStore from "../helpers/withReduxStore"
import { Provider } from "react-redux"
import "isomorphic-unfetch"

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    // const res = await fetch(`${process.env.DOMAIN_URL || ""}api/user`, {
    //   headers: {
    //     credentials: "include",
    //     "Content-Type": "application/json",
    //   },
    // })
    // const user = await res.json()
    // console.log(user)

    // if (Component.getInitialProps) {
    // console.log("getInitialProps")
    // console.log(ctx.req.user)
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}
    // }
    // console.log(1)
    // const res = await fetch(`${process.env.DOMAIN_URL || ""}api/app_categories`)
    // const appCategories = await res.json()
    // return { appCategories }

    return { pageProps }
  }

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
