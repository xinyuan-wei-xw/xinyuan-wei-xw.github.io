import { create } from "zustand";
import type { Game, Dimension, Phase } from "../models/types";
import { dimensions } from "../models/types";
import { config, zero } from "../data/config";
import { journals } from "../data/journals";
import {
  initial,
  makePaper,
  assess,
  receive,
  revise,
  random,
  clamp,
  advance,
} from "../simulation/engine";
interface Store {
  game: Game;
  act: (action: string, value?: string | number) => void;
  tick: (dt: number) => void;
  allocate: (d: Dimension, delta: number) => void;
  reset: () => void;
}
const paper = (g: Game) => g.papers.find((p) => p.id === g.activeId)!;
const idle = (g: Game) => ["ready", "decision"].includes(g.phase);
function enter(g: Game, phase: Phase, duration: number) {
  g.phase = phase;
  g.elapsed = 0;
  g.duration = duration;
}
// Remove the legacy save without reading or restoring another player's career.
try {
  localStorage.removeItem("under-review-v1");
} catch {
  // Storage may be unavailable; gameplay needs no browser storage.
}
export const createGameStore = () => create<Store>()(
    (set, get) => ({
      game: initial(),
      reset: () => set({ game: initial() }),
      allocate: (d, delta) =>
        set((s) => {
          const g = structuredClone(s.game);
          if (!idle(g) || paper(g).status === "accepted") return {};
          const used = dimensions.reduce((n, k) => n + g.effort[k], 0);
          if (
            (delta > 0 && used >= config.revisionBudget) ||
            g.effort[d] + delta < 0
          )
            return {};
          g.effort[d] += delta;
          return { game: g };
        }),
      act: (action, value) =>
        set((s) => {
          const g = structuredClone(s.game);
          const p = paper(g);
          if (action === "start") {
            g.started = true;
            return { game: g };
          }
          if (action === "sound") {
            g.sound = !g.sound;
            return { game: g };
          }
          if (action === "speed") {
            g.speed = g.speed === 1 ? 2 : 1;
            return { game: g };
          }
          if (action === "motion") {
            g.reducedMotion = !g.reducedMotion;
            return { game: g };
          }
          if (!idle(g) || !g.started) return {};
          if (action === "journal" && journals.some((j) => j.id === value)) {
            g.selectedJournal = String(value);
            g.pending = null;
            g.phase = "ready";
          }
          if (
            action === "submit" &&
            p.status !== "accepted" &&
            p.status !== "dormant"
          ) {
            const last = p.history.at(-1);
            if (p.status === "rejected" && p.target === g.selectedJournal)
              return {};
            if (
              p.status === "revision" &&
              p.target === g.selectedJournal &&
              p.revision === (last?.revision ?? 0)
            )
              return {};
            g.pending = assess(
              g,
              p,
              journals.find((j) => j.id === g.selectedJournal)!,
            );
            g.effort = zero();
            enter(g, "throwing", 2.7);
            g.message = "“Dear Editor, we are pleased to submit…”";
          }
          if (
            action === "revise" &&
            p.status !== "accepted" &&
            dimensions.some((d) => g.effort[d] > 0)
          ) {
            const cost = dimensions.reduce((n, d) => n + g.effort[d], 0) * 1.6;
            if (g.researcher.energy < cost) {
              g.message = "A little rest first. Even the coffee needs a break.";
              return { game: g };
            }
            enter(g, "revising", 3.5);
            g.message =
              "Rewriting the sentence that explains the entire paper.";
          }
          if (action === "new" && g.papers.length < config.maxPapers) {
            if (g.researcher.energy < 10) {
              g.message = "Rest before beginning another manuscript.";
              return { game: g };
            }
            const next = makePaper(g);
            g.papers.push(next);
            g.activeId = next.id;
            g.effort = zero();
            g.pending = null;
            enter(g, "writing", 3.6);
            g.message = "Turning a promising idea into several open tabs.";
          }
          if (action === "file" && p.status !== "accepted") {
            enter(g, "filing", 2.6);
            g.message = "“Not forever. Just… not today.”";
          }
          if (action === "retrieve") {
            const target = g.papers.find(
              (x) => x.id === Number(value) && x.status === "dormant",
            );
            if (target) {
              g.activeId = target.id;
              g.effort = zero();
              g.pending = null;
              g.salientId = null;
              enter(g, "retrieving", 3);
              g.message = "“There might be something here after all.”";
            }
          }
          if (action === "select") {
            const target = g.papers.find(
              (x) => x.id === Number(value) && x.status !== "dormant",
            );
            if (target) {
              g.activeId = target.id;
              g.effort = zero();
              g.pending = null;
              g.phase = "ready";
              g.selectedJournal = target.target || g.selectedJournal;
            }
          }
          if (action === "rest") {
            enter(g, "resting", 2.2);
            g.message = "An afternoon outside. The inbox survives.";
          }
          return { game: g };
        }),
      tick: (dt) => {
        if (!get().game.started || idle(get().game)) return;
        set((s) => {
          const g = structuredClone(s.game);
          g.elapsed += dt * g.speed;
          const p = paper(g);
          if (g.elapsed < g.duration) return { game: g };
          if (g.phase === "throwing") {
            enter(
              g,
              "review",
              g.pending!.days
                ? 1.4
                : Math.max(
                    2.2,
                    g.pending!.months *
                      (config.reviewSecondsPerMonth + random(g) * 0.25),
                  ),
            );
            g.message = "“Maybe refreshing it one more time…”";
            return { game: g };
          }
          if (g.phase === "review") {
            receive(g, p, g.pending!);
            enter(g, "decision", 0);
          } else if (g.phase === "revising") {
            revise(g, p);
            enter(g, "ready", 0);
          } else if (g.phase === "writing") {
            advance(g.researcher, 2);
            g.researcher.energy = clamp(g.researcher.energy - 10);
            g.researcher.confidence = clamp(g.researcher.confidence + 8);
            g.message = "“This is actually pretty good.”";
            enter(g, "ready", 0);
          } else if (g.phase === "filing") {
            p.dormantStatus = p.status;
            p.status = "dormant";
            g.message =
              "Filed, not forgotten. You can retrieve it at any time.";
            enter(g, "ready", 0);
          } else if (g.phase === "retrieving") {
            p.status = p.dormantStatus || "draft";
            p.perception = Object.fromEntries(
              dimensions.map((d) => [d, clamp(p.perception[d] + 4)]),
            ) as typeof p.perception;
            g.researcher.confidence = clamp(g.researcher.confidence + 4);
            enter(g, "ready", 0);
          } else if (g.phase === "resting") {
            advance(g.researcher, 1);
            g.researcher.energy = clamp(g.researcher.energy + 28);
            g.researcher.patience = clamp(g.researcher.patience + 18);
            g.researcher.confidence = clamp(g.researcher.confidence + 7);
            g.message = "A clearer head. An equally full inbox.";
            enter(g, "ready", 0);
          }
          const dormant = g.papers.filter((x) => x.status === "dormant");
          if (dormant.length && random(g) < 0.35)
            g.salientId = dormant[Math.floor(random(g) * dormant.length)].id;
          return { game: g };
        });
      },
    }),
);
export const useGame = createGameStore();
