import Layout from '../components/Layout'
import { AppConsumer } from '../components/AppContext'

const Apps = ({apps}) => (
  <Layout>
    <AppConsumer>
      {({ apps }) => (
        apps.map(item => <div key={item.id}>{item.name}</div>)
      )}
    </AppConsumer>
  </Layout>
)
export default Apps