import { createApi } from "@reduxjs/toolkit/query/react";
import { apiClient } from "../apiClient";
import liveScoresJSON from "@/public/mock/livescore.json";

export type TeamInfo = { name: string; logo: string };

export type LiveScoreFixture = {
  fixture_id: number;
  date: string;
  venue: string;
  league: string;
  round: string;
  home_team: TeamInfo;
  away_team: TeamInfo;
  goals: { home: number; away: number };
  score: any;
  status: { long: string; short: string; Elapsed: number; extra: number };
};

export type LiveScoreResponse = { result: LiveScoreFixture[] };

export const liveScoreApi = createApi({
  reducerPath: "liveScoreApi",
  baseQuery: apiClient,
  tagTypes: ["LiveScores"],
  endpoints: (builder) => ({
    getLiveScores: builder.query<LiveScoreResponse, { league?: string } | void>(
      {
        query: (params) => {
          if (!process.env.NEXT_PUBLIC_API_URL) return "/livescore";
          const url = `/live${
            params?.league ? `?league=${params.league}` : ""
          }`;
          return url;
        },
        transformResponse: (response: any) => {
          if (!process.env.NEXT_PUBLIC_API_URL) {
            return {
              result: liveScoresJSON.result?.length
                ? liveScoresJSON.result
                : null,
            };
          }
          return { result: response.result ?? null };
        },
      }
    ),
  }),
});

export const { useGetLiveScoresQuery } = liveScoreApi;
