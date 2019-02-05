import React, { Component } from "react"
import styled from "styled-components"

import { colors } from "../layout"
import Button from "../../components/Button"

class AddApp extends Component {
  constructor({ name, company }) {
    super()
    this.state = {
      name,
      company,
      addClicked: false,
    }

    this.nameInput = React.createRef()
  }

  componentDidMount() {
    this.nameInput.current.focus()
  }

  componentWillReceiveProps({ name }) {
    this.setState({ name })
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleAdd = () => {
    this.setState({ addClicked: true })

    if (name) {
      const { name, comapny } = this.state

      this.props.onAdd(name, comapny)
    }
  }

  render() {
    const { name, company, addClicked } = this.state
    const { onCancel } = this.props
    return (
      <Container onSubmit={this.handleSubmit}>
        <h3>Suggest a new app:</h3>
        <InnerContainer>
          {addClicked && !name && (
            <NameMessage>Please enter the app name</NameMessage>
          )}
          <NameLabel>Name</NameLabel>
          <NameInput
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            autoComplete="off"
            ref={this.nameInput}
          />
          <CompanyLabel>Company</CompanyLabel>
          <CompanyInput
            type="text"
            name="company"
            value={company}
            onChange={this.handleChange}
            autoComplete="off"
          />
          <ButtonContainer>
            <Button onClick={this.handleAdd} style={{ margin: "0 8px" }}>
              Add
            </Button>
            <Button onClick={() => onCancel()} secondary={true}>
              Cancel
            </Button>
          </ButtonContainer>
        </InnerContainer>
      </Container>
    )
  }
}

export default AddApp

const errorLabel = `
  font-size:13px;
  color:${colors.lightGray};
`

const Container = styled.div`
  padding: 16px 30px 16px 30px;
  margin-bottom: 30px;
  background: ${colors.formBG};
`

const InnerContainer = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: auto 1fr auto 1fr auto;
  grid-template-rows: auto auto;
  grid-column-gap: 15px;
  // min-width: px;
  align-items: center;

  & input:focus,
  & textarea:focus,
  & select:focus {
    background: #afadad;
  }
`

const NameInput = styled.input`
  grid-area: 2/2/2/2;
  margin-right: 15px;
  width: 100%;
`

const CompanyInput = styled.input`
  grid-area: 2/4/2/4;
  margin-right: 15px;
  width: 100%;
`

const NameMessage = styled.div`
  grid-area: 1/2/1/2;
  ${errorLabel}
`

const ButtonContainer = styled.div`
  grid-area: 2/5/2/5;
`

const NameLabel = styled.div`
  grid-area: 2/1/2/1;
  text-align: right;
`

const CompanyLabel = styled.div`
  grid-area: 2/3/2/3;
  text-align: right;
`
