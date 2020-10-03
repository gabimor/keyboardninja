import React from "react";
import styled from "@emotion/styled";
import { renderToStaticMarkup } from "react-dom/server";
import { pageTemplate } from ".";

export function page500() {
  // const markup =
  const markup = (
    <Container>
      <div>
        <Title>Oops ... an error has occured</Title>
        <div>
          I this persists, please let us know <a href="/contact">here</a>.{" "}
        </div>
        <BackHome href="/">Back to home page</BackHome>
      </div>
    </Container>
  );

  return pageTemplate(
    renderToStaticMarkup(markup),
    "KeyboardNinja.me",
    {},
    "/",
    false
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  font-weight: 200;
  font-size: 16px;
`;

const Title = styled.div`
  font-weight: 300;
  padding-bottom: 10px;
  font-size: 22px;
`;

const BackHome = styled.a`
  display: block;
  margin-top: 30px;
`;
