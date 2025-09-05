import { createApi } from "@reduxjs/toolkit/query/react";
import { apiClient } from '../apiClient';
import type { TeamComparison, CompareParams } from '../../types/compare';

/**
 * RTK Query API for team comparison functionality
 * Currently uses mock data, easily replaceable with real API endpoint
 */
export const compareApi = createApi({
  reducerPath: "compareApi",
  baseQuery: apiClient,
  tagTypes: ["Compare"],
  endpoints: (builder) => ({
    getComparison: builder.query<TeamComparison, CompareParams>({
      query: ({ teamA, teamB }) => {
        // For now, return the mock data endpoint
        // To switch to real API, change this to:
        // return `/compare/${teamA}-vs-${teamB}`;
        return '/compare';
      },
      providesTags: ["Compare"],
    }),
  }),
});

export const { useGetComparisonQuery } = compareApi;
