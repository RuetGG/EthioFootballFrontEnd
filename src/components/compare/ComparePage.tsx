'use client';

import { useState } from 'react';
import { useGetComparisonQuery } from '../../lib/api/compareApi';
import TeamCard from './TeamCard';
import CompareStats from './CompareStats';
import FreshnessBadge from './FreshnessBadge';
import TeamSelector from './TeamSelector';

interface ComparePageProps {
  teamA?: string;
  teamB?: string;
}

export default function ComparePage({ teamA: initialTeamA = '', teamB: initialTeamB = '' }: ComparePageProps) {
  const [selectedTeamA, setSelectedTeamA] = useState(initialTeamA);
  const [selectedTeamB, setSelectedTeamB] = useState(initialTeamB);
  const [selectedLeague, setSelectedLeague] = useState<'ETH' | 'EPL'>('ETH');
  const [showComparison, setShowComparison] = useState(false);
  
  const getLeague = (teamA: string, teamB: string): string => {
    const ethTeamIds = ['4110', '4111', '4112', '4115', '4116', '4117', '4119', '4120', '4123', '4124', '4126', '4127', '4129', '4130', '9983', '9984', '9985', '9987', '20030', '20031', '22232', '22233'];
    const eplTeamIds = ['33', '34', '35', '36', '39', '40', '41', '42', '45', '46', '47', '48', '49', '50', '51', '52', '55', '63', '65', '66', '38', '44', '71', '62', '1359'];
    
    const isTeamAEth = ethTeamIds.includes(teamA);
    const isTeamBEth = ethTeamIds.includes(teamB);
    const isTeamAEpl = eplTeamIds.includes(teamA);
    const isTeamBEpl = eplTeamIds.includes(teamB);
    
    if (isTeamAEth && isTeamBEth) return 'ETH';
    if (isTeamAEpl && isTeamBEpl) return 'EPL';
    
    return 'ETH';
  };

  const league = getLeague(selectedTeamA, selectedTeamB);

  const {
    data: comparison,
    isLoading,
    error,
  } = useGetComparisonQuery({ 
    teamA: selectedTeamA, 
    teamB: selectedTeamB,
    league: selectedLeague 
  }, {
    skip: !showComparison || !selectedTeamA || !selectedTeamB || selectedTeamA === selectedTeamB
  });

  const handleTeamAChange = (teamId: string) => {
    if (teamId !== selectedTeamB) {
      setSelectedTeamA(teamId);
    }
  };

  const handleTeamBChange = (teamId: string) => {
    if (teamId !== selectedTeamA) {
      setSelectedTeamB(teamId);
    }
  };

  const handleLeagueChange = (league: 'ETH' | 'EPL') => {
    setSelectedLeague(league);
    setSelectedTeamA('');
    setSelectedTeamB('');
    setShowComparison(false);
  };

  const handleCompare = () => {
    if (selectedTeamA && selectedTeamB && selectedTeamA !== selectedTeamB) {
      setShowComparison(true);
    }
  };

  const canCompare = selectedTeamA && selectedTeamB && selectedTeamA !== selectedTeamB;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Team Comparison
          </h1>
          
          {/* League Tabs */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => handleLeagueChange('ETH')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  selectedLeague === 'ETH'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Ethiopian Premier League
              </button>
              <button
                onClick={() => handleLeagueChange('EPL')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  selectedLeague === 'EPL'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                English Premier League
              </button>
            </div>
          </div>
          
          {/* Team Selection */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TeamSelector
                value={selectedTeamA}
                onChange={handleTeamAChange}
                placeholder="Select first team"
                label="Team A"
                league={selectedLeague}
              />
              <TeamSelector
                value={selectedTeamB}
                onChange={handleTeamBChange}
                placeholder="Select second team"
                label="Team B"
                league={selectedLeague}
              />
            </div>
            
            {/* Compare Button */}
            {canCompare && (
              <div className="mt-6">
                <button
                  onClick={handleCompare}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Compare Teams
                </button>
              </div>
            )}
            
            {selectedTeamA === selectedTeamB && selectedTeamA && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  Please select two different teams to compare
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Content based on state */}
        {!showComparison ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Team Comparison</h2>
            <p className="text-lg text-gray-600 mb-2">Compare teams from Ethiopian Premier League or English Premier League</p>
            <p className="text-gray-500">Select your league above, choose two teams, and click Compare to get started!</p>
            
            {/* Feature highlights */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Detailed Stats</h3>
                <p className="text-sm text-gray-600">Compare matches played, wins, goals, and more</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Real-time Data</h3>
                <p className="text-sm text-gray-600">Get the latest team performance data</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Visual Comparison</h3>
                <p className="text-sm text-gray-600">Easy-to-read side-by-side comparison</p>
              </div>
            </div>
          </div>
        ) : isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading comparison data...</p>
          </div>
        ) : error || !comparison ? (
          <div className="text-center py-12">
            <div className="text-red-500 text-2xl mb-4">⚠️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to Load Data</h3>
            <p className="text-gray-600 mb-4">
              {error && 'status' in error ? 
                `Error ${error.status}: Unable to fetch comparison data` : 
                'Unable to fetch comparison data. Please try again.'}
            </p>
            <button
              onClick={() => setShowComparison(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* VS Header */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-xl font-semibold text-gray-800">
                {comparison?.comparison_data?.team_a?.name || 'Team A'}
              </span>
              <div className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-lg">
                VS
              </div>
              <span className="text-xl font-semibold text-gray-800">
                {comparison?.comparison_data?.team_b?.name || 'Team B'}
              </span>
            </div>

            <FreshnessBadge source={comparison.source} freshness={comparison.freshness} />

            {/* Stats Comparison */}
            {comparison?.comparison_data?.team_a && comparison?.comparison_data?.team_b && (
              <CompareStats teamA={comparison.comparison_data.team_a} teamB={comparison.comparison_data.team_b} />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {comparison?.comparison_data?.team_a && (
                <TeamCard team={comparison.comparison_data.team_a} position="left" />
              )}
              {comparison?.comparison_data?.team_b && (
                <TeamCard team={comparison.comparison_data.team_b} position="right" />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}