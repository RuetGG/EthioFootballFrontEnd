import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiClient } from "../apiClient";

export type Standing = {
  rank: number;
  teamName: string;
  teamLogo: string;
  points: number;
  matchesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  goalsDiff: number;
};

export type LeagueResponse = {
  leagueId: number;
  leagueName: string;
  country: string;
  countryFlag: string;
  season: number;
  standings: Standing[];
  lastUpdated: string;
};

export const tableApi = createApi({
  reducerPath: "tableApi",
  baseQuery: createApiClient({ mockFile: "table" }),
  tagTypes: ["Table"],
  endpoints: (builder) => ({
    getTable: builder.query<LeagueResponse, { league?: string; season?: string } | void>({
      query: (params = {}) => {
        const league = params?.league || "ETH";
        const season = params?.season || "2022";
        return `/api/standings?league=${league}&season=${season}`;
      },
    }),
  }),
});

export const { useGetTableQuery } = tableApi;