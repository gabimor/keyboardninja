import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import Input from "@client/components/TextInput";
import { PrimaryButton } from "@client/components/Buttons";
import { useForm } from "react-hook-form";
import { emailRegex } from "@client/helpers";
import { FacebookButton, GoogleButton } from "@client/components/SocialButtons";
import { signup } from "@client/api/auth";
import { UserType } from "@src/types/User.type";
import ErrorLabel from "@client/components/ErrorLabel";

type FormData = Pick<UserType, "email" | "password">;

export default function SignupForm() {
  const { register, handleSubmit, errors, setError } = useForm<FormData>();

  async function onSubmit({ email, password }: FormData) {
    const message = await signup(email, password);

    if (!message) {
      location.href = "/";
    } else {
      setError("email", { type: "validate", message });
    }
  }

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
      {errors.email && <ErrorLabel>{errors.email.message}</ErrorLabel>}
      <LabelWrapper>
        <Label>Password</Label>
      </LabelWrapper>
      <Input
        name="password"
        type="password"
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
      <PrimaryButton style={{ marginTop: 20 }}>Sign up</PrimaryButton>
      <OrSeperator> - or - </OrSeperator>
      <a href="/auth/facebook" style={{ marginBottom: 20 }}>
        <FacebookButton />
      </a>

      <a href="/auth/google">
        <GoogleButton />
      </a>

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
