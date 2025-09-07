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

type ApiClientOptions = {
  mockFile?: string; // e.g., "fixtures" -> loads /mock/fixtures.json
};

export const createApiClient = (options: ApiClientOptions = {}) => {
  const { mockFile } = options;
  const hasRealApi = Boolean(process.env.NEXT_PUBLIC_API_URL);

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "", // real API base
  });

  return async (args: any, api: any, extraOptions: any) => {
    if (!hasRealApi && mockFile) {
      try {
        const res = await fetch(`/mock/${mockFile}.json`);
        if (!res.ok) throw new Error(`Failed to load mock file: ${mockFile}.json`);
        const data = await res.json();
        return { data };
      } catch (error) {
        return { error };
      }
    }

    return rawBaseQuery(args, api, extraOptions);
  };
};
