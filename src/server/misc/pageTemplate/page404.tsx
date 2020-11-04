import React from "react";
import styled from "@emotion/styled";
import { renderToStaticMarkup } from "react-dom/server";
import { pageTemplate } from ".";

export function page404() {
  const markup = (
    <Container>
      <div>
        <Title>
          <Code>404 </Code>Oops...
        </Title>
        <Message>There's no one here</Message>
      </div>
    </Container>
  );

  return pageTemplate(
    renderToStaticMarkup(markup),
    "KeyboardNinja.me",
    undefined,
    "/",
    false
  );
}

const Title = styled.h1`
  font-size: 40px;
  color: #e86562;
  margin: 100px 0 10px;
`;

const Message = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  color: #e9e5e5;
`;

const Code = styled.span`
  color: #fa9290;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
