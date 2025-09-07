// // src/lib/api/liveScoreApi.ts
// import { createApi } from "@reduxjs/toolkit/query/react";
// import { createApiClient } from "../apiClient";

// export type TeamInfo = { name: string; logo: string };

// export type LiveScoreFixture = {
//   fixture_id: number;
//   date: string;
//   venue: string;
//   league: string;
//   round: string;
//   home_team: TeamInfo;
//   away_team: TeamInfo;
//   goals: { home: number; away: number };
//   score: any;
//   status: { long: string; short: string; Elapsed: number; extra: number };
// };

// export type LiveScoreResponse = { result: LiveScoreFixture[] };

// export const liveScoreApi = createApi({
//   reducerPath: "liveScoreApi",
//   baseQuery: createApiClient({ mockFile: "livescore" }),
//   tagTypes: ["LiveScores"],
//   endpoints: (builder) => ({
//     getLiveScores: builder.query<LiveScoreResponse, { league?: string } | void>({
//       query: (params) => `/live${params?.league ? `?league=${params.league}` : ""}`,
//       transformResponse: (response: any) => ({
//         result: Array.isArray(response?.result) ? response.result : [],
//       }),
//     }),
//   }),
// });

// export const { useGetLiveScoresQuery } = liveScoreApi;