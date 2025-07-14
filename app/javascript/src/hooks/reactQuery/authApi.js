import { useMutation } from "react-query";

import authApi from "../../apis/auth";

export const useLogin = () =>
  useMutation({
    mutationFn: payload => authApi.login(payload),
  });

export const useLogout = () =>
  useMutation({
    mutationFn: () => authApi.logout(),
  });

export const useSignup = () =>
  useMutation({
    mutationFn: payload => authApi.signup(payload),
  });
