import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { OSs } from "../../../server/db/oss";

interface OSSelectProps {
  oss: OSs[];
  os: OSs;
  onSelect: Function;
}

function OSSelect({ oss, os, onSelect }: OSSelectProps) {
  return (
    <Container>
      <OSButton
        buttonOS="win"
        selectedOS={os}
        supportedOSS={oss}
        onClick={onSelect}
      />
      <OSButton
        buttonOS="mac"
        selectedOS={os}
        supportedOSS={oss}
        onClick={onSelect}
      />
    </Container>
  );
}

interface OSButtonProps {
  buttonOS: string;
  selectedOS: string;
  supportedOSS: string[];
  onClick: Function;
}

const OSButton = ({
  buttonOS,
  selectedOS,
  supportedOSS,
  onClick,
}: OSButtonProps) => {
  const SELECTED_COLOR = "#E9E5E5";
  const UNSELECTED_COLOR = "#5A5A5A";
  const iconName = buttonOS === "mac" ? "apple" : "windows";

  return (
    supportedOSS.includes(buttonOS) && (
      <i
        className={"fab fa-" + iconName}
        style={{
          color: selectedOS === buttonOS ? SELECTED_COLOR : UNSELECTED_COLOR,
          cursor: selectedOS === buttonOS ? "default" : "pointer",
        }}
        onClick={() =>
          selectedOS === buttonOS ? undefined : onClick(buttonOS)
        }
      />
    )
  );
};
export default OSSelect;

const Container = styled.span`
  font-size: 30px;
  i + i {
    margin-left: 20px;
  }
`;
