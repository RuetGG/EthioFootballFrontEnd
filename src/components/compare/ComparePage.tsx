'use client';

import { useState } from 'react';
import { useGetComparisonQuery } from '../../lib/api/compareApi';
import TeamCard from './TeamCard';
import CompareStats from './CompareStats';
import FreshnessBadge from './FreshnessBadge';

export default function ComparePage() {
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [submittedTeams, setSubmittedTeams] = useState<{ teamA: string; teamB: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const { data: comparison, isLoading, error } = useGetComparisonQuery(submittedTeams!, {
    skip: !submittedTeams,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    if (!teamA.trim() || !teamB.trim()) {
      setErrorMessage('Both team names are required.');
      return;
    }

    setErrorMessage('');
    setSubmittedTeams({ teamA: teamA.trim(), teamB: teamB.trim() });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
            <span className="bg-gradient-to-r text-green-900  bg-clip-text">
              Team Comparison
            </span>
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <input
              type="text"
              value={teamA}
              onChange={(e) => setTeamA(e.target.value)}
              placeholder="Enter Team A"
              className="px-4 py-2 w-48 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="font-bold text-gray-700">VS</span>
            <input
              type="text"
              value={teamB}
              onChange={(e) => setTeamB(e.target.value)}
              placeholder="Enter Team B"
              className="px-4 py-2 w-48 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
            >
              Compare
            </button>
          </form>

          {errorMessage && (
            <p className="text-red-500 mt-2 font-medium">{errorMessage}</p>
          )}
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center mt-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
            <p className="text-gray-600">Fetching comparison data...</p>
          </div>
        )}

        {error && (
          <div className="text-center mt-12">
            <div className="text-red-500 text-2xl mb-2">⚠️</div>
            <p className="text-gray-700">Couldn’t load comparison data. Please try again.</p>
          </div>
        )}

        {comparison && submittedTeams && (
          <>
            <div className="text-center mb-6">
              <FreshnessBadge source={comparison.source} freshness={comparison.freshness} />
            </div>

            <CompareStats teamA={comparison.comparison_data.team_a} teamB={comparison.comparison_data.team_b} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <TeamCard team={comparison.comparison_data.team_a} position="left" />
              <TeamCard team={comparison.comparison_data.team_b} position="right" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}