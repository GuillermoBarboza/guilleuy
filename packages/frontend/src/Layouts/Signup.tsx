import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { onError } from "../lib/errorLib";
import { useFormFields } from "../lib/hookLib";
import { useAppContext } from "../lib/contextLib";
import { ISignUpResult } from "amazon-cognito-identity-js";
import LoaderButton from '../Components/LoaderButton'
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { userHasAuthenticated } = useAppContext();
  const [newUser, setNewUser] = useState<null | ISignUpResult>(null);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
      if (e instanceof Error && 'code' in e) {
        if (e.code === 'UsernameExistsException') {
          //Username already taken
          onError(e);
        } else if (e.code === "") {   //password too weak
          // show the error

          onError(e);
        }
      } else {
        onError(e);
      }
    }
  }

  async function handleConfirmationSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <div>
          <label htmlFor="confirmationCode">Confirmation Code</label>
          <input
            autoFocus
            type="tel"
            id="confirmationCode"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <small>Please check your email for the code.</small>
        </div>
        <LoaderButton
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </form>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            autoFocus
            type="email"
            id="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </div>
        <button type="submit" disabled={!validateForm()}>
          Signup
        </button>
      </form>
    );
  }

  return !isLoading ? (
    <div>
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  ) : "Loading...";
}
