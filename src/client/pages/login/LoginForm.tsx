import React from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { emailRegex } from "@client/helpers";

import { UserType } from "@defs/User.type";
import { FacebookButton, GoogleButton } from "@client/components/SocialButtons";
import { PrimaryButton } from "@client/components/Buttons";
import { TextInput } from "@client/components/TextInput";
import { login } from "@client/api/auth";
import ErrorLabel from "@client/components/ErrorLabel";
import ClipLoader from "react-spinners/ClipLoader";
import FormLabel from "@client/components/FormLabel";

type FormData = Pick<UserType, "email" | "password">;

export default function LoginForm() {
  const { register, handleSubmit, errors, setError, formState } = useForm<
    FormData
  >();

  async function onSubmit({ email, password }: FormData) {
    const status = await login(email, password);

    if (status === 200) {
      location.href = location.href;
    } else if (status === 401) {
      setError("password", {
        type: "validate",
        message: "Incorrect email or password",
      });
    } else {
      setError("password", {
        type: "validate",
        message: "An Unexpected error occured, please try again later",
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <a href="/auth/facebook" style={{ marginBottom: 20 }}>
        <FacebookButton />
      </a>

      <a href="/auth/google">
        <GoogleButton />
      </a>

      <OrSeperator> - or - </OrSeperator>

      <FormLabel htmlFor="email">Email</FormLabel>
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
      <FormLabel htmlFor="password">Password</FormLabel>
      <TextInput
        name="password"
        type="password"
        ref={register({
          required: "Please enter your password",
        })}
      ></TextInput>
      {errors.password && <ErrorLabel>{errors.password.message}</ErrorLabel>}
      <PrimaryButton style={{ marginTop: 20 }}>
        Log in{" "}
        <ClipLoader size={10} color={"#fff"} loading={formState.isSubmitting} />
      </PrimaryButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const OrSeperator = styled.div`
  color: #e9e5e5;
  padding-top: 20px;
  text-align: center;
`;
