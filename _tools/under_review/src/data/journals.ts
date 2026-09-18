import type { Journal } from "../models/types";
// Weights and selectivity are fictional. Review timing is configured in reviewCycles.ts.
// Simulation placeholder. Not an official journal acceptance rate.
// Plain text names only; no endorsement or journal-specific empirical claims.
export const journals: Journal[] = [
  {
    id: "misq",
    name: "MIS Quarterly",
    color: "#ba785d",
    preferenceWeights: {
      theory: 0.3,
      novelty: 0.25,
      rigor: 0.18,
      relevance: 0.14,
      writing: 0.13,
    },
    selectivity: 0.76,
  },
  {
    id: "isr",
    name: "Information Systems Research",
    color: "#638f99",
    preferenceWeights: {
      theory: 0.17,
      novelty: 0.22,
      rigor: 0.32,
      relevance: 0.16,
      writing: 0.13,
    },
    selectivity: 0.75,
  },
  {
    id: "jais",
    name: "Journal of the Association for Information Systems",
    color: "#9784b3",
    preferenceWeights: {
      theory: 0.26,
      novelty: 0.16,
      rigor: 0.18,
      relevance: 0.16,
      writing: 0.24,
    },
    selectivity: 0.64,
  },
  {
    id: "jmis",
    name: "Journal of Management Information Systems",
    color: "#819761",
    preferenceWeights: {
      theory: 0.16,
      novelty: 0.19,
      rigor: 0.22,
      relevance: 0.29,
      writing: 0.14,
    },
    selectivity: 0.66,
  },
  {
    id: "ejis",
    name: "European Journal of Information Systems",
    color: "#b39755",
    preferenceWeights: {
      theory: 0.22,
      novelty: 0.19,
      rigor: 0.17,
      relevance: 0.18,
      writing: 0.24,
    },
    selectivity: 0.61,
  },
  {
    id: "isj",
    name: "Information Systems Journal",
    color: "#a47287",
    preferenceWeights: {
      theory: 0.26,
      novelty: 0.14,
      rigor: 0.24,
      relevance: 0.16,
      writing: 0.2,
    },
    selectivity: 0.6,
  },
  {
    id: "jsis",
    name: "Journal of Strategic Information Systems",
    color: "#63957d",
    preferenceWeights: {
      theory: 0.19,
      novelty: 0.17,
      rigor: 0.15,
      relevance: 0.35,
      writing: 0.14,
    },
    selectivity: 0.63,
  },
  {
    id: "jit",
    name: "Journal of Information Technology",
    color: "#8492b9",
    preferenceWeights: {
      theory: 0.15,
      novelty: 0.29,
      rigor: 0.16,
      relevance: 0.24,
      writing: 0.16,
    },
    selectivity: 0.62,
  },
];
