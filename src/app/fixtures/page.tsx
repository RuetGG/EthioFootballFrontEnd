'use client';
import React from 'react';
import LiveHubRoutings from '@/src/components/ui/LiveHubRoutings';
import UpcomingMatchCard from '@/src/components/ui/upcomingMatchCard';
import MatchCard from '@/src/components/ui/todaysMatchCard';
import { useGetFixturesQuery, useGetPreviousFixturesQuery } from '../../lib/api/fixtureApi';
import type { Fixture, PreviousFixture } from '../../lib/api/fixtureApi';

const FixturePage = () => {
  const { data: upcomingMatches, isLoading: upcomingLoading, error: upcomingError } = useGetFixturesQuery({ league: 'ETH' });

  const { data: previousData, isLoading: previousLoading, error: previousError } = useGetPreviousFixturesQuery({
    league: 'ETH',
    round: 1,
    season: 2022,
  });

  if (upcomingLoading || previousLoading) return <p className="text-center mt-6">Loading fixtures...</p>;

  // If upcoming matches exist, show them
  if (upcomingMatches && upcomingMatches.fixtures.length > 0) {
    return (
      <div className="m-5 flex flex-col items-center">
        <LiveHubRoutings currentPath="/fixtures" />
        <h1 className="text-xl mt-6 mb-4">Upcoming Fixtures</h1>
        <div className="flex flex-col gap-3 w-full max-w-[700px]">
          {upcomingMatches.fixtures.map((match: Fixture, index: number) => (
            <UpcomingMatchCard
              key={index}
              league={match.league}
              homeTeam={match.home_team}
              awayTeam={match.away_team}
              kickoff={match.kickoff}
            />
          ))}
        </div>
      </div>
    );
  }

  if (previousData && previousData.result.length > 0) {
    const matches = previousData.result.map((match: PreviousFixture) => ({
      league: match.league,
      homeTeam: match.home_team.name,
      awayTeam: match.away_team.name,
      homeLogo: match.home_team.logo,
      awayLogo: match.away_team.logo,
      score: `${match.goals.home}-${match.goals.away}`,
      isLive: false,
    }));

    return (
      <div className="m-5 flex flex-col items-center">
        <LiveHubRoutings currentPath="/fixtures" />
        <h1 className="text-xl mt-6 mb-4">Previous Matches</h1>
        <div className="flex flex-col gap-3 w-full max-w-[700px]">
          {matches.map((match, index) => (
            <UpcomingMatchCard
              key={index}
              league={match.league}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              homeLogo={match.homeLogo}
              awayLogo={match.awayLogo}
            />
          ))}
        </div>
      </div>
    );
  }

  return <p className="text-center mt-6 text-gray-700">No fixtures available.</p>;
};

export default FixturePage;