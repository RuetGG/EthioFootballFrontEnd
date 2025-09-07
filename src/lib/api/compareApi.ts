// src/lib/api/compareApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiClient } from "../apiClient"; // <-- use createApiClient
import type { TeamComparison, CompareParams } from "../../types/compare";
import mockComparison from "@/public/mock/compare.json";

const baseQuery = createApiClient({ mockFile: "compare" });

export const compareApi = createApi({
  reducerPath: "compareApi",
  baseQuery, 
  tagTypes: ["Compare"],
  endpoints: (builder) => ({
    getComparison: builder.query<TeamComparison, CompareParams>({
      query: (params: CompareParams) => {
        const { teamA, teamB } = params;

        if (!process.env.NEXT_PUBLIC_API_URL) {
          return "/compare"; // placeholder for mock
        }

        return {
          url: "/intent/parse",
          method: "POST",
          body: { text: `compare ${teamA} ${teamB}` },
        };
      },
      transformResponse: (response: any, meta, arg: CompareParams) => {
        if (!process.env.NEXT_PUBLIC_API_URL) {
          return {
            ...mockComparison,
            comparison_data: {
              team_a: { ...mockComparison.comparison_data.team_a, name: arg.teamA },
              team_b: { ...mockComparison.comparison_data.team_b, name: arg.teamB },
            },
          };
        }
        return response;
      },
      providesTags: ["Compare"],
    }),
  }),
});

export const { useGetComparisonQuery } = compareApi;