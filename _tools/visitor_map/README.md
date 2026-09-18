# Visitor Map

The public map contains GA4 country aggregates, never credentials or individual
records. The GA property is 554846099. Its service account is a GA Viewer.

## Scope

- Metric: sessions (visits, not distinct people or page views).
- Range: last 30 calendar days including today, in the property's time zone.
- Filter: hostName xinyuan-wei-xw.github.io, eventName page_view, pagePath not
  starting with /visitor-map. A session visiting other pages and the map still
  counts. A map-only visit does not. The map page also disables GA tagging.
- Dimensions: countryId, country, region, and city. All positive aggregate counts are included; no five-visit threshold. No institution inference or IP lookup.
- Total comes from a separate report without a country dimension, rather than
  assuming country rows sum to a unique global session count.
- Today is provisional. Google thresholds and unknown locations can affect totals.

## Authentication and deployment

The workflow update-visitor-map.yml uses Google Workload Identity Federation,
restricted to this repository, master branch, and this workflow. Credentials
are not written to disk. The analytics.readonly OAuth scope is used.

On manual dispatch, pushes to master, and daily at 11:23 UTC, the workflow exports
assets/data/visitor-map.json and images/lab/visitor-map.svg, builds Jekyll, and
deploys via GitHub Pages Actions. Generated data is included in the deployment
artifact, not committed to git history. If authentication or export fails, the
workflow fails before deployment, preserving the existing website.

GitHub Settings > Pages > Source must be GitHub Actions before activation.
This replaces the old branch build; subsequent website pushes use this workflow.
The daily time is approximate because GitHub schedules can be delayed.

Local builds use the clearly marked awaiting-data placeholder. For authenticated
local testing, supply GA_ACCESS_TOKEN in the environment and run export.py.
Never put tokens in shell command arguments, source files, logs, or the repository.

The SVG used by the card is the same current map graphic served by the map page.
It is not a screenshot of a third-party website.

Boundaries: Natural Earth 1:110m admin-0 countries, public domain.
Source: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson

State/province boundaries and city-center coordinates use Natural Earth 1:10m.
City matching requires both country and region, with a unique name match;
unmatched cities stay in the table without a guessed marker. Coordinates are
public gazetteer city centers, not visitor coordinates.
