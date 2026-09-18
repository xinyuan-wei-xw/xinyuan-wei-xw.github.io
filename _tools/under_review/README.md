# UNDER REVIEW

**An Academic Publishing Game**  
Write. Submit. Revise. Hope. Repeat.

A standalone English-language 3D browser game. This is separate from the earlier
`homepage_Xinyuan` / Becoming a Researcher prototype, which remains unchanged.

## Run

Requires Node.js 22.12+ (or a compatible current LTS) and npm.

```sh
npm install
npm run dev
```

Open the URL Vite prints (normally http://127.0.0.1:5173).

```sh
npm test
npm run build
npm run preview
```

`dist/` contains a static, self-contained build with relative asset paths. It can
later be hosted beneath a Lab route; no backend, account, token, or paid API is
required. This project is not automatically published by the homepage workflow.

## Play

Enter the office, inspect your manuscript's perceived profile, choose a journal,
and submit. The automatic throw passes through a review field. Its assessment
can differ from the author's view. Wait a few seconds for a simulated editorial
letter. Revise with up to twelve effort points, redirect rejected work, or set it
aside in the File Drawer. Rest to recover energy. Retrieve dormant papers any
time; occasional reminders make them salient again. Write new manuscripts and
build a publication shelf. A career notebook records decisions.

Sound is optional. Speed can be doubled and character/camera motion reduced.
Rotate the scene by dragging; scroll to zoom. Ordinary HTML controls operate all
mechanics and remain available if WebGL initialization fails.

## Model

- **Underlying attributes**: theory, novelty, rigor, relevance, writing; not exposed
  numerically in the player interface.
- **Author perception**: biased, confidence-sensitive estimates shown as dots and
  manuscript geometry. Rejection never reduces the underlying attributes.
- **Journal assessment**: a noisy observation, not an objective replacement for
  the paper's quality.
- Outcomes combine weighted quality, normalized profile fit, fictional
  selectivity, development, revision history, continuation status, and chance.
- All five decisions are possible. R&R improves continuation but never guarantees
  publication. Targeted revision consumes energy/time and yields variable gains.
- Skill and confidence can diverge. Resource exhaustion cannot soft-lock a career:
  taking a break is always available between actions.

## Structure

| Location                   | Purpose                                                           |
| -------------------------- | ----------------------------------------------------------------- |
| `src/models/types.ts`      | Manuscript, journal, researcher, and phase models                 |
| `src/data/journals.ts`     | Eight journal labels with editable demo profiles                  |
| `src/data/config.ts`       | Effort, timing, noise, probability, and title settings            |
| `src/simulation/engine.ts` | Pure editorial, perception, revision, and career logic            |
| `src/state/store.ts`       | Zustand state machine and browser persistence                     |
| `src/scene/Manuscript.tsx` | Smoothly deforming five-region sphere mesh                        |
| `src/scene/Character.tsx`  | Procedural female academic and contextual poses                   |
| `src/scene/Office.tsx`     | Original office, shaped gates, review field, flight, camera       |
| `src/ui/`                  | React workbench, feedback, allocation, shelf, responsive styles   |
| `src/audio/sound.ts`       | Original synthesized sounds using Web Audio                       |
| `tests/`                   | Simulation invariants, probability checks, state-machine journeys |

## Implementation boundaries

The scene uses Three.js / React Three Fiber / Drei. Flight, bounce, squash, and
camera behavior are authored kinematics rather than a Rapier rigid-body solver.
Editorial results are determined by the simulation before flight, never by aim or
collision accuracy. Gates illustrate fit; their meshes are not a physical
acceptance algorithm. Procedural poses provide animation without a downloaded
character rig. This first version handles one active review at a time and up to
12 manuscripts per career. There are no individual reviewers or online services.

The supplied specification ends partway through section 23 (resurrection).
Manual retrieval plus skill/rest-cycle reminders implement that incomplete
section without assuming unspecified later requirements.

## Data, originality, and attribution

All game scenarios, geometry, character, and sounds are original procedural work.
Real journals appear only as plain text names. Their weights, selectivity, and
speeds are **fictional game settings**, not official acceptance rates, policies,
or measured journal preferences. No journal or publisher endorses the game.

Software dependencies are listed in `package.json` / `package-lock.json` with
their upstream licenses. Icons: Lucide (ISC). No remote fonts, textures, models,
or audio files are needed at runtime.

Progress lives in localStorage under `under-review-v1`. Resetting a career asks
for confirmation. No gameplay data is sent to a server. Clear browser site data
to remove the save. Review draws and in-flight state are saved to prevent
refreshing from rerolling editorial decisions.
