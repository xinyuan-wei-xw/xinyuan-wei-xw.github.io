import test from "node:test";
import assert from "node:assert/strict";
import {
  initial,
  assess,
  receive,
  revise,
  fit,
  advance,
  makePaper,
} from "../src/simulation/engine";
import { journals } from "../src/data/journals";
import { dimensions } from "../src/models/types";
import { zero } from "../src/data/config";

test("Rejection changes perception and confidence, never underlying attributes", () => {
  const g = initial(20),
    p = g.papers[0],
    truth = { ...p.underlying },
    skill = g.researcher.researchSkill,
    confidence = g.researcher.confidence;
  const v = assess(g, p, journals[0]);
  v.outcome = "Reject After Review";
  v.months = 9;
  receive(g, p, v);
  assert.deepEqual(p.underlying, truth);
  assert.ok(g.researcher.researchSkill > skill);
  assert.ok(g.researcher.confidence < confidence);
  assert.equal(p.history.length, 1);
});
test("Fit is about profile rather than overall scale", () => {
  const a = { theory: 20, novelty: 40, rigor: 30, relevance: 25, writing: 35 };
  const b = { theory: 40, novelty: 80, rigor: 60, relevance: 50, writing: 70 };
  assert.equal(fit(a, journals[0]), fit(b, journals[0]));
});
test("Targeted revision preserves unallocated dimensions and consumes time and energy", () => {
  const g = initial(30),
    p = g.papers[0],
    before = { ...p.underlying },
    energy = g.researcher.energy;
  g.effort = { ...zero(), rigor: 8, writing: 4 };
  revise(g, p);
  assert.equal(p.underlying.theory, before.theory);
  assert.ok(p.underlying.rigor > before.rigor);
  assert.ok(p.underlying.writing > before.writing);
  assert.ok(g.researcher.energy < energy);
  assert.equal(p.revision, 1);
  assert.equal(g.researcher.careerMonth, 3);
});
test("All outcomes reachable; assessments bounded and waits finite", () => {
  const outcomes = new Set();
  for (let i = 1; i <= 3000; i++) {
    const g = initial(i * 999),
      p = g.papers[0];
    p.revision = i % 5;
    const v = assess(g, p, journals[i % 8]);
    outcomes.add(v.outcome);
    dimensions.forEach((d) =>
      assert.ok(v.assessment[d] >= 0 && v.assessment[d] <= 100),
    );
    assert.ok(v.months <= 11);
    assert.ok(v.days <= 27);
    assert.ok(v.feedback.length >= 2 && v.feedback.length <= 4);
  }
  assert.equal(outcomes.size, 5);
});
test("R&R improves continuation without guaranteeing acceptance", () => {
  let continuing = 0,
    fresh = 0,
    rejected = 0;
  for (let i = 1; i <= 2000; i++) {
    const a = initial(i * 123),
      p = a.papers[0];
    p.revision = 1;
    p.target = "misq";
    const v = assess(a, p, journals[0]);
    v.outcome = "Major Revision";
    v.revision = 0;
    p.history = [v];
    const b = structuredClone(a);
    b.papers[0].target = "isr";
    const ca = assess(a, p, journals[0]),
      cb = assess(b, b.papers[0], journals[0]);
    if (!ca.outcome.includes("Reject")) continuing++;
    else rejected++;
    if (!cb.outcome.includes("Reject")) fresh++;
  }
  assert.ok(continuing > fresh);
  assert.ok(rejected > 0);
});
test("Many revision cycles remain bounded and career calendar rolls over", () => {
  const g = initial(300),
    p = g.papers[0];
  for (let i = 0; i < 100; i++) {
    g.effort = { theory: 3, novelty: 2, rigor: 3, relevance: 2, writing: 2 };
    revise(g, p);
    receive(g, p, assess(g, p, journals[i % 8]));
    dimensions.forEach((d) => assert.ok(p.underlying[d] <= 100));
  }
  assert.ok(g.researcher.energy >= 0);
  assert.ok(g.researcher.confidence >= 0);
  assert.ok(g.researcher.researchSkill <= 100);
  advance(g.researcher, 24);
  assert.ok(g.researcher.careerMonth >= 1 && g.researcher.careerMonth <= 12);
  assert.equal(makePaper(g).id, 2);
});
