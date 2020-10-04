import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { emailRegex } from "@client/helpers";

import { UserType } from "@src/types/User.type";
import { FacebookButton, GoogleButton } from "@client/components/SocialButtons";
import { PrimaryButton } from "@client/components/Buttons";
import TextInput from "@client/components/TextInput";

type FormData = Pick<UserType, "email" | "password">;

interface Props {
  onSubmit: (data: FormData) => Promise<void>;
}

export default function LoginForm({ onSubmit }: Props) {
  const { register, handleSubmit, errors } = useForm<FormData>();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Header>Log in</Header>
      <Label>Email</Label>
      <TextInput
        name="email"
        ref={register({
          required: "Please enter your email",
          pattern: {
            value: emailRegex,
            message: "Please enter a valid email",
          },
        })}
      ></TextInput>
      {errors.email && <Error>{errors.email.message}</Error>}
      <LabelWrapper>
        <Label>Password</Label>
        <a>Forgot password ?</a>
      </LabelWrapper>
      <TextInput
        name="password"
        type="password"
        ref={register({
          required: "Please enter your password",
        })}
      ></TextInput>
      {errors.password && <Error>{errors.password.message}</Error>}
      <PrimaryButton style={{ marginTop: 20 }}>Log in</PrimaryButton>
      <OrSeperator> - or - </OrSeperator>
      <a href="/auth/facebook" style={{ marginBottom: 20 }}>
        <FacebookButton />
      </a>

      <a href="/auth/google">
        <GoogleButton />
      </a>

      <SignupWrapper>
        Don't have an account ?<Link to="/signup"> Sign up</Link>
      </SignupWrapper>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const OrSeperator = styled.div`
  color: #e9e5e5;
  padding: 15px 0;
  text-align: center;
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 40px;
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

const Error = styled.div`
  padding-top: 10px;
  font-size: 16px;
  text-align: left;
  color: #d1403d;
`;

const SignupWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #e9e5e5;
`;

const Label = styled.label`
  color: #9d8b8b;
  font-size: 14px;
  margin-bottom: 5px;
`;
