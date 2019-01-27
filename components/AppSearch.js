import React, { Component } from 'react'

import Autosuggest from 'react-autosuggest'

const style = {
  color: '#171c1d',
    
  padding: '10px 20px',  
  background:'#eaeaea',
  border:0,
  borderBottom: '1px solid #171c1d'
}

class AppSearch extends Component {  
  constructor(props) {
    super(props)

    this.state = {
      value: props.value || '',
      suggestions: []    
    }
  }

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.props.onSelection(suggestion.id)
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
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
        onSuggestionSelected={this.onSuggestionSelected}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={suggestion => suggestion.name}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}

const getSuggestions = (value, apps) => {
  const inputValue =  value.trim().toLowerCase()
  const inputLength = inputValue.length

  return inputLength < 1 ? [] : apps.filter(app =>
    app.name.toLowerCase().includes(inputValue)
  )
} 

export default AppSearch