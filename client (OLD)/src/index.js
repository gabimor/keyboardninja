import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App'
import * as serviceWorker from './serviceWorker'

// import { AppContext } from './components/AppContext'

// ReactDOM.render(<AppContext.Provider value="test">
//                   <App />
//                 </AppContext.Provider>
//               , document.getElementById('root'))


ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
