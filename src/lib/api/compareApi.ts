import { createApi } from "@reduxjs/toolkit/query/react";
import { apiClient } from '../apiClient';
import type { ComparisonResponse, CompareParams, TeamComparison } from '../../types/compare';

export const compareApi = createApi({
  reducerPath: "compareApi",
  baseQuery: apiClient,
  tagTypes: ["Compare"],
  endpoints: (builder) => ({
    getComparison: builder.query<TeamComparison, CompareParams>({
      query: ({ teamA, teamB, league = 'ETH' }) => ({
        url: '/compare/teams',
        method: 'POST',
        params: { teamA, teamB, league }
      }),
      transformResponse: (response: ComparisonResponse): TeamComparison => {
        return {
          comparison_data: {
            team_a: response.comparison_data.team_a,
            team_b: response.comparison_data.team_b,
          },
          source: "API",
          freshness: new Date().toISOString()
        };
      },
      providesTags: ["Compare"],
    }),
  }),
});

export const { useGetComparisonQuery } = compareApi;