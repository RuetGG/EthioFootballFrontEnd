import { createApi } from "@reduxjs/toolkit/query/react";
import { apiClient } from "../apiClient";

export type Fixture = {
  id: string;
  home_team: string;
  away_team: string;
  league: string;
  kickoff: string;
  status: string;
};

export type FixtureResponse = {
  fixtures: Fixture[];
};

export const fixtureApi = createApi({
  reducerPath: "fixtureApi",
  baseQuery: apiClient,
  tagTypes: ["Fixtures"],
  endpoints: (builder) => ({
    getFixtures: builder.query<
      FixtureResponse,
      { league?: string; team?: string; from?: string; to?: string } | void
    >({
      query: (
        params: {
          league?: string;
          team?: string;
          from?: string;
          to?: string;
        } = {}
      ) => {
        const leagueParam = params.league || "ETH"; 
        const searchParams = new URLSearchParams();
        searchParams.append("league", leagueParam);
        if (params.team) searchParams.append("team", params.team);
        if (params.from) searchParams.append("from", params.from);
        if (params.to) searchParams.append("to", params.to);

        return `/fixtures?${searchParams.toString()}`;
      },
      transformResponse: (response: any) => {
        return {
          fixtures: Array.isArray(response.fixtures) ? response.fixtures : [],
        };
      },
    }),
  }),
});

export const { useGetFixturesQuery } = fixtureApi;
