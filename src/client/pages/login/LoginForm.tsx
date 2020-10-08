import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { emailRegex } from "@client/helpers";

import { UserType } from "@src/types/User.type";
import { FacebookButton, GoogleButton } from "@client/components/SocialButtons";
import { PrimaryButton } from "@client/components/Buttons";
import TextInput from "@client/components/TextInput";
import { login } from "@client/api/auth";
import ErrorLabel from "@client/components/ErrorLabel";

type FormData = Pick<UserType, "email" | "password">;

export default function LoginForm() {
  const { register, handleSubmit, errors, setError } = useForm<FormData>();

  async function onSubmit({ email, password }: FormData) {
    const status = await login(email, password);

    console.log(status);

    if (status === 200) {
      location.href = "/";
    }
    else if (status === 401){
      setError("password", {
        type: "validate",
        message: "Incorrect email or password",
      });
    }
    else {
      setError("password", {
        type: "validate",
        message: "An Unexpected error occured, please try again later",
      });
    }
  }

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
      {errors.email && <ErrorLabel>{errors.email.message}</ErrorLabel>}
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
      {errors.password && <ErrorLabel>{errors.password.message}</ErrorLabel>}
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
