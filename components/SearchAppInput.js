import React, { Component } from "react"

import Autosuggest from "react-autosuggest"

const Suggestion = ({ id, name, companyName }) => {
  if (id !== -1) {
    return (
      <div>
        {name}
        <span className="react-autosuggest__suggestion--companyName">
          {companyName}
        </span>
      </div>
    )
  } else {
    return (
      <div>
        Missing <b>{name}</b> ? select to me add it
      </div>
    )
  }
}

class SearchAppInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value || "",
      suggestions: [],
    }
  }

  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    if (suggestion.id !== -1) {
      this.props.onSelection(suggestion.id)
    } else {
      this.props.onNew(suggestion.name)
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    })
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.apps),
    })
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  renderSuggestion = suggestion => <Suggestion {...suggestion} />

  render() {
    const { value, suggestions } = this.state

    const inputProps = {
      value,
      onChange: this.onChange,
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
  const inputValue = value.trim().toLowerCase()

  const suggestedApps = apps.filter(
    app =>
      app.name.toLowerCase().includes(inputValue) ||
      app.companyName.toLowerCase().includes(inputValue)
  )

  return suggestedApps.length > 0
    ? suggestedApps
    : [{ id: -1, name: inputValue }]
}

export default SearchAppInput
