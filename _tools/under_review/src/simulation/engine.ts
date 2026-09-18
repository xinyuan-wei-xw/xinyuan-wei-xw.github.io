import { reviewCycles, timingAssumptions } from "../data/reviewCycles";
import {
  dimensions,
  labels,
  type Profile,
  type Manuscript,
  type ResearcherState,
  type Journal,
  type Review,
  type Game,
} from "../models/types";
import { config, zero, titles, colors } from "../data/config";
export const clamp = (v: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, v));
export function random(g: { seed: number }) {
  g.seed = (Math.imul(g.seed, 1664525) + 1013904223) >>> 0;
  return g.seed / 4294967296;
}
export function mapProfile(
  fn: (d: (typeof dimensions)[number]) => number,
): Profile {
  return Object.fromEntries(dimensions.map((d) => [d, fn(d)])) as Profile;
}
export function makePaper(g: Game): Manuscript {
  const id = g.nextId++;
  const underlying = mapProfile(() =>
    clamp(28 + g.researcher.researchSkill * 0.48 + random(g) * 34),
  );
  return {
    id,
    title: titles[(id - 1) % titles.length],
    color: colors[(id - 1) % colors.length],
    underlying,
    perception: mapProfile((d) =>
      clamp(underlying[d] + config.initialOptimism + random(g) * 9),
    ),
    status: "draft",
    revision: 0,
    history: [],
    target: null,
    rejectionStreak: 0,
    importance: 45 + random(g) * 45,
  };
}
export function initial(seed = Date.now()): Game {
  const g: Game = {
    researcher: {
      researchSkill: 38,
      experience: 0,
      confidence: 76,
      patience: 80,
      energy: 86,
      resilience: 40,
      careerMonth: 1,
      careerYear: 1,
    },
    papers: [],
    activeId: 1,
    selectedJournal: "misq",
    phase: "ready",
    elapsed: 0,
    duration: 0,
    pending: null,
    effort: zero(),
    message: "“This is actually pretty good.”",
    salientId: null,
    seed: seed >>> 0,
    nextId: 1,
    started: false,
    sound: false,
    speed: 1,
    reducedMotion:
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    log: ["A first manuscript. A suspicious amount of optimism."],
  };
  g.papers.push(makePaper(g));
  return g;
}
export function advance(r: ResearcherState, months: number) {
  const m = (r.careerYear - 1) * 12 + r.careerMonth - 1 + months;
  r.careerYear = Math.floor(m / 12) + 1;
  r.careerMonth = (m % 12) + 1;
}
// Fit compares normalized profiles; scaling every dimension cannot improve fit by itself.
export function fit(profile: Profile, journal: Journal) {
  const sum = dimensions.reduce((s, d) => s + profile[d], 0) || 1;
  const distance = dimensions.reduce(
    (s, d) => s + Math.abs(profile[d] / sum - journal.preferenceWeights[d]),
    0,
  );
  return clamp(1 - distance * 0.9, 0, 1);
}
export function assess(g: Game, p: Manuscript, j: Journal): Review {
  const assessment = mapProfile((d) =>
    clamp(p.underlying[d] + (random(g) - 0.5) * 2 * config.assessmentNoise),
  );
  const quality =
    dimensions.reduce((s, d) => s + assessment[d] * j.preferenceWeights[d], 0) /
    100;
  const alignment = fit(p.underlying, j);
  const last = p.history.at(-1);
  const continuing =
    p.target === j.id &&
    !!last &&
    ["Major Revision", "Minor Revision"].includes(last.outcome) &&
    p.revision > last.revision;
  const bonus = continuing
    ? config.continuationBonus +
      (last?.outcome === "Minor Revision" ? config.minorBonus : 0)
    : 0;
  const baseSupport = clamp(
    0.1 +
      quality * 0.62 +
      alignment * 0.26 -
      j.selectivity * 0.4 +
      p.revision * 0.025 +
      g.researcher.researchSkill * 0.001 +
      bonus,
    0.06,
    0.93,
  );
  const support = continuing
    ? baseSupport + (1 - baseSupport) * config.continuationRecovery
    : baseSupport;
  let outcome: Review["outcome"];
  const deskChance = continuing
    ? 0.008
    : clamp(
        0.07 +
          j.selectivity * 0.12 +
          (1 - alignment) * 0.22 -
          (quality - 0.5) * 0.08,
        0.025,
        0.28,
      );
  if (random(g) < deskChance) outcome = "Desk Reject";
  else if (random(g) > support) outcome = "Reject After Review";
  else {
    const draw = random(g);
    const acceptance = clamp(
      0.05 +
        p.revision * 0.09 +
        (quality - 0.65) * 0.3 +
        (last?.outcome === "Minor Revision" && continuing ? 0.23 : 0),
      0.03,
      0.65,
    );
    outcome =
      draw < acceptance
        ? "Accept"
        : draw < acceptance + 0.23 + (continuing ? 0.12 : 0)
          ? "Minor Revision"
          : "Major Revision";
  }
  const timing = reviewTiming(
    g,
    j,
    outcome,
    continuing ? last?.outcome : undefined,
  );
  const days = outcome === "Desk Reject" ? timing.totalDays : 0;
  const months = days ? 0 : Math.ceil(timing.totalDays / 30);
  const ranked = [...dimensions].sort((a, b) => assessment[a] - assessment[b]);
  const feedback: Review["feedback"] = [
    {
      kind: "Strength",
      dimension: ranked[4],
      text: `${labels[ranked[4]]} stands out positively in this assessment.`,
    },
    ...ranked.slice(0, outcome === "Accept" ? 1 : 2).map((d) => ({
      kind: "Concern" as const,
      dimension: d,
      text: {
        theory:
          "Clarify the theoretical mechanism and what changes in our understanding.",
        novelty: "Make the departure from existing work more explicit.",
        rigor: "Strengthen the design checks and explain the assumptions.",
        relevance:
          "Connect the evidence more closely to the intended audience.",
        writing: "Sharpen the positioning and simplify the main argument.",
      }[d],
    })),
  ];
  return {
    ...timing,
    journalId: j.id,
    outcome,
    assessment,
    fit: alignment,
    months,
    days,
    feedback,
    revision: p.revision,
  };
}
export function receive(g: Game, p: Manuscript, v: Review) {
  p.history.push(v);
  p.target = v.journalId;
  const r = g.researcher;
  const rejected = v.outcome.includes("Reject");
  p.status =
    v.outcome === "Accept" ? "accepted" : rejected ? "rejected" : "revision";
  p.rejectionStreak = rejected ? p.rejectionStreak + 1 : 0;
  r.researchSkill = clamp(
    r.researchSkill + 1.5 + (v.outcome === "Desk Reject" ? 0.2 : 1),
  );
  r.experience = clamp(r.experience + 3);
  r.resilience = clamp(r.resilience + (rejected ? 2 : 1));
  const hurt =
    (10 + v.months * 0.9 + p.rejectionStreak * 2 + p.importance * 0.045) *
    (1 - r.resilience * 0.004);
  r.confidence = clamp(
    r.confidence + (rejected ? -hurt : v.outcome === "Accept" ? 20 : 6),
  );
  r.patience = clamp(r.patience - v.months * 1.6 - (rejected ? 4 : 0));
  r.energy = clamp(r.energy - v.months * 0.8);
  advanceDays(r, v.totalDays ?? (v.days || v.months * 30));
  p.perception = mapProfile((d) =>
    clamp(
      p.perception[d] * 0.48 +
        v.assessment[d] * 0.52 +
        (rejected ? -8 : v.outcome === "Accept" ? 5 : 1),
    ),
  );
  g.message =
    v.outcome === "Accept"
      ? "“Wait. Accepted? Let me read that again.”"
      : v.outcome === "Major Revision"
        ? "“So you’re saying there’s a chance.”"
        : v.outcome === "Minor Revision"
          ? "“Minor. A beautiful, suspicious word.”"
          : v.outcome === "Desk Reject"
            ? "“The manuscript is still warm.”"
            : v.months >= 8
              ? "“I have aged an entire literature review.”"
              : p.rejectionStreak >= 3
                ? "“New journal. Same attachment. Deep breath.”"
                : "“Perhaps the contribution was too… contribution-shaped.”";
  g.log.unshift(
    `Y${r.careerYear} M${r.careerMonth} · ${v.outcome} · ${p.title}`,
  );
  g.log = g.log.slice(0, 30);
}
export function revise(g: Game, p: Manuscript) {
  const spent = dimensions.reduce((s, d) => s + g.effort[d], 0);
  if (!spent) return;
  const skill = g.researcher.researchSkill;
  p.underlying = mapProfile((d) =>
    clamp(
      p.underlying[d] +
        g.effort[d] *
          config.revisionGain *
          (0.55 + random(g) * 0.8) *
          (1 + skill * 0.003) *
          (1 - p.underlying[d] / 145),
    ),
  );
  p.revision++;
  p.perception = mapProfile((d) =>
    clamp(p.perception[d] * 0.35 + p.underlying[d] * 0.65 + 5 + random(g) * 4),
  );
  g.researcher.energy = clamp(g.researcher.energy - spent * 1.6);
  g.researcher.researchSkill = clamp(skill + spent * 0.32);
  g.researcher.experience = clamp(g.researcher.experience + 4);
  g.researcher.confidence = clamp(g.researcher.confidence + 9);
  advance(g.researcher, Math.max(1, Math.ceil(spent / 6)));
  g.effort = zero();
  g.message = "“Okay… now this is good.”";
}

export function advanceDays(r: ResearcherState, days: number) {
  const elapsed = (r.careerDay ?? 1) - 1 + days;
  advance(r, Math.floor(elapsed / 30));
  r.careerDay = (elapsed % 30) + 1;
}
export function reviewTiming(
  g: { seed: number },
  j: Journal,
  outcome: Review["outcome"],
  previous?: Review["outcome"],
) {
  const triangular = (lo: number, mode: number, hi: number) => {
    const u = random(g),
      cut = (mode - lo) / (hi - lo);
    return u < cut
      ? lo + Math.sqrt(u * (hi - lo) * (mode - lo))
      : hi - Math.sqrt((1 - u) * (hi - lo) * (hi - mode));
  };
  if (outcome === "Desk Reject") {
    const totalDays = Math.round(triangular(2, 10, 28));
    return {
      totalDays,
      stages: [{ label: "Editorial screening", days: totalDays }],
    };
  }
  const base = reviewCycles[j.id as keyof typeof reviewCycles].baselineDays;
  const factor =
    previous === "Minor Revision"
      ? timingAssumptions.minorRoundFactor
      : previous === "Major Revision"
        ? timingAssumptions.majorRoundFactor
        : 1;
  const total = Math.max(
    21,
    Math.round(base * factor * triangular(0.65, 0.95, 1.6)),
  );
  const stages = [
    {
      label: previous ? "Revision screening" : "Editorial screening",
      days: Math.max(2, Math.round(total * 0.1)),
    },
    {
      label: "Finding available reviewers",
      days: Math.max(3, Math.round(total * 0.15)),
    },
    {
      label:
        previous === "Minor Revision"
          ? "Checking the revision"
          : "External review",
      days: Math.round(total * 0.58),
    },
  ];
  stages.push({
    label: "Editorial decision",
    days: total - stages.reduce((s, x) => s + x.days, 0),
  });
  if (random(g) < timingAssumptions.delayChance)
    stages.splice(2, 0, {
      label: "Reviewer availability delay",
      days: Math.round(triangular(14, 35, 120)),
    });
  return { totalDays: stages.reduce((s, x) => s + x.days, 0), stages };
}
export function reviewStage(review: Review, progress: number) {
  if (!review.stages || !review.totalDays) return "Journal review";
  let day = Math.min(0.999, progress) * review.totalDays;
  for (const stage of review.stages) {
    day -= stage.days;
    if (day < 0) return stage.label;
  }
  return "Editorial decision";
}
