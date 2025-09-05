import { createApi } from "@reduxjs/toolkit/query/react";
import { apiClient } from "../apiClient";

type Standing = {
  position: number;
  team: string;
  points: number;
  match_played: number;
  wins: number;
  lose: number;
  draw: number;
  GD: number;
};

type LeagueType = {
  league: string;
  standings: Standing[];
  freshness: {
    source: string;
    retrieved: string;
  };
};

type StandingResponse = {
  leagues: LeagueType[];
};

export const tableApi = createApi({
  reducerPath: "tableApi",
  baseQuery: apiClient,
  tagTypes: ["Table"],
  endpoints: (builder) => ({
    getTable: builder.query<StandingResponse, void>({
      query: () => "/table",
    }),
  }),
});

export const { useGetTableQuery } = tableApi;
