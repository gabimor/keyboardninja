import React, {Component} from 'react'

const LONG_PRESS_DURATION = 600

export default class extends Component {

  constructor(props) {
    super(props)

    this.state = {
      value: ''    
    }

    this.input = React.createRef()

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.input.current.onkeyup = this.handleKeyUp.bind(this)  
    this.input.current.onkeydown = this.handleKeyDown.bind(this)
    this.input.current.onfocus = () => this.setState({value:''})
  }

  handleLongPress(key) {
    if (key === "Escape") {
      this.setState({value:''})
      this.lastIsLong = true
    }
    else if (key === "Enter") {
      this.input.current.blur()
    }
  }

  handleKeyDown(e) {  
    e.preventDefault()    
    if (e.key !== this.lastKeyDown) {
      this.longPressTimoutId = setTimeout(() => this.handleLongPress(e.key),LONG_PRESS_DURATION)
      this.lastKeyDown = e.key
    }
  }

  handleKeyUp(e) {        
    e.preventDefault()
    console.log(this.lastIsLong)
    if (!this.lastIsLong) {
      this. setState(state => {
        const addPlus = state.value.slice(-1) !== ' ' && state.value !== ''
        let  value = state.value
        if (addPlus) value += '+'
        value += getKeyName(e.key)

        return { value }
      })
    }

    clearTimeout(this.longPressTimoutId)
    this.lastKeyDown = undefined
    this.lastIsLong = false
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    const { value } = this.state

    return (
      <input type="text" name="osx" value={value} ref={this.input} onChange={this.handleChange} autoComplete="off"/>
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