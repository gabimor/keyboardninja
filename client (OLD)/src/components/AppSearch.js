import React, { Component } from 'react'
import { connect } from 'react-redux'

import Autosuggest from 'react-autosuggest'

const style = {
  color: '#171c1d',
    
  padding: '10px 20px',  
  background:'#eaeaea',
  border:0,
  borderBottom: '1px solid #171c1d'
}

class AppSearch extends Component {  
  state = {
    value: '',
    suggestions: []    
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })

    // this.props.onChange(newValue)
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.apps)
    })
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  )

  render() {
    const { value, suggestions } = this.state;
    
    const inputProps = {
      value,
      onChange: this.onChange,
      style
    }

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={suggestion => suggestion.name}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}

// const getSuggestionValue = suggestion => suggestion.name

const getSuggestions = (value, apps) => {
  const inputValue =  value.trim().toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0 ? [] : apps.filter(app =>
    app.name.toLowerCase().slice(0, inputLength) === inputValue
  )
} 

const mapStateToProps = ({apps}) => ({
  apps
})

export default connect(mapStateToProps)(AppSearch)