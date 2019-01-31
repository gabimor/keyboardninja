import { connect } from "react-redux"

import Layout from "./layout/Layout"

const About = props => {
  return <Layout>About Placeholder</Layout>
}

function mapStateToProps(state) {
  const { apps } = state
  return { apps }
}

export default connect(mapStateToProps)(About)
