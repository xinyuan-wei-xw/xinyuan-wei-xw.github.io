import { reviewCycles } from "../data/reviewCycles";
import { reviewStage } from "../simulation/engine";
import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowUpRight,
  BookOpen,
  Archive,
  Feather,
  Send,
  RotateCcw,
  Volume2,
  VolumeX,
  Coffee,
  Plus,
  Minus,
  ChevronDown,
  Info,
  Check,
  FastForward,
  Accessibility,
  X,
} from "lucide-react";
const Office = lazy(() =>
  import("../scene/Office").then((m) => ({ default: m.Office })),
);
import { useGame } from "../state/store";
import { dimensions, labels, type Profile } from "../models/types";
import { journals } from "../data/journals";
import { config } from "../data/config";
import { sound } from "../audio/sound";
class SceneBoundary extends Component<
  { children: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <div className="scene-fallback">
        <BookOpen size={44} />
        <h2>The office needs WebGL.</h2>
        <p>
          Try a browser with hardware acceleration. All manuscript controls
          still work below.
        </p>
      </div>
    ) : (
      this.props.children
    );
  }
}
function Dots({ value }: { value: number }) {
  const count = Math.max(1, Math.min(5, Math.ceil(value / 20)));
  return (
    <span className="dots" aria-label={`${count} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={i < count ? "filled" : ""} />
      ))}
    </span>
  );
}
function Bars({ profile }: { profile: Profile }) {
  return (
    <div className="profile">
      {dimensions.map((d) => (
        <div key={d}>
          <span>{labels[d]}</span>
          <Dots value={profile[d]} />
        </div>
      ))}
    </div>
  );
}
export default function App() {
  const tick = useGame((s) => s.tick);
  const g = useGame((s) => s.game),
    act = useGame((s) => s.act),
    allocate = useGame((s) => s.allocate);
  const [tab, setTab] = useState<"paper" | "journal" | "drawer">("paper");
  const [help, setHelp] = useState(false),
    [reset, setReset] = useState(false);
  const p = g.papers.find((x) => x.id === g.activeId)!,
    j = journals.find((x) => x.id === g.selectedJournal)!;
  const busy = !["ready", "decision"].includes(g.phase);
  const last = p.history.at(-1);
  const dormant = g.papers.filter((x) => x.status === "dormant");
  const accepted = g.papers.filter((x) => x.status === "accepted");
  const totalEffort = dimensions.reduce((s, d) => s + g.effort[d], 0);
  const isRevision = p.status === "revision" && p.target === j.id;
  const needsRevision = isRevision && p.revision === (last?.revision ?? 0);
  const needsRedirect = p.status === "rejected" && p.target === j.id;
  const canWork = p.status !== "accepted" && p.status !== "dormant";
  useEffect(() => {
    let previous = performance.now();
    const timer = setInterval(() => {
      const now = performance.now();
      tick(Math.min((now - previous) / 1000, 0.3));
      previous = now;
    }, 100);
    return () => clearInterval(timer);
  }, [tick]);
  useEffect(() => {
    if (!g.sound) return;
    if (g.phase === "throwing") sound("throw");
    if (g.phase === "decision")
      sound(
        p.status === "accepted"
          ? "accept"
          : p.status === "rejected"
            ? "bonk"
            : "mail",
      );
    if (g.phase === "filing") sound("drawer");
  }, [g.phase]);
  const doAct = (a: string, v?: number | string) => {
    if (g.sound) sound("click");
    act(a, v);
    if (
      ["submit", "revise", "new", "file", "retrieve", "rest"].includes(a) &&
      window.innerWidth <= 760
    ) {
      document.querySelector(".world-card")?.scrollIntoView({
        behavior: g.reducedMotion ? "instant" : "smooth",
        block: "start",
      });
    }
  };
  const phaseLabel = {
    ready:
      p.status === "dormant"
        ? "ON THE BACK BURNER"
        : p.status === "accepted"
          ? "A SMALL, VERY BIG MOMENT"
          : "BACK AT THE DESK",
    writing: "A NEW MANUSCRIPT",
    throwing: "A LEAP OF ACADEMIC FAITH",
    review: g.pending
      ? reviewStage(g.pending, g.elapsed / g.duration).toUpperCase()
      : "UNDER REVIEW…",
    decision:
      last?.outcome === "Accept"
        ? "ACCEPTED"
        : last?.outcome.toUpperCase() || "DECISION ARRIVED",
    revising: "REVISING THE REVISION",
    filing: "FILED, NOT FORGOTTEN",
    retrieving: "A SECOND LOOK",
    resting: "AWAY FROM THE INBOX",
  }[g.phase];
  const waiting = g.phase === "review" && g.pending;
  const waitLabel = waiting
    ? g.pending!.days
      ? `Day ${Math.max(1, Math.ceil((g.pending!.days * g.elapsed) / g.duration))}`
      : `Month ${Math.max(1, Math.ceil((g.pending!.months * g.elapsed) / g.duration))}`
    : "";
  return (
    <div className="app-shell">
      <nav className="lab-navigation" aria-label="Return to website">
        <a href="https://xinyuan-wei-xw.github.io/lab/">
          <span aria-hidden="true">←</span> Back to Lab
        </a>
      </nav>
      <header className="mast">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setHelp(true);
          }}
        >
          <span className="brand-icon">
            <Feather size={22} />
          </span>
          <span>
            UNDER REVIEW<small>AN ACADEMIC PUBLISHING GAME</small>
          </span>
        </a>
        <div className="header-right">
          <span className="saved">
            Current session only
          </span>
          <button
            className="icon-button"
            aria-label={g.sound ? "Mute sound" : "Enable sound"}
            title="Sound"
            onClick={() => {
              act("sound");
              if (!g.sound) sound("click");
            }}
          >
            {g.sound ? <Volume2 size={19} /> : <VolumeX size={19} />}
          </button>
          <button
            className="icon-button"
            aria-label="How to play"
            onClick={() => setHelp(true)}
          >
            <Info size={19} />
          </button>
        </div>
      </header>
      <main>
        <div className="page-intro">
          <div>
            <span className="eyebrow">
              A LITTLE OFFICE. A LOT OF POSSIBILITY.
            </span>
            <h1>
              Write. Submit. Revise.
              <br />
              <em>Hope.</em> Repeat.
            </h1>
          </div>
          <div className="career-stamp">
            <span>YOUR RESEARCH CAREER</span>
            <strong>
              Year {g.researcher.careerYear} <i>/</i> Month{" "}
              {g.researcher.careerMonth}
            </strong>
            <small>
              {accepted.length} publication{accepted.length !== 1 ? "s" : ""} ·{" "}
              {g.papers.length} manuscript{g.papers.length !== 1 ? "s" : ""}
            </small>
          </div>
        </div>
        <div className="game-grid">
          <section className="world-card" aria-label="Your academic office">
            <div className="world-top">
              <span>
                <i className={busy ? "live busy" : "live"} />
                {phaseLabel}
              </span>
              <span className="edition">FIELD NOTES / 01</span>
            </div>
            <div className="scene">
              <SceneBoundary>
                <Suspense
                  fallback={
                    <div className="scene-fallback">Opening the office…</div>
                  }
                >
                  <Office />
                </Suspense>
              </SceneBoundary>
            </div>
            <div className="scene-caption" aria-live="polite">
              <span className="quote-mark">“</span>
              <p>{g.message.replace(/[“”]/g, "")}</p>
              {waitLabel && (
                <strong className="wait-pill">
                  {waitLabel}
                  <span>simulated time</span>
                </strong>
              )}
            </div>
            <div className="scene-tools">
              <span>Drag to look around · Scroll to zoom</span>
              <div>
                <button
                  className={g.reducedMotion ? "active" : ""}
                  onClick={() => act("motion")}
                  aria-pressed={g.reducedMotion}
                >
                  <Accessibility size={14} /> Less motion
                </button>
                <button
                  onClick={() => act("speed")}
                  aria-label="Toggle animation speed"
                >
                  <FastForward size={14} />
                  {g.speed}×
                </button>
              </div>
            </div>
            {busy && (
              <div
                className="phase-progress"
                role="progressbar"
                aria-label={phaseLabel}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round((g.elapsed / g.duration) * 100)}
              >
                <i
                  style={{
                    width: `${Math.min(100, (g.elapsed / g.duration) * 100)}%`,
                  }}
                />
              </div>
            )}
            {!g.started && (
              <div className="welcome-overlay">
                <div>
                  <span className="eyebrow">
                    WELCOME TO THE PUBLICATION PROCESS
                  </span>
                  <h2>
                    Your paper has potential.
                    <br />
                    So do you.
                  </h2>
                  <p>
                    Shape your manuscript. Find its audience.
                    <br />
                    Survive an inbox with excellent comic timing.
                  </p>
                  <button className="primary" onClick={() => doAct("start")}>
                    Enter the office <ArrowUpRight size={19} />
                  </button>
                  <small>
                    Single player · No aiming required · Refresh starts a new game
                  </small>
                </div>
              </div>
            )}
          </section>
          <aside className="workbench">
            <div className="tabs" role="tablist" aria-label="Workbench">
              <button
                role="tab"
                aria-selected={tab === "paper"}
                onClick={() => setTab("paper")}
              >
                <BookOpen size={16} />
                Manuscript
              </button>
              <button
                role="tab"
                aria-selected={tab === "journal"}
                onClick={() => setTab("journal")}
              >
                <Send size={15} />
                Journals
              </button>
              <button
                role="tab"
                aria-selected={tab === "drawer"}
                onClick={() => setTab("drawer")}
              >
                <Archive size={16} />
                Drawer <small>{dormant.length}</small>
              </button>
            </div>
            <div className="panel" role="tabpanel">
              {tab === "paper" && (
                <>
                  <div className="paper-heading">
                    <span className="eyebrow">
                      MANUSCRIPT {String(p.id).padStart(2, "0")}{" "}
                      <span>· REVISION {p.revision}</span>
                    </span>
                    <h2>{p.title}</h2>
                    <div className={`status-tag ${p.status}`}>
                      {p.status === "draft"
                        ? "Ready for its next chapter"
                        : p.status === "revision"
                          ? "Revision invited"
                          : p.status === "accepted"
                            ? "Published"
                            : p.status === "dormant"
                              ? "Resting in the File Drawer"
                              : "Rejected, not erased"}
                    </div>
                  </div>
                  <div className="section-label">
                    AUTHOR’S CURRENT VIEW{" "}
                    <span title="Perception is not underlying manuscript quality.">
                      Not objective truth
                    </span>
                  </div>
                  <Bars profile={p.perception} />
                  {g.phase === "review" && g.pending && (
                    <div className="assessment">
                      <div className="section-label">
                        JOURNAL’S VIEW <span>One noisy assessment</span>
                      </div>
                      <Bars profile={g.pending.assessment} />
                    </div>
                  )}
                  {last && g.phase !== "review" && (
                    <div className="feedback">
                      <div className="section-label">
                        LATEST LETTER{" "}
                        <span>
                          {journals
                            .find((x) => x.id === last.journalId)!
                            .id.toUpperCase()}{" "}
                          ·{" "}
                          {last.days
                            ? `${last.days} days`
                            : `${last.months} months`}
                        </span>
                      </div>
                      <h3>
                        {last.outcome === "Accept"
                          ? "Accepted. Really."
                          : last.outcome}
                      </h3>
                      {last.feedback.map((f, i) => (
                        <p key={i}>
                          <b className={f.kind.toLowerCase()}>{f.kind}</b>
                          {f.text}
                        </p>
                      ))}
                      <small>
                        Feedback is information, not a final measurement of your
                        work.
                      </small>
                    </div>
                  )}
                  {canWork && g.started && (
                    <details className="revision-box">
                      <summary>
                        Shape the next revision{" "}
                        <span>
                          {totalEffort}/{p.revisionBudget} effort{" "}
                          <ChevronDown size={14} />
                        </span>
                      </summary>
                      <p>
                        <b>{p.revisionContext}:</b> {p.revisionBudget} effort
                        points are available this round. Target the concerns that
                        matter. Improvements vary; no allocation guarantees
                        acceptance.
                      </p>
                      {dimensions.map((d) => (
                        <div className="effort-row" key={d}>
                          <span>{labels[d]}</span>
                          <button
                            aria-label={`Decrease ${labels[d]}`}
                            disabled={busy || g.effort[d] === 0}
                            onClick={() => allocate(d, -1)}
                          >
                            <Minus size={13} />
                          </button>
                          <b>{g.effort[d]}</b>
                          <button
                            aria-label={`Increase ${labels[d]}`}
                            disabled={
                              busy || totalEffort >= p.revisionBudget
                            }
                            onClick={() => allocate(d, 1)}
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      ))}
                      <button
                        className="secondary full"
                        disabled={
                          busy ||
                          !totalEffort ||
                          g.researcher.energy < totalEffort * 1.6
                        }
                        onClick={() => doAct("revise")}
                      >
                        Revise manuscript · {Math.ceil(totalEffort * 1.6)}{" "}
                        energy
                      </button>
                      {g.researcher.energy < totalEffort * 1.6 && (
                        <p>Take a break to recover energy first.</p>
                      )}
                    </details>
                  )}
                  <div className="target">
                    <span>YOUR NEXT AUDIENCE</span>
                    <button disabled={busy} onClick={() => setTab("journal")}>
                      {j.id.toUpperCase()} <ArrowUpRight size={15} />
                    </button>
                  </div>
                  {p.status === "dormant" ? (
                    <button
                      className="primary full"
                      disabled={busy || !g.started}
                      onClick={() => doAct("retrieve", p.id)}
                    >
                      Dust it off <Archive size={17} />
                    </button>
                  ) : p.status === "accepted" ? (
                    <div className="accepted-note">
                      <Check size={22} />
                      On the publication shelf. You earned a quiet celebration.
                    </div>
                  ) : (
                    <button
                      className="primary full"
                      disabled={busy || !g.started || needsRevision}
                      onClick={() =>
                        needsRedirect ? setTab("journal") : doAct("submit")
                      }
                    >
                      {needsRedirect
                        ? "Choose another journal"
                        : isRevision
                          ? "Resubmit"
                          : last
                            ? "Redirect manuscript"
                            : "Submit manuscript"}{" "}
                      <Send size={17} />
                    </button>
                  )}
                  {needsRevision && !busy && (
                    <p className="micro">
                      Complete a revision before returning to this journal—or
                      choose a different audience.
                    </p>
                  )}
                  <div className="paper-actions">
                    <button
                      disabled={busy || !g.started || !canWork}
                      onClick={() => doAct("file")}
                    >
                      <Archive size={15} />
                      Abandon for now
                    </button>
                    <button
                      disabled={busy || !g.started}
                      onClick={() => doAct("rest")}
                    >
                      <Coffee size={16} />
                      Take a break
                    </button>
                  </div>
                </>
              )}
              {tab === "journal" && (
                <>
                  <span className="eyebrow">FIND YOUR PAPER’S AUDIENCE</span>
                  <h2>Quality ≠ fit.</h2>
                  <p className="panel-intro">
                    Different gates, different profiles. The biggest manuscript
                    is not always the best match.
                  </p>
                  <div className="demo-note">
                    Real journal names. Simulated priorities and selectivity.
                    Process-informed timing with random delays. No affiliation
                    or endorsement.
                  </div>
                  <details className="revision-box">
                    <summary>Review-cycle basis · {j.id.toUpperCase()}</summary>
                    <p>
                      {reviewCycles[j.id as keyof typeof reviewCycles].note}
                    </p>
                    <a
                      href={reviewCycles[j.id as keyof typeof reviewCycles].url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Journal source ↗
                    </a>
                    <p>
                      Timing luck affects reviewer availability and delays.
                      Assessment luck remains separate; neither changes the
                      paper’s underlying quality.
                    </p>
                  </details>
                  <div className="journal-list">
                    {journals.map((journal) => (
                      <button
                        disabled={busy || !g.started}
                        key={journal.id}
                        className={selected(journal.id)}
                        onClick={() => {
                          doAct("journal", journal.id);
                          setTab("paper");
                        }}
                      >
                        <span
                          className="journal-badge"
                          style={{ background: journal.color }}
                        >
                          {journal.id.toUpperCase()}
                        </span>
                        <span>
                          <strong>{journal.name}</strong>
                          <small>
                            Demo emphasis:{" "}
                            {dimensions
                              .slice()
                              .sort(
                                (a, b) =>
                                  journal.preferenceWeights[b] -
                                  journal.preferenceWeights[a],
                              )
                              .slice(0, 2)
                              .map((d) => labels[d])
                              .join(" + ")}
                          </small>
                        </span>
                        {j.id === journal.id ? (
                          <Check size={17} />
                        ) : (
                          <ArrowUpRight size={15} />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {tab === "drawer" && (
                <>
                  <span className="eyebrow">A PAUSE, NOT A PERIOD</span>
                  <h2>The File Drawer.</h2>
                  <p className="panel-intro">
                    Some ideas need time. Nothing here is deleted.
                  </p>
                  {dormant.length === 0 ? (
                    <div className="empty-drawer">
                      <Archive size={36} />
                      <p>Room for unfinished business.</p>
                      <small>
                        Use “Abandon for now” to set a manuscript aside.
                      </small>
                    </div>
                  ) : (
                    dormant.map((paper) => (
                      <div className="drawer-paper" key={paper.id}>
                        <span className="eyebrow">
                          MANUSCRIPT {paper.id} · {paper.history.length}{" "}
                          DECISIONS
                        </span>
                        <h3>{paper.title}</h3>
                        <p>
                          Revision {paper.revision}. All improvements and
                          history preserved.
                        </p>
                        <button
                          className="secondary"
                          disabled={busy || !g.started}
                          onClick={() => {
                            doAct("retrieve", paper.id);
                            setTab("paper");
                          }}
                        >
                          Take another look <ArrowUpRight size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </aside>
        </div>
        {g.salientId && (
          <div className="salient">
            <Archive size={18} />
            <p>
              An old idea has come back to mind. With what you know now, it
              might deserve another look.
            </p>
            <button onClick={() => setTab("drawer")}>Open File Drawer →</button>
          </div>
        )}
        <section className="researcher-card">
          <div className="researcher-intro">
            <span className="eyebrow">THE PERSON BEHIND THE PAPER</span>
            <h2>Meet your researcher.</h2>
            <p>
              She is building her career. Skill and confidence don’t always move
              together.
            </p>
          </div>
          <div className="researcher-meters">
            {(
              [
                "researchSkill",
                "confidence",
                "energy",
                "patience",
                "experience",
                "resilience",
              ] as const
            ).map((k) => (
              <div className="meter" key={k}>
                <div>
                  <span>
                    {
                      {
                        researchSkill: "Research skill",
                        confidence: "Confidence",
                        energy: "Energy",
                        patience: "Patience",
                        experience: "Experience",
                        resilience: "Resilience",
                      }[k]
                    }
                  </span>
                  <b>{Math.round(g.researcher[k])}</b>
                </div>
                <div className="meter-track">
                  <i
                    style={{
                      width: `${g.researcher[k]}%`,
                      background:
                        k === "confidence"
                          ? "#c08e63"
                          : k === "energy"
                            ? "#8b9e76"
                            : "#4f827b",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="portfolio">
          <div className="portfolio-heading">
            <div>
              <span className="eyebrow">YOUR BODY OF WORK</span>
              <h2>Every paper has a story.</h2>
            </div>
            <button
              className="secondary"
              disabled={
                busy ||
                !g.started ||
                g.papers.length >= config.maxPapers ||
                g.researcher.energy < 10
              }
              onClick={() => {
                doAct("new");
                setTab("paper");
              }}
            >
              <Plus size={16} />
              Write a new paper
            </button>
          </div>
          <div className="paper-shelf">
            {g.papers.map((paper) => (
              <button
                key={paper.id}
                disabled={busy || !g.started}
                className={
                  "shelf-paper " + (paper.id === p.id ? "selected" : "")
                }
                onClick={() => {
                  if (paper.status === "dormant") {
                    setTab("drawer");
                  } else {
                    doAct("select", paper.id);
                    setTab("paper");
                  }
                }}
              >
                <span style={{ background: paper.color }} />
                <div>
                  <small>
                    #{String(paper.id).padStart(2, "0")} ·{" "}
                    {paper.status === "accepted"
                      ? "ACCEPTED"
                      : paper.status.toUpperCase()}
                  </small>
                  <strong>{paper.title}</strong>
                  <small>
                    {paper.history.length} decision
                    {paper.history.length !== 1 ? "s" : ""} · {paper.revision}{" "}
                    revision{paper.revision !== 1 ? "s" : ""}
                  </small>
                </div>
              </button>
            ))}
          </div>
          {g.papers.length >= config.maxPapers && (
            <p className="micro">
              Your 12-paper notebook is full. Revisit an existing paper or start
              a new career.
            </p>
          )}
        </section>
        <details className="career-log">
          <summary>
            Your career notebook <ChevronDown size={14} />
          </summary>
          {g.log.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </details>
      </main>
      <footer>
        <span>
          UNDER REVIEW <i>·</i> Original game prototype by Xinyuan Wei
        </span>
        <div>
          <a href="https://xinyuan-wei-xw.github.io/lab/">Back to Lab</a>
          <button onClick={() => setHelp(true)}>About the simulation</button>
          <button onClick={() => setReset(true)}>New career</button>
        </div>
      </footer>
      {(help || reset) && (
        <div className="modal-backdrop">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="modal"
          >
            <button
              className="close"
              aria-label="Close dialog"
              onClick={() => {
                setHelp(false);
                setReset(false);
              }}
            >
              <X />
            </button>
            <span className="eyebrow">UNDER REVIEW</span>
            <h2 id="modal-title">
              {reset
                ? "Begin again?"
                : "A little uncertainty. A lot of growth."}
            </h2>
            {reset ? (
              <>
                <p>
                  This restarts the current game, including its
                  File Drawer.
                </p>
                <button
                  className="primary"
                  onClick={() => {
                    useGame.getState().reset();
                    setReset(false);
                    setTab("paper");
                  }}
                >
                  Start a new career <RotateCcw size={17} />
                </button>
                <button className="secondary" onClick={() => setReset(false)}>
                  Keep this career
                </button>
              </>
            ) : (
              <>
                <p>
                  Choose a journal and submit. The throw is automatic: aiming
                  never determines publication.
                </p>
                <ol>
                  <li>
                    Your manuscript’s shape shows your <b>current perception</b>
                    , not its hidden quality.
                  </li>
                  <li>
                    In the review field, it morphs toward the journal’s{" "}
                    <b>noisy assessment</b>.
                  </li>
                  <li>
                    Outside commitments determine whether a revision round has
                    protected writing time, a normal semester, or heavy
                    teaching/service. This provides 8–14 effort points to
                    allocate before you redirect or file the paper.
                  </li>
                  <li>
                    Take breaks to restore energy. Revisit dormant work as your
                    skill grows.
                  </li>
                </ol>
                <p>
                  Outcomes combine underlying quality, profile fit, simulated
                  selectivity, revision history, research skill, and chance.
                  Gate collisions illustrate the result; they are not a physical
                  acceptance test.
                </p>
                <p>
                  Weights and outcome probabilities remain game settings. Review
                  stages use published guidance where available; delay
                  distributions and later-round durations are simulation
                  assumptions. Names appear as plain text; no journal endorses
                  this game.
                </p>
                <p>
                  Progress lasts only while this page is open. Refreshing starts a new game. No account, AI API,
                  or external asset service is required.
                </p>
                <button className="primary" onClick={() => setHelp(false)}>
                  Back to the office <ArrowUpRight size={17} />
                </button>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
  function selected(id: string) {
    return j.id === id ? "journal selected" : "journal";
  }
}
