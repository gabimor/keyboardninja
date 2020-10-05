import styled from "@emotion/styled";
import React from "react";

export default {
  title: "Layout/Colors",
};

export const Default = () => (
  <Container>
    {colors.map((color) => (
      <Color {...color}></Color>
    ))}
  </Container>
);

const colors = [
  { color: "#a12d2a", name: "shortcuts titles" },
  { color: "#d1403d", name: "darkRed" },
  { color: "#e86562", name: "red, links" },
  { color: "#fa9290", name: "links" },
  { color: "#5a5a5a", name: "mutedIcon" },
  { color: "#9d8b8b", name: "labelText, pinBorder" },
  { color: "#a4a3a6", name: "pin" },
  { color: "#d1b4b4", name: "textRed" },
  { color: "#d1d0d4", name: "soon text" },
  { color: "#e9e5e5", name: "softText" },
  { color: "#ffe6ab", name: "pinSelected" },
  { color: "#ffffff", name: "white" },
  { color: "#4f4242", name: "appPanel" },
  { color: "#453a3a", name: "darkBorder" },
  { color: "#211c1c", name: "input background" },
  { color: "#2c2525", name: "panelZebra" },
  { color: "#2e2424", name: "panel" },
  { color: "#442323", name: "mainBG1" },
  { color: "#270505", name: "mainBG2" },
  { color: "#000000", name: "black" },
];

type ColorProps = {
  color: string;
  name?: string;
};

const Container = styled.div`
  columns: 4;
`;

const Color = ({ color, name }: ColorProps) => (
  <ColorSquareContainer>
    <ColorSquare color={color}></ColorSquare>
    <div>
      {color}
      <NameContainer>{name}</NameContainer>
    </div>
  </ColorSquareContainer>
);

const NameContainer = styled.div`
  color: #d1d0d4;
`;

const ColorSquareContainer = styled.div`
  display: flex;
  align-items: center;
  break-inside: avoid;
`;

const ColorSquare = styled.div`
  display: inline-block;
  width: 100px;
  height: 100px;
  background: ${({ color }: ColorProps) => color};
  font-size: 12px;
  margin-right: 10px;
`;
