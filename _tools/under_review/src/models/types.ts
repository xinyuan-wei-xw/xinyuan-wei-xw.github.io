export const dimensions = [
  "theory",
  "novelty",
  "rigor",
  "relevance",
  "writing",
] as const;
export type Dimension = (typeof dimensions)[number];
export type Profile = Record<Dimension, number>;
export const labels: Record<Dimension, string> = {
  theory: "Theory",
  novelty: "Novelty",
  rigor: "Methodological rigor",
  relevance: "Relevance",
  writing: "Writing & positioning",
};
export interface ResearcherState {
  researchSkill: number;
  experience: number;
  confidence: number;
  patience: number;
  energy: number;
  resilience: number;
  careerMonth: number;
  careerDay?: number;
  careerYear: number;
}
export type Outcome =
  | "Desk Reject"
  | "Reject After Review"
  | "Major Revision"
  | "Minor Revision"
  | "Accept";
export interface Journal {
  id: string;
  name: string;
  color: string;
  preferenceWeights: Profile;
  selectivity: number;
}
export interface Review {
  totalDays?: number;
  stages?: { label: string; days: number }[];
  journalId: string;
  outcome: Outcome;
  assessment: Profile;
  fit: number;
  months: number;
  days: number;
  feedback: {
    kind: "Strength" | "Concern";
    dimension: Dimension;
    text: string;
  }[];
  revision: number;
}
export interface Manuscript {
  id: number;
  title: string;
  color: string;
  underlying: Profile;
  perception: Profile;
  status: "draft" | "revision" | "rejected" | "accepted" | "dormant";
  revision: number;
  history: Review[];
  target: string | null;
  rejectionStreak: number;
  importance: number;
  dormantStatus?: "draft" | "revision" | "rejected" | "accepted" | "dormant";
}
export type Phase =
  | "ready"
  | "writing"
  | "throwing"
  | "review"
  | "decision"
  | "revising"
  | "filing"
  | "retrieving"
  | "resting";
export interface Game {
  researcher: ResearcherState;
  papers: Manuscript[];
  activeId: number;
  selectedJournal: string;
  phase: Phase;
  elapsed: number;
  duration: number;
  pending: Review | null;
  effort: Profile;
  message: string;
  salientId: number | null;
  seed: number;
  nextId: number;
  started: boolean;
  sound: boolean;
  speed: number;
  reducedMotion: boolean;
  log: string[];
}
