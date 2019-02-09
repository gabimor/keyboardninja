import React, { Component } from "react"

import Autosuggest from "react-autosuggest"

class SearchAppInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value || "",
      suggestions: props.apps,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      // TODO: do something better than this hack
      const { value } = this.state
      const autoSuggestInput = document.querySelector(
        ".react-autosuggest__input"
      )
      autoSuggestInput.focus()
      autoSuggestInput.setSelectionRange(0, value.length)
    }, 0)
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

    console.log(2)
    this.show = false
  }

  onChange = (event, { newValue }) => {
    this.show = true
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

  shouldRenderSuggestions = newValue => {
    return this.show && newValue.length > 0
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
        focusInputOnSuggestionClick={true}
        shouldRenderSuggestions={this.shouldRenderSuggestions}
        inputProps={inputProps}
        id="mainsearch"
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

  return suggestedApps.length > 0 ? suggestedApps : [{ id: -1, name: value }]
}

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
        Missing <b>{name}</b> ? suggest adding it
      </div>
    )
  }
}

export default SearchAppInput
