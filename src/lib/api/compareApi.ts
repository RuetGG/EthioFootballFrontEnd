import { createApi } from "@reduxjs/toolkit/query/react";
import { apiClient } from "../apiClient";
import type { TeamComparison, CompareParams } from "../../types/compare";
import mockComparison from "@/public/mock/compare.json"; // your mock JSON

export const compareApi = createApi({
  reducerPath: "compareApi",
  baseQuery: apiClient,
  tagTypes: ["Compare"],
  endpoints: (builder) => ({
    getComparison: builder.query<TeamComparison, CompareParams>({
      query: ({ teamA, teamB }) => {
        if (!process.env.NEXT_PUBLIC_API_URL) {
          return "/compare"; 
        }

        return {
          url: "/intent/parser",
          method: "POST",
          body: { userPrompt: `compare ${teamA} ${teamB}` },
        };
      },
      transformResponse: (
        response: any,
        meta: any,
        arg: CompareParams // type it here
      ) => {
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