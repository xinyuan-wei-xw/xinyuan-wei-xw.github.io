// Process-informed simulation settings. Targets and historical averages are not
// promises, and the distributions/delay probabilities below are game assumptions.
export const reviewCycles = {
  misq: {
    baselineDays: 55,
    note: "MISQ reviewer guidance gives stage targets totaling about 46–63 days; delays can extend a round. Targets are not observed averages.",
    url: "https://misq.umn.edu/skin/frontend/default/misq/pdf/ReviewerRole.pdf",
  },
  isr: {
    baselineDays: 84,
    note: "ISR’s official chart shows roughly 2.8 months to first decision after external review in 2025 Q1–3 (visual approximation). Later rounds are modeled separately.",
    url: "https://pubsonline.informs.org/authorportal/journal-metrics/information-systems-research",
  },
  jais: {
    baselineDays: 90,
    note: "JAIS documents editorial screening and developmental review. A 90-day baseline here is a shared simulation assumption, not a verified JAIS average.",
    url: "https://aisel.aisnet.org/jais/authorinfo.html",
  },
  jmis: {
    baselineDays: 90,
    note: "JMIS documents double-anonymous review. Its displayed acceptance-to-publication metric is not review time; this baseline is a simulation assumption.",
    url: "https://www.tandfonline.com/journals/mmis20/about-this-journal",
  },
  ejis: {
    baselineDays: 90,
    note: "No comparable external-review duration verified in this check. Uses the shared simulation baseline, not a journal-specific estimate.",
    url: "https://www.tandfonline.com/journals/tjis20/about-this-journal",
  },
  isj: {
    baselineDays: 90,
    note: "A short all-submission first-decision metric is not the duration of external review. Uses the shared simulation baseline.",
    url: "https://onlinelibrary.wiley.com/journal/13652575",
  },
  jsis: {
    baselineDays: 90,
    note: "Journal Insights could not be verified in this check. Uses the shared simulation baseline, not a journal-specific estimate.",
    url: "https://www.sciencedirect.com/journal/the-journal-of-strategic-information-systems/about/insights",
  },
  jit: {
    baselineDays: 90,
    note: "No comparable external-review duration verified in this check. Uses the shared simulation baseline, not a journal-specific estimate.",
    url: "https://journals.sagepub.com/home/jin",
  },
} as const;
export const timingAssumptions = {
  delayChance: 0.18,
  minorRoundFactor: 0.55,
  majorRoundFactor: 0.85,
};
