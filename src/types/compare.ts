
export type FormResult = "W" | "D" | "L";

export interface TeamStats {
  name: string;
  matches_played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
}

export interface ComparisonResponse {
  comparison_data: {
    team_a: TeamStats;
    team_b: TeamStats;
  };
}

export interface TeamData extends TeamStats {
  honors: string[];
  recent_form: FormResult[];
  notable_players: string[];
  fanbase_notes: string;
}

export interface TeamComparison {
  comparison_data: {
    team_a: TeamData;
    team_b: TeamData;
  };
  source: string;
  freshness: string;
}

export interface CompareState {
  data?: TeamComparison;
  loading: boolean;
  error?: string;
}

export interface CompareParams {
  teamA: string;
  teamB: string;
  league?: string;
}

export interface TeamOption {
  value: string;
  label: string;
}
