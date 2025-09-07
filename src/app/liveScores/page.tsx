"use client";
import React from "react";
import LiveHubRoutings from "@/src/components/ui/LiveHubRoutings";
import MatchCard from "@/src/components/ui/todaysMatchCard";
import { useGetPreviousFixturesQuery } from "../../lib/api/fixtureApi";

const LiveScores = () => {
  const {
    data: previousData,
    error: prevError,
    isLoading: prevLoading,
  } = useGetPreviousFixturesQuery({
    league: "ETH",
    round: 1,
    season: 2022,
  });

  console.log("previousData:", previousData);
  console.log("prevLoading:", prevLoading);
  console.log("prevError:", prevError);
  if (prevLoading)
    return <p className="text-center mt-6">Loading previous fixtures...</p>;
  if (prevError)
    return (
      <p className="text-center mt-6 text-red-500">
        Failed to load previous fixtures
      </p>
    );

  const matches =
    previousData?.result?.map((match) => {
      console.log(match.home_team.name, match.league);
      return {
        league: match.league,
        homeTeam: match.home_team.name,
        awayTeam: match.away_team.name,
        homeLogo: match.home_team.logo,
        awayLogo: match.away_team.logo,
        score: `${match.goals.home}-${match.goals.away}`,
        isLive: false,
      };
    }) || [];

  return (
    <div className="m-5 flex flex-col items-center">
      <LiveHubRoutings currentPath="/liveScores" />
      <h1 className="text-xl mt-6 mb-4">Previous Matches</h1>
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
