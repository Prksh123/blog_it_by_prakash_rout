import React, { useState } from "react";

import { setAuthHeaders } from "apis/axios";
import LoginForm from "components/Authentication/Form/Login";
import { setToLocalStorage } from "utils/storage";

import { useLogin } from "../../hooks/reactQuery/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isLoading } = useLogin();

  const handleSubmit = event => {
    event.preventDefault();

    login(
      { email, password },
      {
        onSuccess: response => {
          setToLocalStorage({
            authToken: response.authentication_token,
            email: email.toLowerCase(),
            userId: response.id,
            userName: response.name,
          });
          setAuthHeaders();
          window.location.href = "/";
        },
        onError: error => {
          logger.error(error);
        },
      }
    );
  };

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      loading={isLoading}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
};

export default Login;
