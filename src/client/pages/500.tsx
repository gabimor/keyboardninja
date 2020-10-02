import React from "react";
import styled from "@emotion/styled";

const Page500 = () => {
  return (
    <Container>
      <div>
        <Header>
          <Code>500 </Code>Oops...
        </Header>
        <Message>
          Sorry, Something went wrong....
          <br />
          If this problem persists please <a href="/contact">let us know</a>
        </Message>
      </div>
    </Container>
  );
};

export default Page500;

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
