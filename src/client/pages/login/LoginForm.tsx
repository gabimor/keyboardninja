import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";

import { emailRegex } from "@client/helpers";
import Input from "@client/components/Input";
import Button from "@client/components/Button";

interface Props {
  onSubmit: (data: LoginFormData) => Promise<void>;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm({ onSubmit }: Props) {
  // TODO: remove this
  const defaultValues = {
    email: `a${Math.floor(Math.random() * Math.floor(1000000))}@b.com`,
    password: "123456",
  };

  const { register, handleSubmit, errors } = useForm<LoginFormData>({
    defaultValues,
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Header>Log in</Header>
      <Label>Email</Label>
      <Input
        name="email"
        ref={register({
          required: "Please enter your email",
          pattern: {
            value: emailRegex,
            message: "Please enter a valid email",
          },
        })}
      ></Input>
      {errors.email && <Error>{errors.email.message}</Error>}
      <LabelWrapper>
        <Label>Password</Label>
        <a>Forgot password ?</a>
      </LabelWrapper>
      <Input
        name="password"
        ref={register({
          required: "Please enter your password",
        })}
      ></Input>
      {errors.password && <Error>{errors.password.message}</Error>}
      <Button style={{ marginTop: 20 }}>Log in</Button>
      <SignupWrapper>
        Don't have an account ?<Link to="/signup"> Sign Up</Link>
      </SignupWrapper>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 10px;
  a {
    font-size: 13px;
  }
`;

const SignupWrapper = styled.div`
  text-align: center;
  margin-top: 40px;
  color: #e9e5e5;
`;

const Label = styled.label`
  color: #9d8b8b;
  font-size: 14px;
  margin-bottom: 5px;
`;

const Error = styled.label`
  margin-top: 5px;
  color: #e86562;
  font-size: 14px;
`;
