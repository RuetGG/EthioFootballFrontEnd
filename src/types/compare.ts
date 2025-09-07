/**
 * TypeScript interfaces for team comparison functionality
 */

export type FormResult = "W" | "D" | "L";

export interface TeamData {
  name: string;
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
}
