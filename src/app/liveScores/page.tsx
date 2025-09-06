"use client";
import React from "react";
import LiveHubRoutings from "@/src/components/ui/LiveHubRoutings";
import MatchCard from "@/src/components/ui/todaysMatchCard";
import { useGetLiveScoresQuery } from "../../lib/api/liveScoreApi";

const LiveScores = () => {
  const { data, error, isLoading } = useGetLiveScoresQuery(
    { league: "ETH" },
    { pollingInterval: 15000, refetchOnMountOrArgChange: true }
  );

  if (isLoading)
    return <p className="text-center mt-6">Loading live scores...</p>;
  if (error)
    return (
      <p className="text-center mt-6 text-red-500">
        Failed to load live scores
      </p>
    );
  if (!data?.result || data.result.length === 0)
    return <p className="text-center mt-6">No live matches at the moment</p>;

  const matches = data.result.map((match) => ({
    league: match.league,
    homeTeam: match.home_team.name,
    awayTeam: match.away_team.name,
    homeLogo: match.home_team.logo, // ✅ pass home logo
    awayLogo: match.away_team.logo, // ✅ pass away logo
    score: `${match.goals.home}-${match.goals.away}`,
    isLive: match.status.short === "1H" || match.status.short === "2H",
  }));

  return (
    <div className="m-5 flex flex-col items-center">
      <LiveHubRoutings currentPath="/liveScores" />

      <div className="flex justify-between items-center mt-6 mb-4 w-full max-w-[700px] px-2">
        <h1 className="text-xl ">Today's Matches</h1>
        <div className="bg-red-500 text-white px-2 rounded text-center text-sm">
          Live
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-[700px]">
        {matches.map((match, index) => (
          <MatchCard
            key={index}
            league={match.league}
            homeTeam={match.homeTeam}
            awayTeam={match.awayTeam}
            homeLogo={match.homeLogo}
            awayLogo={match.awayLogo}
            score={match.score}
            isLive={match.isLive}
          />
        ))}
      </div>
    </div>
  );
};

export default LiveScores;
