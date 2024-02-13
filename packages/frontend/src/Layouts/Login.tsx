import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useAppContext } from "../lib/contextLib";
import LoaderButton from "../Components/LoaderButton";
import { onError } from "../lib/errorLib";
import { useFormFields } from "../lib/hookLib";

export default function Login() {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { userHasAuthenticated } = useAppContext();

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div>
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
          <LoaderButton
            type="submit"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Login
          </LoaderButton>
        </form>
      </div>
    </div>
  );
}
