import { createApi } from "@reduxjs/toolkit/query/react";
import { apiClient } from "../apiClient";

import fixturesJSON from "@/public/mock/fixtures.json";

export type Fixture = {
  id: string;
  home_team: string;
  away_team: string;
  league: string;
  kickoff: string;
  status: string;
  home_logo?: string;
  away_logo?: string;
};

export type FixtureResponse = {
  fixtures: Fixture[];
  freshness: {
    source: string;
    retrieved: string;
  };
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
      query: (params) => {
        if (!process.env.NEXT_PUBLIC_API_URL) return "/fixtures";
        const searchParams = new URLSearchParams();
        if (params?.league) searchParams.append("league", params.league);
        if (params?.team) searchParams.append("team", params.team);
        if (params?.from) searchParams.append("from", params.from);
        if (params?.to) searchParams.append("to", params.to);

        return `/fixtures?${searchParams.toString()}`;
      },
      transformResponse: (response: any) => {
        if (!process.env.NEXT_PUBLIC_API_URL) {
          return {
            fixtures: fixturesJSON.map((f) => ({
              id: f.id,
              home_team: f.home_team,
              away_team: f.away_team,
              league: f.league,
              kickoff: f.date_utc,
              status: f.status,
              home_logo: f.home_logo,
              away_logo: f.away_logo,
            })),
            freshness: {
              source: "Mock Data",
              retrieved: new Date().toISOString(),
            },
          };
        }
        return response;
      },
    }),
  }),
});

export const { useGetFixturesQuery } = fixtureApi;