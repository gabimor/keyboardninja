import React, {Component} from 'react'

const toggleKey = "NumLock"

class ShortcutInput extends Component {

  constructor(props) {
    super(props)

    this.state = {
      value: '',
      typeMode: true      
    }

    this.input = React.createRef()

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.input.current.onkeyup = this.handleKeyUp.bind(this)  
    this.input.current.onkeydown = this.handleKeyDown.bind(this)
  }

  handleKeyDown(e) {  
    if (this.state.typeMode || e.key === toggleKey) return
    e.preventDefault()

    if (e.key !== this.lastKeyDown) {
      this.setState(state => {
        const addPlus = state.value.slice(-1) !== ' ' && state.value !== ''
        let  value = state.value
        if (addPlus) value += '+'
        value += getKeyName(e.key)

        return { value }
       }
      )
    }
    this.lastKeyDown = e.key
  }

  handleKeyUp(e) {    
    if (e.key === toggleKey) this.setState(state => ({typeMode : !state.typeMode}))
  }  

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    const { value, typeMode } = this.state

    return (
      <>
        <input type="text" name="osx" value={value} ref={this.input} onChange={this.handleChange} autoComplete="off"/>
        {typeMode ? "text" : "capture"}  
      </>
    )
  }
}

function getKeyName(key) {
  const keyNames = {
    Control: 'Ctrl',
    ' ': 'Space',
    Escape:'Esc'
  }
  
  return keyNames[key] || key
}


export default ShortcutInput  