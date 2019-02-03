import { connect } from "react-redux"

import SearchBar from "../components/SearchBar"
import Layout from "./layout/Layout"

const About = props => {
  return (
    <Layout>
      <SearchBar onChange={selectedAppId => this.handleSearch(selectedAppId)} />
    </Layout>
  )
}

function mapStateToProps(state) {
  const { apps } = state
  return { apps }
}

export default connect(mapStateToProps)(About)
