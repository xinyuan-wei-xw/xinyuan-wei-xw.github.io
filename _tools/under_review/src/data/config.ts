import type { Profile } from "../models/types";
export const zero = (): Profile => ({
  theory: 0,
  novelty: 0,
  rigor: 0,
  relevance: 0,
  writing: 0,
});
export const config = {
  revisionBudget: 12,
  revisionGain: 2.15,
  assessmentNoise: 18,
  initialOptimism: 16,
  continuationBonus: 0.18,
  continuationRecovery: 0.65,
  minorBonus: 0.12,
  reviewSecondsPerMonth: 0.65,
  longReviewChance: 0.09,
  maxPapers: 12,
};
export const titles = [
  "When Helpful AI Becomes Another Meeting",
  "The Algorithm Said It Was Fine",
  "Trust, but Verify the Spreadsheet",
  "A Theory of Unread Dashboards",
  "The Last Click Before Lunch",
  "Human Judgment, Now with Notifications",
  "Coordination in the Age of Too Many Tabs",
  "The Unexpected Life of a Default Setting",
  "When Metrics Meet Monday",
  "The Promise of One More Robustness Check",
  "Who Moved My Research Question?",
  "A Small Effect with a Long Appendix",
];
export const colors = [
  "#f2a66e",
  "#73b4a1",
  "#aba3d2",
  "#e2bb55",
  "#83b6ce",
  "#d998ad",
];
