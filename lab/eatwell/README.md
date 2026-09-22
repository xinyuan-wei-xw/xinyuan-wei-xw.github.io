# 认真吃饭 Eat Well

Weekly meal planner on top of the open [TheMealDB](https://www.themealdb.com) recipe database.

**Flow:** pick a language (中文 / EN) → pick a cuisine (Chinese, American, Korean, …)
→ browse & select dishes → assign each dish to a day, optionally "double"
so it covers the next day's lunch → the **This Week** tab shows the 7-day plan →
the **Grocery List** tab auto-sums every ingredient (scaled by servings × doubles),
grouped by category, with tap-to-expand buying / storage / cooking tips.
Clicking any dish opens its full recipe (ingredients, steps, video).

**Accounts:** uses the same Firebase email/password account as X Planner
(project `x-planner-99dd3`). Browsing recipes is public; your dish picks, week
plan and grocery list sync to Firestore at `eatwell/{uid}` (owner-only rules)
and are wiped from the browser on sign-out — same privacy model as the planner.

Deployed as a single `index.html` (+ `thumbnail.png`) to `lab/eatwell/` on the
GitHub Pages site, with a `[Life] Eat Well` card on the Lab page.
