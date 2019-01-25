import React, {Component} from 'react'
import AppSearch from '../../components/AppSearch'

import ShortcutInput from './ShortcutInput'
// import { saveShortcut } from '../../api/shortcuts'

class ShortcutForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      appId:'',
      categoryId:'',
      action:'',
      osx:'',
      win:'',
      comment:''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.hanleAppSelect = this.hanleAppSelect.bind(this)
  }

  hanleAppSelect(appId) {
    console.log(appId)
  }
  
  handleChange(e) {    
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleSubmit(e) {
    e.preventDefault()

    const { appId, categoryId, action, osx, comment } = this.state
    // saveShortcut(appId, categoryId, action, osx, comment)
  }

  render() {
    const {action, osx,win, comment} = this.state
    return (
      <form onSubmit={this.handleSubmit}>          
        <AppSearch apps={[{id:1, name:"one"}]} onChange={this.hanleAppSelect} />
        categoryId
        <input type="text" name="categoryId" onChange={this.handleChange} autoComplete="off"/> <br/>
        action
        <input type="text" name="action" value={action} onChange={this.handleChange} autoComplete="off"/><br/>
        <br/>
        <br/>
        
        <ShortcutInput name="osx" onChange={this.handleChange} /> 

        <i className="fab fa-windows"></i>
        <i className="fab fa-apple"></i>

        <br/>
        <br/>
        comment
        <input type="text" name="comment" value={comment} onChange={this.handleChange} autoComplete="off"/> <br/>
        PREVIEW <br/>
        <button type="submit">Add</button>
      </form>
    )
  }

}

export default ShortcutForm