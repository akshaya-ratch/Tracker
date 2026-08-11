# Ratch · Market Intelligence (frontend prototype)

An editable research workstation for qualifying companies through Ratch's
five-gate workflow. Frontend only — local data, no backend, no auth, no API calls.

> The product spec lives in [readme.md](readme.md). This file covers how to run
> the app, how it is put together, and what the data does and does not claim.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
```

## Where the data comes from

Everything in [src/data/marketIntelligence.js](src/data/marketIntelligence.js)
is normalized from **sheet `108` only** of `Market Intelligence.xlsx` — 20
companies. No other sheet was read.

The sheet stores research as free text (multi-line cells, per-job-board
groupings, inconsistent units), so the extraction preserves the original strings
alongside the parsed values. Nothing is invented:

| In the sheet | In the app |
| --- | --- |
| Blank cell | `null` → rendered as "Not available" / "Not yet researched", and editable |
| Gate 2, 3, 4 columns (empty for all 20 rows) | "Not yet evaluated" + a checklist of the fields still to collect |
| A value that disagrees with a calculation | Both shown, flagged "Needs verification" — never silently overwritten |
| No source recorded | "Not recorded" — no URL is fabricated |

Derived, UI-only fields are clearly labelled as such: prototype priority,
calculated engineering density, research completion, gate completion.

## The research workspace

Every company row opens a **Company Research Profile** where all five tabs are
editable:

```
Companies table → click a row → research workspace → Edit research
    → fill fields → Save Changes → the edit appears everywhere
```

Gate statuses are `pass` · `fail` · `review` · `not_evaluated`.

There are two ways into the same fields — pick whichever matches how you work.

### 1. Gate-by-gate form (the Gates tab)

The sheet is organised by gate and so is the research, so the Gates tab is a
five-step form: **Gate 0 → Gate 1 → Gate 2 → Gate 3 → Gate 4**. Each step
gathers the fields that gate actually depends on — wherever they live in the
data model — and ends with the gate decision.

| Step | Fields gathered |
| --- | --- |
| Gate 0 · Company Qualification | identity, founders, funding type / amount / date, investors |
| Gate 1 · Growth + Hiring | headcount, employee range, growth, team composition, engineering density, HR/TA, open roles |
| Gate 2 · Hiring Pain | urgency, JD analysis, team analysis, applicant count, hiring pain, duplication, reposts, talent partners, hiring manager / panel, plus per-role duplication / reposted / panel / JD analysis |
| Gate 3 · Business / PMF | product, growth, revenue, PMF, public perception, customers |
| Gate 4 · Decision Maker / Outreach | decision makers (name, role, characteristics, LinkedIn, email, phone), brief, outreach status / channel / message / link |

Each step ends with **status (Pass / Fail / Review / Not evaluated), reason,
evidence-reasoning and notes**.

The left rail shows all five gates with their status and an `n / m fields
captured` count that ticks over live as you type — so you can see how complete
a gate is before deciding it. The form opens on the first gate with no outcome
yet, which for this dataset is Gate 2. Entries are held across all five steps;
you save once.

**Getting there directly:** the dashboard "Research next" queue and the
`Research Gate N` button on each read-only gate card both deep-link into the
right step via `/companies/:id?gate=N`.

### 2. Topic tabs

| Tab | Editable |
| --- | --- |
| Overview | name, founded year, location, funding type/amount/date, repeatable founders + investors, Gate 3 business fields, repeatable decision makers |
| Hiring | urgency, JD duplication, reposts, hiring manager, panel, applicant count, JD analysis, team analysis, hiring pain, repeatable talent partners, repeatable **jobs** (role, location, source, recency, applicants, status, JD duplication, reposted, hiring manager, panel, JD analysis) |
| Team | reported employees, employee range, growth, repeatable team functions, engineering density source value, HR/TA counts and repeatable HR/TA people (name, function, optional LinkedIn) |
| Evidence | repeatable records: category, observation, source, source URL, date checked, recency, confidence, status, notes |

Both views are built from the same field components in
[editors/sections.jsx](src/components/companies/editors/sections.jsx), so a
field behaves identically wherever you meet it and there is one place to change
it.

**Read mode vs. edit mode.** The polished intelligence view is the default;
`Edit research` swaps each tab for its editor. The read components were left
untouched — they render the last saved record while the editors work on a draft.

**Save / Cancel / Reset.**

- **Save Changes** commits the draft, re-runs `decorate()`, and shows a "Changes
  saved" toast. Table values, gate badges, pipeline counts, priority and every
  calculated metric update in the same render.
- **Cancel** discards the draft and returns to the last saved values.
- **Reset** (with a confirmation) discards saved edits too and restores the
  original sheet 108 values for that company.

> **State lifetime.** Edits live in React state for the session, as specified —
> a browser refresh restores the sheet values. Persistence is a one-line change
> at the `saveCompany` seam in `WorkspaceContext` (localStorage now, Supabase
> later); it was left out because it was out of scope.

### Editing never launders the data

The honesty rules apply to typed input, not just to the seed data:

- Clearing a field stores `null`, so it reads as "Not researched" — an empty
  input never becomes `0` or `""`.
- Engineering density recalculates live from the team breakdown, but the source
  value is **never** overwritten. When they disagree the editor shows both plus
  *"Source value differs from calculated value — needs verification."*
- Reported headcount outside its stated range raises **⚠ Source conflict** while
  you type, with both values kept as entered.
- Gates 2–4 default to "Not evaluated" and stay out of every completion figure
  until a researcher sets a status; nothing auto-completes from empty data.
- Evidence source URLs and dates checked start blank on every seeded record,
  because the sheet has none.

## Architecture

```
src/
  data/
    marketIntelligence.js   generated dataset (the only data file)
    repository.js           DATA ACCESS BOUNDARY - swap this for Supabase
  state/
    WorkspaceContext.jsx    company records + search / filter / sort state
    useCompanyDraft.js      per-company edit buffer (save / cancel / reset)
  utils/
    calculations.js         headcount, density, freshness, gate completion
    priority.js             the prototype scoring heuristic
    dataQuality.js          conflict / warning / missing detection
    gates.js                gate definitions and cohort logic
  components/
    layout/                 Sidebar, TopBar, AppShell
    dashboard/              KPISection
    companies/              CompanyTable, CompanyFilters, CompanyHeader,
                            CompanyOverview, CompanyTabs, EditBar
      editors/              sections.jsx  <- every field, defined once
                            GateForm      <- gate-by-gate stepper
                            OverviewEditor, HiringEditor, TeamEditor,
                            EvidenceEditor
    hiring/                 HiringSnapshot, HiringRolesTable
    team/                   TeamComposition
    gates/                  GatePipeline, GateCard, CompanyGates
    evidence/               EvidenceList, EvidenceItem
    common/                 SectionCard, StatusBadge, Field, FormFields,
                            DataQualityWarning, EmptyState
  pages/                    Dashboard, Companies, CompanyDetails, PlaceholderPage
```

### Swapping in a real backend

No component imports the data file. Reads go through
[src/data/repository.js](src/data/repository.js); writes go through
`saveCompany` in [WorkspaceContext](src/state/WorkspaceContext.jsx).

```js
getCompanies()   getCompanyById(id)   getSeedCompany(id)   decorate(company)
getDatasetMeta() getFilterOptions()   // reads
saveCompany(next)  resetCompanyToSource(id)                // writes
```

To move to Supabase: make the reads async and fetch there, and turn
`saveCompany` into the mutation call. `decorate()` attaches the derived fields
and can move server-side unchanged — the utils are pure functions of a company
record. Component code does not change.

The company shape mirrors the intended tables:

```js
company = {
  id, name, foundedYear, founders[], location, brief,
  funding:   { type, amount, date, amountRaw, investors[] },
  employees: { reported, range, raw },
  team:      [{ id, function, count }],
  hiring: {
    jobs: [{ id, roles, location, source, recency, applicants, status,
             jdDuplication, reposted, hiringManager, panel, jdAnalysis }],
    notes[], externalPartners[], hiringBadge, urgency, jdDuplication,
    reposts, hiringManager, panel, jdAnalysis, teamAnalysis,
    applicantCount, hiringPain,
  },
  hr: { count, people: [{ id, name, function, linkedin }], sourceNote },
  ta: { count, people: [...], sourceNote },
  gates:    { gate0..gate4 },   // { result, reason, notes, evidence, raw }
  business: { product, growth, revenue, pmf, publicPerception, customers },
  decisionMakers: [{ id, name, role, characteristics, linkedin, email, phone }],
  outreach: { status, message, channel, link },
  openRoles: { atLeast, exact },
  evidence: [{ id, category, observation, source, sourceUrl, recency,
               dateChecked, notes, confidence, status }],
}
```

`gates[n].result` is the gate status: `pass` | `fail` | `review` |
`not_evaluated`.

## Prototype priority

`utils/priority.js` — a transparent heuristic, **not** Ratch's scoring engine.
Weighted signals: Gate 0/1 outcomes, open-role count, listing freshness,
applicant volume, engineering density, hiring badge, and hiring-without-a-TA.

Every contribution is shown on the company Overview tab, so the number is always
auditable. Companies with too little researched data are labelled **Needs
Research** rather than scored low. Replacing it means changing one function.

## Data-quality checks

`utils/dataQuality.js` flags, per company:

- headcount outside its stated employee range
- reported headcount vs. the team breakdown total
- engineering density that does not reconcile with either denominator
- values stored in inconsistent units (percent string vs. decimal fraction)
- HR/TA counts that disagree with the people actually named
- hiring columns with uneven entry counts (positional matching is approximate)
- unevaluated gates and unresearched fields

Example, Namma Yatri: the sheet records 37.8% engineering density, which is
54 ÷ 143 (the team breakdown), while the reported headcount is 218 → 24.8%. Both
numbers are displayed with a "Needs verification" note. Neither wins.

## Known limitations

- Open-role counts are a **lower bound**. The sheet lists roles per job board, so
  the same role appears on several boards; the app takes the max across boards
  rather than summing, and labels every count `≥ n`.
- Hiring rows are matched **by position** across the five hiring columns, which
  is how the sheet is laid out. Where the columns have different entry counts,
  the app flags it instead of guessing.
- Research, Hiring Intelligence, People and Outreach are placeholder pages that
  state what they will do and what blocks them.
- Edits are session-scoped React state — a page refresh restores the sheet
  values. See the note under "The research workspace".
- The table stays a clean summary: no cell is an input. All editing happens in
  the research workspace.
