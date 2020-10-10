import React, { useState } from "react";
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
import ClipLoader from "react-spinners/ClipLoader";
import FormLabel from "@client/components/FormLabel";

export type SignUpFormData = Pick<
  UserType,
  "firstName" | "lastName" | "email" | "password"
>;

export default function SignupForm() {
  const { register, handleSubmit, errors, setError, formState } = useForm<
    SignUpFormData
  >();
  const [isEmailSignupVisible, setIsEmailSignupVisible] = useState(false);

  async function onSubmit(signUpForm: SignUpFormData) {
    const message = await signup(signUpForm);

    if (!message) {
      location.href = location.href;
    } else {
      setError("email", { type: "validate", message });
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

      {isEmailSignupVisible ? (
        <>
          <NameContainer>
            <div style={{ marginRight: 5 }}>
              <FormLabel htmlFor="firstName">First name</FormLabel>
              <Input
                name="firstName"
                autoFocus
                ref={register({
                  required: "Please enter your first name",
                })}
              ></Input>
            </div>
            <div style={{ marginLeft: 5 }}>
              <FormLabel htmlFor="lastName">Last name</FormLabel>
              <Input
                name="lastName"
                ref={register({
                  required: "Please enter your last name",
                })}
              ></Input>
            </div>
          </NameContainer>
          {errors.firstName && (
            <ErrorLabel>{errors.firstName.message}</ErrorLabel>
          )}
          {errors.lastName && (
            <ErrorLabel>{errors.lastName.message}</ErrorLabel>
          )}
          <FormLabel htmlFor="email">Email</FormLabel>
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
          <FormLabel htmlFor="password">Password</FormLabel>
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
          {errors.password && (
            <ErrorLabel>{errors.password.message}</ErrorLabel>
          )}
          <PrimaryButton style={{ marginTop: 20 }}>
            Sign up{" "}
            <ClipLoader
              size={10}
              color={"#fff"}
              loading={formState.isSubmitted || formState.isSubmitting}
            />
          </PrimaryButton>
        </>
      ) : (
        <PrimaryButton onClick={() => setIsEmailSignupVisible(true)}>
          Sign up with email
        </PrimaryButton>
      )}

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

const NameContainer = styled.div`
  display: flex;
`;

const OrSeperator = styled.div`
  color: #e9e5e5;
  padding: 15px 0;
  text-align: center;
`;

const SignupWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #e9e5e5;
`;
