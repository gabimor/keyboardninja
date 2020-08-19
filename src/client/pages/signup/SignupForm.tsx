import React from "react";
import { Link } from "react-router-dom";

import styled from "@emotion/styled";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { emailRegex } from "@client/helpers";

interface Props {
  onSubmit: (data: SignupFormData) => Promise<void>;
}

export interface SignupFormData {
  email: string;
  password: string;
}

export default function SignupForm({ onSubmit }: Props) {
  // TODO: remove this
  const defaultValues = {
    email: `a${Math.floor(Math.random() * Math.floor(1000000))}@b.com`,
    password: "123456",
  };

  const { register, handleSubmit, errors } = useForm<SignupFormData>({
    defaultValues,
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Header>Sign up</Header>
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
      </LabelWrapper>
      <Input
        name="password"
        ref={register({
          required: "Please choose a password",
          minLength: {
            value: 6,
            message: "Please choose a password of 6-12 charecters",
          },
          maxLength: {
            value: 12,
            message: "Please choose a password of 6-12 charecters",
          },
        })}
      ></Input>
      {errors.password && <Error>{errors.password.message}</Error>}
      <Button style={{ marginTop: 20 }}>Sign Up</Button>
      <SignupWrapper>
        Already have an account ?<Link to="/login"> Log in</Link>
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
