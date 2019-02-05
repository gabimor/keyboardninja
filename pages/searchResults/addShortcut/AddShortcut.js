import React, { Component } from "react"
import styled from "styled-components"

import { colors } from "../../layout"
import ShortcutInput from "./ShortcutInput"
import Select from "../../../components/Select"
import Button from "../../../components/Button"
import Tooltip from "../../../components/Tooltip"

class AddShortcut extends Component {
  constructor({ keys, action, section, category }) {
    super()
    this.state = {
      category,
      action,
      section,
      keys,
      addClicked: false,
    }
  }

  componentDidMount() {
    this.shortcutInputElm.focus()
  }

  handleKeysChange = keys => {
    this.setState({
      keys,
    })
  }

  handleAddKey = key => {
    if (!this.state.keys.includes(key)) {
      this.setState(state => ({ keys: [...state.keys, key] }))
    }
    this.shortcutInputElm.focus()
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  handleSectionChange = ({ value, label }) => {
    this.setState({ section: { value, label } })
  }

  handleActionChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleAdd = () => {
    this.setState({ addClicked: true })

    const { keys, action, section } = this.state

    if (keys && keys.length > 0 && action && section) {
      this.props.onAdd(keys, action, section)
    }
  }

  render() {
    const { keys, action, section, addClicked } = this.state
    const { sections, onCancel } = this.props
    return (
      <Container onSubmit={this.handleSubmit}>
        <h3>
          Thanks for <b>contributing!</b> Here you go:
        </h3>
        <InnerContainer>
          {addClicked && keys.length === 0 && (
            <ShortcutMessage>Please enter a shortcut</ShortcutMessage>
          )}
          <ShortcutLabel>Shortcut</ShortcutLabel>
          <ShortcutContainer>
            <ShortcutInput
              causeFocus={elm => (this.shortcutInputElm = elm)}
              onChange={this.handleKeysChange}
              keys={keys}
            />
            <Tooltip style={{ position: "absolute", top: 60, width: 250 }}>
              Click your shortcut keys one at a time
              <br />
              Use <b>BackSpace</b> to delete a key
              <br /> Use <b>Tab</b> to move on
            </Tooltip>
          </ShortcutContainer>
          <Advanced>
            <span onClick={() => this.handleAddKey("tab")}>Add Tab</span> |{" "}
            <span onClick={() => this.handleAddKey("BackSpace")}>
              BackSpace
            </span>
          </Advanced>
          {addClicked && !action && (
            <ActionMessage>Please enter the action</ActionMessage>
          )}
          <ActionLabel>Action</ActionLabel>
          <ActionInput
            type="text"
            name="action"
            value={action}
            onChange={this.handleActionChange}
            autoComplete="off"
          />
          {addClicked && !section && (
            <SectionMessage>Please enter the section</SectionMessage>
          )}
          <SectionLabel>Section</SectionLabel>
          <SectionContainer>
            <Select
              value={section}
              onChange={this.handleSectionChange}
              options={sections}
            />
          </SectionContainer>
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

export default AddShortcut

const errorLabel = `
  font-size:13px;
  color:${colors.lightGray};
`

const Container = styled.div`
  padding: 16px 30px 3px 30px;
  margin-bottom: 30px;
  background: ${colors.formBG};
  position: relative;
  z-index: 10;
`

const InnerContainer = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: auto 1fr auto 1fr auto 1fr auto;
  grid-template-rows: auto auto auto;
  grid-column-gap: 15px;
  min-width: 850px;
  align-items: center;

  & input:focus,
  & textarea:focus,
  & select:focus {
    background: #afadad;
  }
`

const ShortcutContainer = styled.div`
  grid-area: 2/2/2/2;
  position: relative;
`

const ActionInput = styled.input`
  grid-area: 2/4/2/4;
  margin-right: 15px;
  width: 100%;
`

const SectionContainer = styled.div`
  grid-area: 2/6/2/6;
  position: relative;
`

const ShortcutMessage = styled.div`
  grid-area: 1/2/1/2;
  ${errorLabel}
`

const ActionMessage = styled.div`
  grid-area: 1/4/1/4;
  ${errorLabel}
`

const SectionMessage = styled.div`
  grid-area: 1/6/1/6;
  ${errorLabel}
`

const ButtonContainer = styled.div`
  grid-area: 2/7/2/7;
`

const ShortcutLabel = styled.div`
  grid-area: 2/1/2/1;
  text-align: right;
`

const ActionLabel = styled.div`
  grid-area: 2/3/2/3;
  text-align: right;
`

const SectionLabel = styled.div`
  grid-area: 2/5/2/5;
  text-align: right;
`

const Advanced = styled.div`
  color: ${colors.panelZebra};
  grid-area: 3/2/3/2;
  padding-top: 3px;
  text-align: right;
  font-size: 12px;
`
