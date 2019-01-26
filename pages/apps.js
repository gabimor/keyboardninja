import { Component } from 'react'

import Layout from '../components/Layout'
import AppCategory from './apps/AppCategory'

export default class extends Component {    
  render() {    
    const appsByCategory = this.props.apps.reduce((acc,currApp) => {

      const categoryName = this.props.appCategories.find(item => item.id === currApp.categoryId).name
      
      acc[categoryName] = acc[categoryName] || []

      acc[categoryName].push(currApp)
      return acc
    }, {})
    console.log(appsByCategory)

    return (
      <Layout>
          {Object.keys(appsByCategory).map(categoryName => (
            <AppCategory name={categoryName} apps={appsByCategory[categoryName]}/>
          ))}
      </Layout>
    )
  }
}