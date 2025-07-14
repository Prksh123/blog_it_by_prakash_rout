import React, { useState } from "react";

import SignupForm from "components/Authentication/Form/Signup";

import { useSignup } from "../../hooks/reactQuery/authApi";
import { useFetchOrganizations } from "../../hooks/reactQuery/useOrganizationApi";

const Signup = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const { data } = useFetchOrganizations();
  const organizations = data?.organizations || [];
  const { mutate: signUp, isLoading } = useSignup();

  const handleSubmit = event => {
    event.preventDefault();

    signUp(
      {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        organization_id: selectedOrganization.value,
      },
      {
        onSuccess: () => {
          history.push("/");
        },
        onError: error => {
          logger.error(error);
        },
      }
    );
  };

  return (
    <SignupForm
      handleSubmit={handleSubmit}
      loading={isLoading}
      organizations={organizations}
      selectedOrganization={selectedOrganization}
      setEmail={setEmail}
      setName={setName}
      setPassword={setPassword}
      setPasswordConfirmation={setPasswordConfirmation}
      setSelectedOrganization={setSelectedOrganization}
    />
  );
};

export default Signup;
