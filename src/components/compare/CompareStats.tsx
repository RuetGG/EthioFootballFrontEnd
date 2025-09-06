import type { TeamData } from '../../types/compare';

interface CompareStatsProps {
  teamA: TeamData;
  teamB: TeamData;
}

/**
 * Component to display head-to-head comparison statistics
 * Shows honors count and recent wins comparison
 */
export default function CompareStats({ teamA, teamB }: CompareStatsProps) {

  const getWinsCount = (form: string[]) => {
    return form.filter(result => result === 'W').length;
  };

  const getHonorsCount = (honors: string[]) => {
    return honors.length;
  };

  const stats = [
    {
      label: 'Total Honors',
      teamA: getHonorsCount(teamA.honors),
      teamB: getHonorsCount(teamB.honors),
    },
    {
      label: 'Recent Wins',
      teamA: getWinsCount(teamA.recent_form),
      teamB: getWinsCount(teamB.recent_form),
    },
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Head-to-Head Stats
      </h3>
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="text-center flex-1">
              <div className="text-2xl font-bold text-blue-600">{stat.teamA}</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-sm font-medium text-gray-600">{stat.label}</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl font-bold text-blue-600">{stat.teamB}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
