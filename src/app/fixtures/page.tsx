'use client';
import React from 'react';
import LiveHubRoutings from '@/src/components/ui/LiveHubRoutings';
import MatchCard from '@/src/components/ui/upcomingMatchCard';
import { useGetFixturesQuery } from '../../lib/api/fixtureApi';
import type { Fixture } from '../../lib/api/fixtureApi';

const Fixture = () => {
  const { data: upcomingMatches, isLoading, error } = useGetFixturesQuery({ league: 'ETH' });

  if (isLoading) return <p className="text-center mt-6">Loading fixtures...</p>;

  if (!upcomingMatches || upcomingMatches.fixtures.length === 0) {
    return <p className="text-center mt-6 text-gray-700">No upcoming fixtures found.</p>;
  }

  if (error) return <p className="text-center mt-6 text-red-500">Failed to load fixtures</p>;

  return (
    <div className="m-5 flex flex-col items-center">
      <LiveHubRoutings currentPath="/fixtures" />

      <div className="flex justify-between items-center mt-6 mb-4 w-full max-w-[700px] px-2">
        <h1 className="text-xl font-semibold">Upcoming Fixtures</h1>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-[700px]">
        {upcomingMatches.fixtures.map((match: Fixture, index: number) => (
          <MatchCard
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
};

export default Fixture;
