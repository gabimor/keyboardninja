import React from "react" // eslint-disable-line no-unused-vars
import PropTypes from "prop-types"
import styled from "@emotion/styled"

export default function Shortcut({ count, isPinned, onClick }) {
  return (
    <Container isPinned={isPinned} onClick={onClick}>
      <IconWrapper>
        {isPinned ? (
          <img src="/pin-on.svg" alt="" />
        ) : (
          <img src="/pin-off.svg" alt="" />
        )}
      </IconWrapper>
      <Count isPinned={isPinned}>{count}</Count>
    </Container>
  )
}

Shortcut.propTypes = {
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
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

  img {
    height: 12px;
  }

  :hover {
    border-color: ${({ isPinned }) => (isPinned ? "#ffdb87" : "#e9e5e5")};
    span {
      color: ${({ isPinned }) => (isPinned ? "#ffdb87" : "#FFFFFF")};
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
