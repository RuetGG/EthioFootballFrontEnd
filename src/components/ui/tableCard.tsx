import React from "react";

type TableCardProps = {
  rank: number;
  teamName: string;
  teamLogo: string;
  points: number;
  matchesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  goalsDiff: number;
};

const TableCard: React.FC<TableCardProps> = ({
  rank,
  teamName,
  teamLogo,
  points,
  matchesPlayed,
  wins,
  losses,
  draws,
  goalsDiff,
}) => {
  const getPositionColor = () => {
    if (rank === 1) return "text-green-500 font-extrabold";
    if (rank === 2) return "text-yellow-400 font-bold";
    if (rank === 3) return "text-red-600 font-bold";
    return "text-gray-700";
  };

  return (
    <div
      className="flex justify-between items-center bg-white hover:bg-gray-100 transition-all 
      duration-200 rounded-lg shadow-sm p-2"
    >
      <span className={`w-6 text-center ${getPositionColor()}`}>{rank}</span>
      
      <span className="flex items-center flex-1 font-medium truncate">
        <img src={teamLogo} alt={teamName} className="w-6 h-6 mr-2" />
        {teamName}
      </span>
      
      <span className="w-10 text-center font-semibold">{points}</span>
      <span className="w-10 text-center">{matchesPlayed}</span>
      <span className="w-10 text-center text-green-600">{wins}</span>
      <span className="w-10 text-center text-red-600">{losses}</span>
      <span className="w-10 text-center">{draws}</span>
      <span className="w-10 text-center">{goalsDiff}</span>
    </div>
  );
};

export default TableCard;