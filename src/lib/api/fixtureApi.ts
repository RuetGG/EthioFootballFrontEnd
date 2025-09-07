import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiClient } from "../apiClient";

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

export type FixtureQueryParams = {
  league?: string;
  team?: string;
  from?: string;
  to?: string;
};
export type PreviousFixture = {
  fixture_id: number;
  date: string;
  venue: string;
  league: string;
  round: string;
  home_team: {
    name: string;
    logo: string;
  };
  away_team: {
    name: string;
    logo: string;
  };
  goals: {
    home: number;
    away: number;
  };
  score: {
    halftime: { home: number | null; away: number | null };
    fulltime: { home: number | null; away: number | null };
    extratime: { home: number | null; away: number | null };
    penalty: { home: number | null; away: number | null };
  };
  status: {
    long: string;
    short: string;
    elapsed: number;
    extra: number;
  };
};

export type PreviousFixtureResponse = {
  result: PreviousFixture[];
  source: string;
};


export type PreviousFixtureQueryParams = {
  league?: string;
  round?: number
  season?: number
}

const apiClient = createApiClient({ mockFile: "fixtures" });

export const fixtureApi = createApi({
  reducerPath: "fixtureApi",
  baseQuery: apiClient,
  tagTypes: ["Fixtures"],
  endpoints: (builder) => ({
    getFixtures: builder.query<FixtureResponse, FixtureQueryParams>({
      query: (params = {}) => {
        const leagueParam = params.league || "ETH";
        const searchParams = new URLSearchParams();
        searchParams.append("league", leagueParam);
        if (params.team) searchParams.append("team", params.team);
        if (params.from) searchParams.append("from", params.from);
        if (params.to) searchParams.append("to", params.to);

        return `/fixtures?${searchParams.toString()}`;
      },
      transformResponse: (response: any) => ({
        fixtures: Array.isArray(response.fixtures) ? response.fixtures : [],
      }),
    }),
    getPreviousFixtures: builder.query<PreviousFixtureResponse, PreviousFixtureQueryParams>({
      query: (params = {}) => {
       const league = params?.league || "ETH";
        const round = params?.round || "1";
        const season = params?.season || "2022";
        return `/api/previous-fixtures?league=${league}&round=${round}&season=${season}`;
      
      },
    })
  }),
});

export const { useGetFixturesQuery, useGetPreviousFixturesQuery } = fixtureApi;