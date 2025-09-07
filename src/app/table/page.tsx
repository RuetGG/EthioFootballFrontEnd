'use client';

import React from "react";
import LiveHubRoutings from "@/src/components/ui/LiveHubRoutings";
import TableCard from "@/src/components/ui/tableCard";
import { useGetTableQuery } from "@/src/lib/api/tableApi";

const Table = () => {
  const { data: leagueTable, isLoading, error } = useGetTableQuery({ league: 'ETH', season: '2022'}); 
  if (isLoading) return <p className="text-center mt-6">Loading tables...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">Failed to load tables</p>;

  if (!leagueTable || leagueTable.standings.length === 0) {
    return (
      <div>
        <LiveHubRoutings currentPath="/table" />
        <p className="text-center mt-6 text-gray-700">No standings available.</p>
      </div>
    );
  }
console.log(leagueTable.country)
  return (
    <div className="m-5 flex flex-col items-center">
      <LiveHubRoutings currentPath="/table" />

      <div className="flex flex-col border rounded-xl shadow-lg border-gray-200 max-w-[900px] w-full my-5 p-5 bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {leagueTable.leagueName} ({leagueTable.season})
        </h2>

        <div className="flex justify-between items-center bg-gray-200 rounded-md px-2 py-3 font-semibold text-sm text-gray-700">
          <span className="w-6 text-center">Pos</span>
          <span className="flex-1">Team</span>
          <span className="w-10 text-center">Pts</span>
          <span className="w-10 text-center">MP</span>
          <span className="w-10 text-center">W</span>
          <span className="w-10 text-center">L</span>
          <span className="w-10 text-center">D</span>
          <span className="w-10 text-center">GD</span>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          {leagueTable.standings.map((standing, index) => (
            <TableCard
              key={index}
              rank={standing.rank}
              teamName={standing.teamName}
              teamLogo={standing.teamLogo}
              points={standing.points}
              matchesPlayed={standing.matchesPlayed}
              wins={standing.wins}
              losses={standing.losses}
              draws={standing.draws}
              goalsDiff={standing.goalsDiff}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;