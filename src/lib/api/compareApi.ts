import { createApi } from "@reduxjs/toolkit/query/react";
import { apiClient } from '../apiClient';
import type { ComparisonResponse, CompareParams, TeamComparison, TeamData, FormResult } from '../../types/compare';

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
        const enhanceTeamData = (teamStats: any): TeamData => ({
          ...teamStats,
          honors: generateMockHonors(teamStats.name),
          recent_form: generateMockForm(),
          notable_players: generateMockPlayers(teamStats.name),
          fanbase_notes: generateMockFanbaseNotes(teamStats.name),
        });

        return {
          comparison_data: {
            team_a: enhanceTeamData(response.comparison_data.team_a),
            team_b: enhanceTeamData(response.comparison_data.team_b),
          },
          source: "API",
          freshness: new Date().toISOString()
        };
      },
      providesTags: ["Compare"],
    }),
  }),
});

function generateMockHonors(teamName: string): string[] {
  const commonHonors = [
    "Ethiopian Premier League Champion",
    "Ethiopian Cup Winner",
    "CAF Champions League Participant",
  ];
  return commonHonors.slice(0, Math.floor(Math.random() * 3) + 1);
}

function generateMockForm(): FormResult[] {
  const results: FormResult[] = ["W", "D", "L"];
  return Array.from(
    { length: 5 },
    () => results[Math.floor(Math.random() * results.length)]
  );
}

function generateMockPlayers(teamName: string): string[] {
  const players = [
    "Abebaw Butako",
    "Dawit Fikadu",
    "Mujib Kassim",
    "Henok Goitom",
    "Saladin Said",
    "Fitsum Tilahun",
  ];
  return players.slice(0, Math.floor(Math.random() * 4) + 2);
}

function generateMockFanbaseNotes(teamName: string): string {
  return `${teamName} has a passionate fanbase known for their unwavering support throughout the season. The team enjoys strong community backing and has a rich history in Ethiopian football.`;
}

export const { useGetComparisonQuery } = compareApi;