import test from "node:test";
import assert from "node:assert/strict";
import { useGame, createGameStore } from "../src/state/store";
import { initial } from "../src/simulation/engine";
const state = () => useGame.getState();
const finish = () => {
  for (let i = 0; i < 300; i++) {
    if (["ready", "decision"].includes(state().game.phase)) return;
    state().tick(0.1);
  }
  throw new Error("Animation did not finish");
};
test("Complete submission, revision, drawer recovery, rest and new paper flow", () => {
  useGame.setState({ game: initial(23) });
  state().act("start");
  state().act("submit");
  assert.equal(state().game.phase, "throwing");
  const pending = structuredClone(state().game.pending);
  state().act("submit");
  assert.deepEqual(state().game.pending, pending);
  finish();
  assert.equal(state().game.papers[0].history.length, 1);
  // Force a rejected state to test recovery independently of the editorial random draw.
  const g = structuredClone(state().game);
  g.papers[0].status = "rejected";
  g.papers[0].history[0].outcome = "Reject After Review";
  useGame.setState({ game: g });
  for (let i = 0; i < 15; i++) state().allocate("writing", 1);
  assert.equal(state().game.effort.writing, 12);
  state().act("revise");
  finish();
  assert.equal(state().game.papers[0].revision, 1);
  const truth = { ...state().game.papers[0].underlying };
  state().act("file");
  finish();
  assert.equal(state().game.papers[0].status, "dormant");
  state().act("retrieve", 1);
  finish();
  assert.notEqual(state().game.papers[0].status, "dormant");
  assert.deepEqual(state().game.papers[0].underlying, truth);
  assert.equal(state().game.papers[0].history.length, 1);
  state().act("rest");
  finish();
  state().act("new");
  finish();
  assert.equal(state().game.papers.length, 2);
  assert.equal(state().game.activeId, 2);
});
test("R&R requires actual revision; accepted papers cannot be submitted again", () => {
  const g = initial(25);
  g.started = true;
  const p = g.papers[0];
  p.status = "revision";
  p.target = "misq";
  p.history = [
    {
      journalId: "misq",
      outcome: "Major Revision",
      assessment: { ...p.underlying },
      fit: 0.8,
      months: 3,
      days: 0,
      feedback: [],
      revision: 0,
    },
  ];
  useGame.setState({ game: g });
  state().act("submit");
  assert.equal(state().game.phase, "ready");
  state().allocate("rigor", 1);
  state().act("revise");
  finish();
  state().act("submit");
  assert.equal(state().game.phase, "throwing");
  finish();
  const accepted = structuredClone(state().game);
  accepted.papers[0].status = "accepted";
  useGame.setState({ game: accepted });
  state().act("submit");
  assert.equal(state().game.phase, "decision");
});

test("Fresh page stores never inherit another player's career", () => {
  const first = createGameStore();
  first.getState().act("start");
  first.getState().act("submit");
  for (let i = 0; i < 300; i++) first.getState().tick(0.1);
  assert.equal(first.getState().game.papers[0].history.length, 1);
  const next = createGameStore();
  assert.equal(next.getState().game.started, false);
  assert.equal(next.getState().game.papers[0].history.length, 0);
  assert.equal(next.getState().game.pending, null);
  assert.equal(first.getState().game.papers[0].history.length, 1);
});
