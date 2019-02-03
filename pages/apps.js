import { connect } from "react-redux"

import styled from "styled-components"
import { colors } from "./layout"

import Layout from "./layout/Layout"
import AppList from "../components/AppList"
import SearchBar from "../components/SearchBar"

const Container = styled.div`
  padding: 20px 30px;
  background: ${colors.panelGray};
  display: grid;
  grid-gap: 30px 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

function Apps({ apps, appCategories }) {
  const appsByCategory = apps.reduce((acc, currApp) => {
    const categoryName = appCategories.find(
      item => item.id === currApp.categoryId
    ).name

    acc[categoryName] = acc[categoryName] || []

    acc[categoryName].push(currApp)
    return acc
  }, {})

  return (
    <Layout>
      <SearchBar onChange={selectedAppId => this.handleSearch(selectedAppId)} />
      <Container>
        {Object.keys(appsByCategory).map(categoryName => (
          <AppList
            key={categoryName}
            name={categoryName}
            apps={appsByCategory[categoryName]}
          />
        ))}
      </Container>
    </Layout>
  )
}

function mapStateToProps(state) {
  const { apps, appCategories } = state
  return { apps, appCategories }
}

export default connect(mapStateToProps)(Apps)
