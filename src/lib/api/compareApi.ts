import { createApi } from "@reduxjs/toolkit/query/react";
import { apiClient } from '../apiClient';
import type { ComparisonResponse, CompareParams, TeamComparison } from '../../types/compare';

export const compareApi = createApi({
  reducerPath: "compareApi",
  baseQuery: apiClient,
  tagTypes: ["Compare"],
  endpoints: (builder) => ({
    getComparison: builder.query<TeamComparison, CompareParams>({
      query: ({ teamA, teamB, league = 'ETH' }) => {
        const searchParams = new URLSearchParams();
        searchParams.append('teamA', teamA);
        searchParams.append('teamB', teamB);
        searchParams.append('league', league);
        
        return `/compare/teams?${searchParams.toString()}`;
      },
      transformResponse: (response: ComparisonResponse): TeamComparison => {
        // Ensure arrays exist and have proper structure
        const teamA = {
          ...response.comparison_data.team_a,
          honors: response.comparison_data.team_a.honors || [],
          recent_form: response.comparison_data.team_a.recent_form || [],
          notable_players: response.comparison_data.team_a.notable_players || [],
          fanbase_notes: response.comparison_data.team_a.fanbase_notes || "No information available"
        };
        
        const teamB = {
          ...response.comparison_data.team_b,
          honors: response.comparison_data.team_b.honors || [],
          recent_form: response.comparison_data.team_b.recent_form || [],
          notable_players: response.comparison_data.team_b.notable_players || [],
          fanbase_notes: response.comparison_data.team_b.fanbase_notes || "No information available"
        };

        return {
          comparison_data: {
            team_a: teamA,
            team_b: teamB,
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