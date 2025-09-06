import { createApi } from "@reduxjs/toolkit/query/react";
import { apiClient } from "../apiClient";

type Standing = {
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

type LeagueResponse = {
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
  baseQuery: apiClient,
  tagTypes: ["Table"],
  endpoints: (builder) => ({
    getTable: builder.query<LeagueResponse, { league?: string; season?: string } | void>({
      query: (params) => {
        if (!process.env.NEXT_PUBLIC_API_URL) {
          return "/table";
        }

        const searchParams = new URLSearchParams();
        if (params?.league) searchParams.append("league", params.league);
        if (params?.season) searchParams.append("season", params.season);

        return `/standings?${searchParams.toString()}`;
      },
      providesTags: ["Table"],
    }),
  }),
});

export const { useGetTableQuery } = tableApi;
