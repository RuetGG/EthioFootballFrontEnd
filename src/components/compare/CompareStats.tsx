import type { TeamData } from '../../types/compare';

interface CompareStatsProps {
  teamA: TeamData;
  teamB: TeamData;
}

export default function CompareStats({ teamA, teamB }: CompareStatsProps) {

  const getWinsCount = (form: string[] | any[]) => {
    if (!Array.isArray(form)) return 0;
    return form.filter(result => result === 'W').length;
  };

  const getWinPercentage = (wins: number, matches: number) => {
    return matches > 0 ? Math.round((wins / matches) * 100) : 0;
  };

  const getGoalDifference = (goalsFor: number, goalsAgainst: number) => {
    return goalsFor - goalsAgainst;
  };

  const stats = [
    {
      label: 'Matches Played',
      teamA: teamA.matches_played,
      teamB: teamB.matches_played,
    },
    {
      label: 'Wins',
      teamA: teamA.wins,
      teamB: teamB.wins,
    },
    {
      label: 'Win Rate',
      teamA: `${getWinPercentage(teamA.wins, teamA.matches_played)}%`,
      teamB: `${getWinPercentage(teamB.wins, teamB.matches_played)}%`,
    },
    {
      label: 'Goals For',
      teamA: teamA.goals_for,
      teamB: teamB.goals_for,
    },
    {
      label: 'Goals Against',
      teamA: teamA.goals_against,
      teamB: teamB.goals_against,
    },
    {
      label: 'Goal Difference',
      teamA: getGoalDifference(teamA.goals_for, teamA.goals_against),
      teamB: getGoalDifference(teamB.goals_for, teamB.goals_against),
    },
    {
      label: 'Recent Form Wins',
      teamA: getWinsCount(teamA.recent_form),
      teamB: getWinsCount(teamB.recent_form),
    },
  ];
  console.log(teamA.recent_form, teamB.recent_form)

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
        Season Statistics Comparison
      </h3>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <div className="text-center flex-1">
              <div className="text-lg font-semibold text-blue-600">{stat.teamA}</div>
            </div>
            <div className="text-center flex-1 px-4">
              <div className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-1 rounded-full">
                {stat.label}
              </div>
            </div>
            <div className="text-center flex-1">
              <div className="text-lg font-semibold text-blue-600">{stat.teamB}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
