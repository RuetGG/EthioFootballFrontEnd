// TableCard.tsx
import React from "react";

type TableCardProps = {
  position: number;
  team: string;
  points: number;
  match_played: number;
  wins: number;
  lose: number;
  draw: number;
  GD: number;
};

const TableCard: React.FC<TableCardProps> = ({
  position,
  team,
  points,
  match_played,
  wins,
  lose,
  draw,
  GD,
}) => {
  const getPositionColor = () => {
    if (position === 1) return "text-green-500 font-extrabold";
    if (position === 2) return "text-yellow-400 font-bold";
    if (position === 3) return "text-red-600 font-bold";
    return "text-gray-700";
  };

  return (
    <div
      className="flex justify-between items-center bg-white hover:bg-gray-100 transition-all 
      duration-200 rounded-lg shadow-sm p-2"
    >
      <span className={`w-6 text-center ${getPositionColor()}`}>{position}</span>
      <span className="flex-1 font-medium truncate">{team}</span>
      <span className="w-10 text-center font-semibold">{points}</span>
      <span className="w-10 text-center">{match_played}</span>
      <span className="w-10 text-center text-green-600">{wins}</span>
      <span className="w-10 text-center text-red-600">{lose}</span>
      <span className="w-10 text-center">{draw}</span>
      <span className="w-10 text-center">{GD}</span>
    </div>
  );
};

export default TableCard;
