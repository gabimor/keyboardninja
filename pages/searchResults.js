import { Component } from "react"
import { connect } from "react-redux"

import styled from "styled-components"
import Router, { withRouter } from "next/router"
import { actionTypes } from "../store"

import { encodeAppName } from "../helpers"
import ShortcutList from "./searchResults/ShortcutList"
import EmptyAppMessage from "./searchResults/EmptyAppMessage"
import SearchBar from "../components/SearchBar"
import AddShortcut from "./searchResults/addShortcut/AddShortcut"
import AddApp from "./searchResults/AddApp"
import Layout from "./layout/Layout"

class App extends Component {
  constructor(props) {
    super(props)

    let selectedAppId = props.router.query.appId
    selectedAppId = selectedAppId ? +selectedAppId : undefined

    this.state = {
      selectedAppId,
      appName: this.getAppName(selectedAppId),
      shownShortcuts: this.reduceShortcuts(selectedAppId, props.shortcuts),
    }
  }

  componentDidMount() {
    Router.events.on("routeChangeComplete", () => {
      if (!this.props.router.query.appId)
        this.setState({ selectedAppId: undefined, shownShortcuts: {} })
    })
  }

  reduceShortcuts(selectedAppId, shortcuts) {
    if (!selectedAppId) return {}

    const appShortcuts = shortcuts.filter(item => item.appId === selectedAppId)

    return appShortcuts.reduce((acc, curr) => {
      if (!acc[curr.appSectionId]) acc[curr.appSectionId] = []
      acc[curr.appSectionId].push(curr)

      return acc
    }, {})
  }

  getAppName(selectedAppId) {
    if (!selectedAppId) return ""
    return this.props.apps.find(item => item.id === selectedAppId).name
  }

  handleSearch(selectedAppId) {
    const shownShortcuts = this.reduceShortcuts(
      selectedAppId,
      this.props.shortcuts
    )
    const appName = this.getAppName(selectedAppId)
    Router.push("/?appId=" + selectedAppId, "/apps/" + encodeAppName(appName))

    this.setState({ shownShortcuts, appName })
  }

  handleAddShortcut = title => {
    this.props.doSetOverlay(true)
    this.props.doAddShortcut(title)
  }

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
        onAddShortcut={this.handleAddShortcut}
      />
    )
  }

  render() {
    const { shownShortcuts, appName } = this.state
    const { addShortcut, addApp } = this.props
    const sectionIds = Object.keys(shownShortcuts)

    return (
      <Layout>
        <SearchBar
          onChange={selectedAppId => this.handleSearch(selectedAppId)}
          value={appName}
        />
        {addShortcut && <AddShortcut />}
        {addApp && <AddApp name={addApp} />}
        <ResultsContainer>
          {sectionIds.length > 0 ? (
            sectionIds.map(key => this.renderShortcutCategory(+key))
          ) : (
            <EmptyAppMessage onClick={this.handleAddShortcut} />
          )}
        </ResultsContainer>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return { ...state }
}

const mapDispatchToProps = dispatch => ({
  doAddShortcut() {
    dispatch({ type: actionTypes.ADD_SHORTCUT })
  },
  doSetOverlay(value) {
    dispatch({ type: actionTypes.SET_OVERLAY, value })
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
