"use client";

import LiveHubRoutings from "@/src/components/ui/LiveHubRoutings";
import { useGetTableQuery } from "@/src/lib/api/tableApi";
import React from "react";
import TableCard from "@/src/components/ui/tableCard";

const Table = () => {
  const { data: leagueTable, error, isLoading } = useGetTableQuery();

  if (isLoading) return <p className="text-center mt-6">Loading tables...</p>;
  if (error)
    return (
      <p className="text-center mt-6 text-red-500">Failed to load tables</p>
    );

  return (
    <div className="m-5 flex flex-col items-center">
      <LiveHubRoutings currentPath="/table" />

      {/* Responsive layout */}
      <div className="flex flex-col md:flex-row md:flex-wrap gap-6 justify-center w-full">
        {leagueTable?.leagues.map((league, leagueIndex) => (
          <div
            key={leagueIndex}
            className="flex flex-col border rounded-xl shadow-lg border-gray-200 
            max-w-[700px] w-full md:w-[48%] lg:w-[45%] my-5 p-5 bg-gray-50"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              {league.league}
            </h2>

            {/* Header */}
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

            {/* Rows */}
            <div className="flex flex-col gap-2 mt-2">
              {league.standings.map((standing, standingIndex) => (
                <TableCard
                  key={standingIndex}
                  position={standing.position}
                  team={standing.team}
                  points={standing.points}
                  match_played={standing.match_played}
                  wins={standing.wins}
                  lose={standing.lose}
                  draw={standing.draw}
                  GD={standing.GD}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
