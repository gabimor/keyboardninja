import React from 'react'

import { connect } from 'react-redux'

function Apps ({apps}) {
  return (
    <>
      {apps.map(item => <div key={item.id}>{item.name}</div>)}
    </>
  )
}

const mapStateToProps = ({apps}) => ({
  apps
})

export default connect(mapStateToProps)(Apps)
