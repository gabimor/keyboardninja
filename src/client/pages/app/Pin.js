import React from "react" // eslint-disable-line no-unused-vars
import PropTypes from "prop-types"
import styled from "@emotion/styled"

export default function Shortcut({ count, isPinned }) {
  return (
    <Container isPinned={isPinned}>
      <IconWrapper>
        <svg
          style={{ height: 12, color: isPinned ? "#FFD46F" : "#A4A3A6" }}
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="thumbtack"
          className="svg-inline--fa fa-thumbtack fa-w-12"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path
            fill="currentColor"
            d="M298.028 214.267L285.793 96H328c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v48c0 13.255 10.745 24 24 24h42.207L85.972 214.267C37.465 236.82 0 277.261 0 328c0 13.255 10.745 24 24 24h136v104.007c0 1.242.289 2.467.845 3.578l24 48c2.941 5.882 11.364 5.893 14.311 0l24-48a8.008 8.008 0 0 0 .845-3.578V352h136c13.255 0 24-10.745 24-24-.001-51.183-37.983-91.42-85.973-113.733z"
          />
        </svg>
      </IconWrapper>
      <Count isPinned={isPinned}>{count}</Count>
    </Container>
  )
}

Shortcut.propTypes = {
  count: PropTypes.number.isRequired,
  isPinned: PropTypes.bool.isRequired,
}

Shortcut.defaultProps = {
  count: 0,
  isPinned: false,
}

const Container = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: flex-start;
  border: solid 1px ${({ isPinned }) => (isPinned ? "#b3995b" : "#9D8B8B")};
  border-radius: 3px;
  padding: 5px 0 3px;
  cursor: pointer;

  :hover {
    border-color: ${({ isPinned }) => (isPinned ? "#ffdb87" : "#e9e5e5")};
    span {
      color: ${({ isPinned }) => (isPinned ? "#ffdb87" : "#FFFFFF")};
    }
    svg path {
      color: ${({ isPinned }) => (isPinned ? "#ffdb87" : "#e9e5e5")};
    }
  }
`

const IconWrapper = styled.span`
  line-height: 11px;
  margin-left: 7px;
`

const Count = styled.span`
  font-size: 11px;
  color: ${({ isPinned }) => (isPinned ? "#FFD46F" : "#E9E5E5")};
  margin: 0 auto;
  padding: 0 6px;
  line-height: 10px;
`
