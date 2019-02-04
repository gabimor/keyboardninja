import React from "react"
import Creatable from "react-select/lib/Creatable"
import { colors } from "../pages/layout"

export default function Select({ value, onChange, options }) {
  return (
    <Creatable
      value={value}
      onChange={onChange}
      options={options}
      styles={colourStyles}
    />
  )
}

const colourStyles = {
  container: styles => ({
    ...styles,
    display: "inline-block",
    width: "100%",
  }),
  control: (styles, state) => ({
    ...styles,
    borderRadius: 0,
    backgroundColor: state.isFocused
      ? colors.formInputFocusBG
      : colors.formInputBG,
    border: 0,
    color: colors.white,
    boxShadow: "none",
    minHeight: 0,
    cursor: "pointer",
  }),
  dropdownIndicator: (styles, state) => ({
    ...styles,
    color: colors.lightGray,
    padding: "8px 4px 7px",
    "&:hover": {
      color: colors.white,
    },
  }),
  placeholder: styles => ({
    ...styles,
    color: colors.lightGray,
  }),
  input: styles => ({
    ...styles,
    color: colors.white,
  }),
  singleValue: styles => ({
    ...styles,
    color: colors.white,
  }),
  option: (styles, state) => {
    return {
      ...styles,
      background: state.isFocused ? "#c3c3c3" : colors.formInputFocusBG,
      cursor: "pointer",
    }
  },
  menu: styles => ({
    ...styles,
    backgroundColor: colors.formInputFocusBG,
    borderRadius: 0,
  }),
  menuList: styles => ({
    ...styles,
    padding: 0,
  }),
}
