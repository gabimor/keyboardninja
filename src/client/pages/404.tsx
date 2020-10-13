import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { getTitle } from "@shared/utils";

const Page404 = () => {
  useEffect(() => {
    document.title = getTitle("/404");
  }, []);


  return (
    <Container>
      <div>
        <Header>
          <Code>404 </Code>Oops...
        </Header>
        <Message>There's no one here</Message>
      </div>
    </Container>
  );
};

export default Page404;

const Header = styled.h1`
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
