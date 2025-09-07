import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

const backendBaseQuery = fetchBaseQuery({
  baseUrl: 'https://g6-ethio-football.onrender.com',
});

export const apiClient: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  return backendBaseQuery(args, api, extraOptions);
};
