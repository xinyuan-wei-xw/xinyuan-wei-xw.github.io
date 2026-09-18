# Review-cycle evidence and simulation choices

Checked September 2026. Timing is per round, not total time to acceptance.

- MISQ reviewer guidance lists SE screening/assignment 4–5 days, AE screening and reviewer assignment 7–10, reviewers 21–28, AE report 7–10, SE report 7–10: about 46–63 days. These are requested targets, not measured averages. The game uses 55 days before simulated variation and availability delays.
  https://misq.umn.edu/skin/frontend/default/misq/pdf/ReviewerRole.pdf
- ISR's official decision-time chart distinguishes first and final decisions for externally reviewed papers. The 2025 Q1–3 first-decision figure is approximately 2.8 months, read visually from the graph; this is not an exact tabulated value. The game uses an 84-day baseline, with invented dispersion. Final-decision time is not used as the duration of every round.
  https://pubsonline.informs.org/authorportal/journal-metrics/information-systems-research
  https://pubsonline.informs.org/pb-assets/ux3/authorportal/journal-metrics/isre-times-1759868875517.png
- JAIS author guidance confirms double-blind review. An older distribution page describes SE screening and developmental revisions; it is not a current timing dataset. No current comparable duration was verified. Shared 90-day simulation baseline.
  https://aisel.aisnet.org/jais/authorinfo.html
- JMIS's publisher page displays acceptance-to-online-publication time. This measures production, not peer review, so it was not substituted for review duration. Shared 90-day simulation baseline.
  https://www.tandfonline.com/journals/mmis20/about-this-journal
- ISJ's all-submission first-decision median is not conditional on external review; do not treat its short value as a full review round. Shared 90-day simulation baseline.
  https://onlinelibrary.wiley.com/journal/13652575
- Comparable EJIS, JSIS and JIT external-review duration figures could not be verified in this check. Their source links are retained in configuration for future updates. All use the same fallback baseline rather than fabricated journal rankings.

## Modeled variation

First round: editorial screening → reviewer assignment → external review → editorial decision. The proportions, triangular duration distributions, 18% availability-delay chance, and revision multipliers (major .85, minor .55) are game assumptions. MISQ's stage proportions are only approximated by this shared decomposition; its total target informs the baseline. Desk decisions use 2–28 days, mode 10, also a game assumption for all journals. The 30-day simulated month is a calendar simplification.

Waiting-time luck and noisy editorial assessment use separate random draws.
Reviewer delays do not change underlying quality or predetermined outcomes.
R&R remains uncertain. Changing the protagonist's appearance does not affect outcomes.
