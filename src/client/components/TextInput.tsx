import styled from "@emotion/styled";

const shared = `
  border: solid 1px #463d3d;
  background: #332e2e;
  color: #e9e5e5;
  border-radius: 3px;
  width: 100%;

  ::placeholder {
    color:#806f6f;
  }
`;

export const TextInput = styled.input`
  ${shared}
  padding: 9px;
`;

export const TextArea = styled.textarea`
  ${shared}
  display: block;
  padding: 8px 10px;
`;
