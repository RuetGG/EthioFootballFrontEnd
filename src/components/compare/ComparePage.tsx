'use client';

import { useGetComparisonQuery } from '../../lib/api/compareApi';
import { useTranslation } from '../../lib/i18n/useTranslation';
import TeamCard from './TeamCard';
import CompareStats from './CompareStats';
import FreshnessBadge from './FreshnessBadge';

interface ComparePageProps {
  teamA?: string;
  teamB?: string;
}

/**
 * Main compare page component
 * Handles data loading, loading states, and renders the comparison UI
 */
export default function ComparePage({ teamA = 'st-george', teamB = 'bunna' }: ComparePageProps) {
  const { t } = useTranslation();
  
  const {
    data: comparison,
    isLoading,
    error,
  } = useGetComparisonQuery({ teamA, teamB });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{t('compare.loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !comparison) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-500 text-lg mb-4">⚠️</div>
            <p className="text-gray-600">{t('compare.error')}</p>
          </div>
        </div>
      </div>
    );
  }

  const { team_a, team_b } = comparison.comparison_data;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('compare.title')}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-xl font-semibold text-gray-800">{team_a.name}</span>
            <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold">
              {t('compare.vs')}
            </div>
            <span className="text-xl font-semibold text-gray-800">{team_b.name}</span>
          </div>
          <FreshnessBadge source={comparison.source} freshness={comparison.freshness} />
        </div>

        {/* Stats Comparison */}
        <CompareStats teamA={team_a} teamB={team_b} />

        {/* Team Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TeamCard team={team_a} position="left" />
          <TeamCard team={team_b} position="right" />
        </div>
      </div>
    </div>
  );
}
