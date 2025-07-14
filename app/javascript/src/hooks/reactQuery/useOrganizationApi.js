import organizationsApi from "apis/organizations";
import { useQuery } from "react-query";

export const useFetchOrganizations = () =>
  useQuery({
    queryKey: ["organizations"],
    queryFn: () => organizationsApi.fetch(),
  });
