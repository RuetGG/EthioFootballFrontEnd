import FormRow from './FormRow';
import type { TeamData } from '../../types/compare';

interface TeamCardProps {
  team: TeamData;
  position: 'left' | 'right';
}

/**
 * Component to display individual team information
 * Shows team crest, name, honors, recent form, and notable players
 */
export default function TeamCard({ team, position }: TeamCardProps) {

  // Generate team initials for fallback crest
  const getTeamInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${position === 'right' ? 'ml-4' : 'mr-4'}`}>
      {/* Team Header */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-blue-800">
            {getTeamInitials(team.name)}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">{team.name}</h2>
      </div>

      {/* Honors Section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Honors
        </h3>
        <ul className="space-y-2">
          {team.honors.map((honor, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              {honor}
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Form Section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Recent Form
        </h3>
        <FormRow form={team.recent_form} />
      </div>

      {/* Notable Players Section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Notable Players
        </h3>
        <div className="flex flex-wrap gap-2">
          {team.notable_players.map((player, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {player}
            </span>
          ))}
        </div>
      </div>

      {/* Fanbase Notes Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Fanbase Notes
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {team.fanbase_notes}
        </p>
      </div>
    </div>
  );
}
