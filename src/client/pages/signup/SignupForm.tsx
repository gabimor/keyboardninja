// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import { Form } from "react-powerplug";
import * as EmailValidator from "email-validator";

import styled from "@emotion/styled";

import Input from "../../components/Input";
import Button from "../../components/Button";

interface Props {
  onSubmit: () => void;
}

export default function Signup({ onSubmit }: Props) {
  function handleSubmit(e, values, setValues) {
    e.preventDefault();

    const emailValid = EmailValidator.validate(values.email);
    const passwordValid =
      values.password &&
      values.password.length >= 6 &&
      values.password.length <= 12;

    setValues({ emailValid, passwordValid });

    if (emailValid && passwordValid) {
      onSubmit(values.email, values.password);
    }
  }
  const mockEmail = `a${Math.floor(Math.random() * Math.floor(1000000))}@b.com`;

  return (
    <Form
      initial={{
        email: mockEmail,
        password: "123456",
        emailValid: true,
        passwordValid: true,
      }}
    >
      {({ field, values, setValues }) => {
        return (
          <FormContainer onSubmit={(e) => handleSubmit(e, values, setValues)}>
            <Header>Sign up</Header>
            <Label>Email</Label>
            <Input {...field("email").bind} />
            {!values.emailValid && <Error>Please enter a valid email</Error>}
            <LabelWrapper>
              <Label>Password</Label>
            </LabelWrapper>
            <Input {...field("password").bind} />
            {!values.passwordValid && (
              <Error>Please choose a password of 6-12 charecters</Error>
            )}
            <Button type="submit" style={{ marginTop: 20 }}>
              Sign Up
            </Button>
            <SignupWrapper>
              Already have an account ?<Link to="/login"> Log in</Link>
            </SignupWrapper>
          </FormContainer>
        );
      }}
    </Form>
  );
}

const FormContainer = styled.form`
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
