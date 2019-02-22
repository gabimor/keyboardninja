import { Component } from "react"
import { connect } from "react-redux"

import styled from "styled-components"
import Router, { withRouter } from "next/router"
import { actionTypes } from "../store"

import { encodeAppName, appUrlPrefix } from "../helpers"
import ShortcutList from "./app/ShortcutList"
import Layout from "./layout/Layout"

class App extends Component {
  static async getInitialProps({ query }) {
    const { id } = query
    const res = await fetch(`http://localhost:3000/api/apps/${id}`)
    const app = await res.json()
    return { app }
  }

  constructor(props) {
    super(props)

    // let selectedAppId = props.router.query.appId
    // selectedAppId = selectedAppId ? +selectedAppId : undefined

    // this.state = {
    //   selectedAppId,
    //   appName: this.getAppName(selectedAppId),
    //   shownShortcuts: this.reduceShortcuts(selectedAppId, props.shortcuts),
    // }
  }

  // componentDidMount() {
  //   Router.events.on("routeChangeComplete", () => {
  //     if (!this.props.router.query.appId)
  //       this.setState({ selectedAppId: undefined, shownShortcuts: {} })
  //   })
  // }

  reduceShortcuts(selectedAppId, shortcuts) {
    if (!selectedAppId) return {}

    const appShortcuts = shortcuts.filter(item => item.appId === selectedAppId)

    return appShortcuts.reduce((acc, curr) => {
      if (!acc[curr.appSectionId]) acc[curr.appSectionId] = []
      acc[curr.appSectionId].push(curr)

      return acc
    }, {})
  }

  // getAppName(selectedAppId) {
  //   if (!selectedAppId) return ""
  //   return this.props.apps.find(item => item.id === selectedAppId).name
  // }

  renderShortcutCategory(sectionId) {
    const sectionTitle = this.props.appSections.find(
      item => item.id === sectionId
    ).name
    const { shownShortcuts } = this.state

    return (
      <ShortcutList
        key={sectionId}
        shortcuts={shownShortcuts[sectionId]}
        title={sectionTitle}
        onAddShortcut={this.props.doSuggestShortcut}
      />
    )
  }

  render() {
    console.log(this.props)
    // const { shownShortcuts } = this.state
    //const { doSuggestShortcut } = this.props
    // const sectionIds = Object.keys(shownShortcuts)
    return (
      <Layout>
        <ResultsContainer>
          {/* {sectionIds.map(key => this.renderShortcutCategory(+key))} */}
        </ResultsContainer>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return { ...state }
}

const mapDispatchToProps = dispatch => ({
  doSuggestShortcut() {
    dispatch({ type: actionTypes.SUGGEST_SHORTCUT })
  },
  doCancelSuggestShortcut() {
    dispatch({ type: actionTypes.CANCEL_SUGGEST_SHORTCUT })
  },
  doCancelSuggestApp() {
    dispatch({ type: actionTypes.CANCEL_SUGGEST_APP })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App))

const ResultsContainer = styled.div`
  display: grid;
  grid-gap: 30px 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`
