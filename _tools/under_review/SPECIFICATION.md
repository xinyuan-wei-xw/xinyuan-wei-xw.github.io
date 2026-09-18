# BUILD A COMPLETE PLAYABLE 3D WEB GAME

## Project Name

# UNDER REVIEW
### An Academic Publishing Game

**Tagline:**  
**Write. Submit. Revise. Hope. Repeat.**

Build a polished, humorous, emotionally relatable 3D browser game about the academic journal publication process.

The player controls a female academic researcher who writes manuscripts, chooses journals, submits papers, waits under review, receives editorial decisions, revises papers, redirects rejected manuscripts, occasionally abandons papers into the “File Drawer,” sometimes resurrects abandoned work, develops as a researcher, and gradually builds a publication record.

The game should be funny and exaggerated, but affectionate rather than cynical.

Researchers should recognize their own experiences in it:

- unreasonable optimism immediately after finishing a manuscript;
- anxiety while waiting under review;
- confidence collapsing after rejection;
- learning from journal feedback;
- becoming excited about a paper again after revision;
- repeatedly redirecting the same manuscript;
- giving up on a paper;
- later realizing an abandoned paper might be salvageable;
- becoming a stronger researcher even when publications do not immediately follow;
- discovering that journal fit matters in addition to manuscript quality;
- experiencing randomness in academic publishing.

The game must NOT imply that journal publication is determined purely by merit or purely by luck.

The central model is:

**Underlying manuscript quality + journal fit + journal selectivity + revision history + researcher development + stochasticity → editorial outcome**

---

# 1. CORE DESIGN PRINCIPLE

The central visual metaphor is:

## MANUSCRIPT = A DEFORMABLE 3D OBJECT

## JOURNAL = A DIFFERENTLY SHAPED 3D GATE

## SUBMISSION = PHYSICALLY THROWING THE MANUSCRIPT TOWARD THE JOURNAL

A manuscript is not necessarily spherical.

Its geometry represents its multidimensional academic profile.

A strong manuscript across all dimensions appears large, balanced, and relatively full.

An uneven manuscript appears asymmetrical.

For example:

- strong theory → one region protrudes;
- strong methods → another region protrudes;
- weak relevance → another region is recessed;
- weak writing/positioning → another region looks underdeveloped.

Journal gates also have different geometries.

Therefore:

**A bigger manuscript does NOT automatically fit a journal better.**

The game should visually communicate:

# QUALITY ≠ FIT

A somewhat smaller but appropriately shaped manuscript may fit a journal better than a larger but poorly matched manuscript.

---

# 2. TECHNOLOGY

Build this as a browser-based 3D game.

Preferred stack:

- React
- TypeScript
- Vite
- Three.js
- React Three Fiber
- @react-three/drei
- Rapier / @react-three/rapier for physics
- Zustand for state management
- Framer Motion for 2D UI transitions where useful

Do NOT require Unity, Unreal Engine, or external desktop software.

The game should run with:

```bash
npm install
npm run dev
```

Structure the code cleanly into:

- game state
- simulation logic
- manuscript model
- journal model
- researcher model
- probability/decision engine
- 3D rendering
- character animation
- UI/HUD
- sound manager
- configuration/data

Keep journal parameters and probability parameters in configuration files so they can later be changed without rewriting game logic.

Use procedural/simple geometry and original placeholder assets wherever possible.

Do not depend on copyrighted game assets.

---

# 3. ART DIRECTION

Use stylized, colorful, charming 3D graphics.

Target feeling:

**cute academic cartoon + polished indie browser game**

NOT photorealistic.

NOT childish.

NOT corporate dashboard aesthetics.

NOT dark/depressing.

The environment should feel warm and slightly absurd.

Use:

- soft rounded geometry;
- expressive character animation;
- gentle shadows;
- readable materials;
- slightly exaggerated physics;
- playful but professional typography;
- colorful manuscript objects;
- satisfying squash-and-stretch animation.

Use a pleasant academic-office color palette with warm neutrals plus restrained accent colors.

Do not overload the interface with colors.

The humor should primarily come from animation, timing, academic situations, and the contrast between researcher expectations and journal outcomes.

---

# 4. MAIN CHARACTER

The player character is a stylized female academic researcher.

Do not sexualize the character.

Use a broadly relatable cartoon academic appearance without strongly emphasizing race, age, or other identity categories.

She should have highly expressive body language.

Important animations:

- neutral idle;
- typing;
- reading;
- thinking;
- holding manuscript;
- examining manuscript;
- preparing submission;
- throwing manuscript;
- waiting;
- checking email;
- nervous pacing;
- excited reaction;
- disappointment;
- confusion;
- frustration;
- hands rotating/waving in front of body in disbelief;
- hands on hips;
- stomping;
- slumping at desk;
- walking to File Drawer;
- throwing manuscript away;
- retrieving manuscript;
- carefully dusting it off;
- revising;
- celebrating acceptance.

Do not make every rejection trigger the same animation.

Character reaction should depend on:

- confidence;
- patience;
- energy;
- previous rejection streak;
- importance of manuscript;
- time spent under review;
- type of decision.

---

# 5. RESEARCHER STATE

Maintain the following researcher variables internally on a 0–100 scale:

```ts
interface ResearcherState {
  researchSkill: number;
  experience: number;
  confidence: number;
  patience: number;
  energy: number;
  resilience: number;
  careerMonth: number;
  careerYear: number;
}
```

Important:

## Skill and confidence are NOT the same thing.

A researcher can become more skilled while simultaneously becoming less confident.

Example:

After three difficult rejection cycles:

Research Skill:
52 → 56 → 59 → 63

Confidence:
74 → 61 → 43 → 29

This tension is important.

The game should sometimes communicate:

**She is becoming a better researcher even when she does not feel like one.**

Do not explicitly preach this message. Let the mechanics demonstrate it.

---

# 6. MANUSCRIPT DIMENSIONS

Every manuscript has five primary dimensions:

1. Theory
2. Novelty
3. Methodological Rigor
4. Relevance
5. Writing & Positioning

Internally use 0–100 continuous values.

Example:

```ts
interface ManuscriptTrueState {
  theory: number;
  novelty: number;
  rigor: number;
  relevance: number;
  writing: number;
}
```

These values should NOT normally be shown directly to the player.

---

# 7. THREE DIFFERENT MANUSCRIPT STATES

This distinction is fundamental.

Every manuscript has:

## A. UNDERLYING STATE

The latent manuscript attributes used by the simulation.

The player never directly sees these exact values.

Example:

```text
Theory = 73
Novelty = 81
Rigor = 67
Relevance = 75
Writing = 62
```

---

## B. AUTHOR'S CURRENT PERCEPTION

What the researcher currently believes about the manuscript.

This is what the player sees.

Display it using five stars or five dots rather than precise numbers.

Example:

```text
AUTHOR'S CURRENT VIEW

Theory               ★★★★★
Novelty              ★★★★★
Methodological Rigor ★★★★☆
Relevance            ★★★★☆
Writing & Positioning★★★★☆
```

The 3D manuscript shape held by the researcher should primarily represent this perceived state.

---

## C. JOURNAL ASSESSMENT

When the manuscript passes through journal review, the journal produces a noisy assessment based on:

- underlying manuscript state;
- journal priorities;
- manuscript-journal fit;
- stochastic evaluation noise.

The journal assessment may differ from both true state and author perception.

The journal assessment should NOT permanently become “objective truth.”

It is information.

---

# 8. PERCEPTION AND CONFIDENCE

Author perception should change through:

- finishing a manuscript;
- submission;
- journal feedback;
- rejection;
- R&R;
- revision;
- acceptance;
- researcher experience.

Immediately after finishing a paper, researchers may temporarily overestimate it.

Example animation:

The researcher finishes writing.

Leans backward.

Looks proudly at the screen.

The manuscript grows slightly larger and glows.

Small thought/dialogue:

> “This is actually pretty good.”

After rejection, confidence may fall sharply.

The perceived manuscript may visibly shrink.

Example:

Before submission:

```text
Theory    ★★★★★
Novelty   ★★★★★
Rigor     ★★★★☆
```

After rejection:

```text
Theory    ★★★☆☆
Novelty   ★★☆☆☆
Rigor     ★★★☆☆
```

But the underlying manuscript state has NOT necessarily deteriorated.

This distinction is essential.

---

# 9. 3D MANUSCRIPT GEOMETRY

Create manuscript geometry procedurally.

Start from an approximately spherical mesh.

Define five directional regions corresponding to:

- Theory
- Novelty
- Rigor
- Relevance
- Writing/Positioning

Modify vertex radius according to each dimension.

Conceptually:

```text
radius(direction) =
baseRadius
+ weightedContribution(theory)
+ weightedContribution(novelty)
+ weightedContribution(rigor)
+ weightedContribution(relevance)
+ weightedContribution(writing)
```

Smooth transitions between regions.

High balanced scores:

→ large, full, approximately balanced object.

Uneven scores:

→ asymmetric blob.

Animate transitions between manuscript states using interpolation rather than instantly replacing geometry.

Use squash-and-stretch during:

- throwing;
- collision;
- journal review;
- rejection;
- revision;
- acceptance.

---

# 10. JOURNALS

Use recognizable AIS / Information Systems journal names as text labels in the prototype.

Examples can include:

- MIS Quarterly (MISQ)
- Information Systems Research (ISR)
- Journal of the Association for Information Systems (JAIS)
- Journal of Management Information Systems (JMIS)
- European Journal of Information Systems (EJIS)
- Information Systems Journal (ISJ)
- Journal of Strategic Information Systems (JSIS)
- Journal of Information Technology (JIT)

IMPORTANT:

Do not use publisher logos, journal logos, trademarked graphical branding, copied website designs, or cover artwork.

Use plain text journal names inside original fictional visual gate designs.

Create all journal parameters in:

```text
src/data/journals.ts
```

so they can easily be changed later.

Journal preference weights used in the prototype must be clearly treated as GAME DESIGN PARAMETERS, not factual claims about what specific journals objectively value.

Do not display claims such as:

“MISQ cares about theory more than ISR”

unless later supplied with verified empirical evidence.

For now, create reasonable fictionalized/demo differences and label them internally as simulation parameters.

---

# 11. JOURNAL GATES

Each journal appears as a 3D submission gate.

Journal gates should differ in shape.

Gate geometry reflects journal preference weights.

Do NOT simply represent prestigious journals as smaller holes.

Different gates should require different profiles.

A manuscript may therefore:

- fit one journal smoothly;
- clip another gate;
- become partially stuck;
- bounce from another.

The physical metaphor should communicate multidimensional fit.

---

# 12. JOURNAL SELECTIVITY

Each journal has a baseline selectivity parameter.

Example structure:

```ts
interface Journal {
  id: string;
  name: string;

  preferenceWeights: {
    theory: number;
    novelty: number;
    rigor: number;
    relevance: number;
    writing: number;
  };

  selectivity: number;

  reviewSpeed: {
    minMonths: number;
    maxMonths: number;
  };
}
```

Do NOT hard-code unsupported real acceptance rates as facts.

Design the system so verified acceptance-rate estimates can later be inserted.

For MVP, clearly comment:

```ts
// Simulation placeholder. Not an official journal acceptance rate.
```

---

# 13. SUBMISSION

The player selects:

**SUBMIT**

The researcher physically picks up the manuscript.

She examines it.

She prepares.

She throws it toward the selected journal gate.

Camera briefly follows the manuscript.

Use satisfying trajectory and physics.

Player skill should NOT determine publication outcome.

The throwing mechanic is visual storytelling, not an arcade accuracy test.

The manuscript should automatically travel approximately toward the target.

---

# 14. JOURNAL REVIEW FIELD

Before reaching the journal gate, the manuscript passes through a subtle translucent zone:

# JOURNAL REVIEW

During this moment:

- time slows briefly;
- manuscript becomes semi-transparent;
- its shape morphs from Author Perception toward Journal Assessment;
- journal assessment indicators briefly appear.

Example:

Author thinks:

```text
Theory ★★★★★
Rigor  ★★★★☆
```

Journal assessment:

```text
Theory ★★★☆☆
Rigor  ★★★★☆
```

The huge confident manuscript suddenly becomes smaller/asymmetric.

Then:

**BONK**

It hits the journal gate.

This should be one of the game's signature visual jokes.

Sometimes the reverse should happen:

The author believes a repeatedly rejected manuscript is weak.

Journal assessment is unexpectedly favorable.

The object expands slightly.

The researcher looks surprised.

---

# 15. EDITORIAL OUTCOMES

Use these primary outcomes:

1. Desk Reject
2. Reject After Review
3. Major Revision
4. Minor Revision
5. Accept

Possible later expansion:

- Conditional Accept
- Withdraw
- Reject & Resubmit

For MVP, use the five outcomes above.

---

# 16. PHYSICAL OUTCOME METAPHORS

## Desk Reject

The manuscript barely enters the journal process.

It gets immediately slapped/bounced back.

Fast animation.

---

## Reject After Review

The manuscript reaches the gate.

It hits one or several areas.

It bounces around.

Eventually falls back toward the researcher.

---

## Major Revision

The manuscript becomes partially stuck in the gate.

For a moment it looks promising.

Then the journal gate ejects it.

Display:

# MAJOR REVISION

The researcher catches it.

---

## Minor Revision

The manuscript almost passes through.

It hangs awkwardly near the opening.

Small adjustment is clearly needed.

Display:

# MINOR REVISION

---

## Accept

The manuscript passes through.

Use satisfying sound and animation.

The gate lights subtly.

The researcher pauses in disbelief for a fraction of a second, then celebrates.

Display:

# ACCEPTED

Avoid excessive fireworks.

Keep the humor academic rather than mobile-game casino-like.

---

# 17. RANDOM REVIEW WAITING TIME

Review duration is an important mechanic.

When submitted, display:

# UNDER REVIEW...

Do NOT always return a decision immediately.

Generate simulated review duration based on journal review-speed parameters and decision type.

Example:

```text
Under Review
Month 1...
Month 2...
Month 3...
```

The waiting animation should use accelerated simulated time.

Actual player waiting should normally be seconds, not real minutes.

For example:

```text
1 simulated month = 0.5–1.5 real seconds
```

Randomize this.

Possible examples:

Desk Reject:

```text
2 simulated days
11 simulated days
27 simulated days
```

Full review:

```text
2 months
4 months
7 months
11 months
```

Occasionally create painfully long reviews.

Long waiting periods should affect:

- patience;
- energy;
- confidence;
- career clock.

The researcher should react during waiting.

Possible animations:

- refreshing email;
- checking phone;
- working on another manuscript;
- drinking coffee;
- pacing;
- forgetting about submission;
- suddenly receiving decision email.

Use comedic timing.

Example:

After simulated 9 months:

**DING**

Researcher runs to computer.

Decision:

# REJECT

She stares silently.

Long pause.

Then frustrated animation.

Long review + rejection should generally hurt more emotionally than a quick desk rejection.

---

# 18. JOURNAL FEEDBACK

Do NOT model individual reviewers in MVP.

Use:

# JOURNAL REVIEW

Generate 2–4 concise feedback items.

Example:

```text
STRENGTH
Strong empirical execution.

CONCERN
The theoretical contribution requires further development.

CONCERN
The manuscript needs clearer positioning.

DECISION
MAJOR REVISION
```

Feedback should correspond to manuscript attributes and journal assessment.

Feedback provides information.

It should update Author Perception toward a better-informed estimate.

But journal feedback remains noisy rather than absolute truth.

---

# 19. REVISION

After receiving feedback, allow the player to revise.

Provide limited:

# REVISION POINTS

Example:

```text
Available Revision Effort: 12

Theory                ++++
Novelty               +
Methodological Rigor  ++
Relevance             +
Writing & Positioning ++++
```

Player allocates effort.

Revision should:

1. improve underlying manuscript attributes probabilistically;
2. improve fit with the journal when targeted appropriately;
3. increase researcher experience;
4. consume energy;
5. consume simulated career time.

Animate revision.

Researcher sits at desk.

Possible sequence:

- typing;
- reading;
- deleting;
- rewriting;
- coffee;
- nighttime;
- sunrise;
- stretching;
- manuscript slowly reshaping beside desk.

At completion, researcher examines manuscript.

Confidence may increase.

Small dialogue:

> “Okay... now this is good.”

---

# 20. RESUBMISSION

If decision is Major Revision or Minor Revision:

Offer:

# RESUBMIT

The researcher throws the revised manuscript toward the same journal.

The manuscript retains revision history.

R&R status should materially improve continuation probability, but acceptance must never be guaranteed.

Possible sequence:

```text
Major Revision
→ Major Revision
→ Minor Revision
→ Accept
```

But also allow painful outcomes such as:

```text
Major Revision
→ Reject
```

These should be uncommon enough not to make the game feel arbitrary, but possible.

---

# 21. REDIRECTION AFTER REJECTION

After rejection allow:

### REVISE & REDIRECT

Player chooses another journal.

The manuscript keeps:

- underlying improvements;
- review history;
- accumulated information;
- author perception;
- emotional history.

Journal fit changes based on target.

A paper rejected by one journal may fit another much better.

---

# 22. FILE DRAWER

Instead of calling it Trash, prominently label the physical wastebasket/storage area:

# FILE DRAWER

If patience/confidence becomes sufficiently low, or the player chooses:

# ABANDON FOR NOW

Trigger animation:

Researcher looks at manuscript.

Looks exhausted/frustrated.

Walks toward File Drawer.

Opens it.

Throws manuscript inside.

**THUD.**

Possible small text:

> “Three years of my life.”

Do not permanently delete the manuscript.

Store it as dormant.

---

# 23. MANUSCRIPT RESURRECTION

Dormant manuscripts have a probability of becoming salient later.

Possible triggers:

- researcher skill increases;