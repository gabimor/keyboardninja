import { Component } from "react"
import { connect } from "react-redux"

import Layout from "./layout/Layout"
import AppList from "../components/AppList"

class Apps extends Component {
  render() {
    const appsByCategory = this.props.apps.reduce((acc, currApp) => {
      const categoryName = this.props.appCategories.find(
        item => item.id === currApp.categoryId
      ).name

      acc[categoryName] = acc[categoryName] || []

      acc[categoryName].push(currApp)
      return acc
    }, {})

    return (
      <Layout>
        {Object.keys(appsByCategory).map(categoryName => (
          <AppList
            key={categoryName}
            name={categoryName}
            apps={appsByCategory[categoryName]}
          />
        ))}
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  const { apps, appCategories } = state
  return { apps, appCategories }
}

export default connect(mapStateToProps)(Apps)
