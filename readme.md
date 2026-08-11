# Tracker

Build a dummy Market Intelligence web application for Ratch.

IMPORTANT CONTEXT
-----------------
I am currently doing Market Intelligence manually in Excel.

The uploaded Excel workbook contains a sheet named "108" / "10/8".
Use ONLY that sheet as the source for the dummy company data.
Do NOT inspect, read, infer, or use data from any other sheet in the workbook.

The goal is NOT to build the backend yet.
Build only a polished frontend prototype with dummy/local data.

TECH STACK
----------
- React
- JavaScript
- JSX
- Vite
- Chakra UI
- Local/mock data only
- No Supabase
- No API
- No authentication
- No scraping
- No LLM
- No backend

The code must be componentized and structured so the local data can later be replaced with Supabase/API data without redesigning the UI.

PRODUCT PURPOSE
---------------
This is Ratch's Market Intelligence workspace.

The workflow is:

Research
  ↓
Gate 0 — Company Qualification
  ↓
Gate 1 — Growth + Hiring
  ↓
Gate 2 — Hiring Pain
  ↓
Gate 3 — Business / PMF
  ↓
Gate 4 — Decision Maker + Outreach

The dashboard should help a researcher answer:

"Which companies should Ratch care about, why, and what should we research next?"

DO NOT make this look like a generic BI dashboard.
It should feel like a professional intelligence/research platform:
- clean
- dense but readable
- data-first
- professional
- minimal
- strong information hierarchy

==================================================
APPLICATION STRUCTURE
==================================================

Create the following main navigation:

1. Dashboard
2. Companies
3. Research
4. Hiring Intelligence
5. People
6. Outreach

For V1, fully implement:
- Dashboard
- Companies
- Company Details

The other navigation items can show a clean "Coming next" / placeholder state.

==================================================
SIDEBAR
==================================================

Create a persistent left sidebar.

Brand:

RATCH
Market Intelligence

Navigation:

Dashboard

Companies
  All Companies
  Gate 0
  Gate 1
  Gate 2
  Gate 3
  Gate 4

Research

Hiring Intelligence

People

Outreach

Use Chakra UI components.

Keep the sidebar professional and compact.

==================================================
TOP BAR
==================================================

Create a top bar containing:

- Page title
- Global company search
- Filter button
- Optional date/research status indicator
- User/profile placeholder

Search should work against the local company dataset.

==================================================
DASHBOARD
==================================================

Create a professional Market Intelligence dashboard.

Header:

Market Intelligence

Subtitle:

"Research, qualify and prioritize companies for Ratch."

KPI cards:

- Companies Researched
- Gate 0 Evaluated
- Gate 0 Passed
- Gate 1 Evaluated
- Gate 1 Passed
- Gate 2 Ready for Research
- Outreach Ready

IMPORTANT:
Do NOT fabricate Gate 2/3/4 completion data.

The current 108 sheet has substantial Gate 0 and Gate 1 data but Gate 2/3/4 are mostly not populated.

Represent unavailable/not-yet-evaluated values honestly.

Example:

Gate 2
"Not started"

rather than pretending there are completed Gate 2 records.

==================================================
GATE PIPELINE
==================================================

Create a prominent Gate Pipeline component:

Gate 0
Company Qualification
        ↓
Gate 1
Growth + Hiring
        ↓
Gate 2
Hiring Pain
        ↓
Gate 3
Business / PMF
        ↓
Gate 4
Decision Maker / Outreach

Each gate should display:

- number evaluated
- pass count where available
- status
- short description

Use Chakra Badge/Progress/Stat components.

Gate statuses:

PASS = green
FAIL = red
WARNING = amber
NOT STARTED = gray
IN REVIEW = blue/accent

The pipeline should visually communicate progression through the research workflow.

==================================================
COMPANY PRIORITY TABLE
==================================================

Create a main table titled:

"Companies"

Use data from the 108 sheet.

Columns:

- Company
- Founded
- Location
- Funding
- Employees
- Open Roles
- HR / TA
- Engineering Density
- Employee Growth
- Gate 0
- Gate 1
- Priority

Do NOT blindly copy every Excel column into the table.

The table is a concise intelligence view.

Features:

- Search
- Sort
- Filter
- Gate 0 filter
- Gate 1 filter
- Location filter
- Funding filter
- Priority filter
- Row click → Company Details

Use Chakra Table components.

Make the table dense enough for research work but still readable.

==================================================
COMPANY DETAILS PAGE
==================================================

When a company is selected, open a dedicated Company Details page.

Example:

Namma Yatri

Bengaluru, Karnataka, India
Founded 2022
218 employees

Show a clear company header.

Add tabs:

1. Overview
2. Hiring
3. Team
4. Gates
5. Evidence

==================================================
OVERVIEW TAB
==================================================

Show:

Company information

- Startup Name
- Founded Year
- Location
- Funding Type
- Funding Amount
- Investors
- Employees
- Employee Range
- Founders
- Product
- Brief

Founders should be rendered individually rather than as one huge text string.

Funding should be displayed clearly.

==================================================
HIRING TAB
==================================================

This is an important part of the application.

Use the hiring information available in the 108 sheet.

Show:

Hiring Snapshot

- Open role signals
- Hiring urgency
- Applicant signals
- Job freshness
- External talent partners
- HR
- TA
- Hiring badge

Create a jobs/research table with:

- Role
- Location
- Source
- Recency
- Applicants
- Status

Where the Excel data is messy or grouped, preserve the information but present it cleanly.

Do not invent missing values.

Use:

"Not available"

or

"Needs verification"

where appropriate.

==================================================
TEAM TAB
==================================================

Display team composition.

Example structure:

Engineering
54

Operations
43

Customer Success & Support
18

Marketing
15

Business Development
13

Use a clean horizontal progress/bar visualization.

Also show:

Engineering Density

Calculate it from available employee/team data where possible.

IMPORTANT DATA QUALITY RULE:

If the source sheet contains a manually entered value that conflicts with a calculated value, DO NOT silently overwrite it.

Show:

"Source value: 37.8%"
"Calculated value: 24.8%"
"Needs verification"

or an equivalent subtle warning.

This is important because the Market Intelligence product should surface data-quality conflicts.

==================================================
GATES TAB
==================================================

Create five Gate sections.

GATE 0
Company Qualification

Show available evidence and result.

GATE 1
Growth + Hiring

Show available evidence and result.

GATE 2
Hiring Pain

If data is not populated:
show

"Not yet evaluated"

and list the fields that still need research:

- JD analysis
- Team analysis
- Applicant count
- Hiring pain
- JD duplication
- Reposts
- External talent partners
- Hiring Manager / Panel

GATE 3
Business / PMF

Show:

"Not yet evaluated"

with:

- Product
- Business growth
- Revenue
- PMF
- Public perception
- Customers

GATE 4
Decision Maker / Outreach

Show:

"Not yet evaluated"

with:

- Decision Makers
- Characteristics
- LinkedIn
- Phone
- Email
- Brief
- Outreach message/status

The UI should make it obvious what the researcher needs to do next.

==================================================
EVIDENCE TAB
==================================================

Create an Evidence interface even though the source Excel structure is not yet a formal evidence database.

Display research observations with:

- Category
- Observation
- Source
- Recency
- Status

Example:

Category:
Hiring

Observation:
"Finance Lead + 6 more jobs"

Source:
LinkedIn

Recency:
"1 week ago"

Status:
Observed

Do not fabricate URLs.

If no URL exists in the sheet, don't invent one.

==================================================
DATA QUALITY
==================================================

This application is a Market Intelligence tool.

Therefore, data quality is important.

Detect and visually flag:

- conflicting employee numbers
- conflicting employee ranges
- calculated metrics that don't match manually entered metrics
- missing values
- incomplete gate data
- ambiguous source information

Use subtle warning badges.

Examples:

"Needs verification"

"Source conflict"

"Not available"

"Not yet researched"

Do not hide these issues.

==================================================
DUMMY DATA
==================================================

Use the actual companies and available information from ONLY the 108 sheet.

Do not create fake company facts where the sheet already has real information.

You may create UI-only derived fields such as:

- priority
- calculated engineering density
- research completion
- gate completion

but clearly derive them from available data.

Do not invent funding, customers, revenue, decision makers, emails, phone numbers, or other factual company information.

If dummy data is necessary to demonstrate an interaction that the sheet does not support, use clearly labeled placeholder/dummy records rather than presenting them as real research.

==================================================
PRIORITY LOGIC
==================================================

Create a simple frontend-only priority score.

Do not pretend this is the final Ratch scoring algorithm.

Use available signals such as:

- Gate 0 passed
- Gate 1 passed
- number of open roles
- hiring activity
- employee growth
- engineering density
- hiring urgency

Display:

High
Medium
Low
Needs Research

Clearly label this as:

"Prototype Priority"

The score must be easy to replace later with a real scoring engine.

==================================================
COMPONENT ARCHITECTURE
==================================================

Use a clean React component architecture.

Suggested structure:

src/
  components/
    layout/
      Sidebar.jsx
      TopBar.jsx

    dashboard/
      KPISection.jsx
      GatePipeline.jsx
      CompanyPriorityTable.jsx

    companies/
      CompanyTable.jsx
      CompanyHeader.jsx
      CompanyOverview.jsx
      CompanyTabs.jsx

    hiring/
      HiringSnapshot.jsx
      HiringRolesTable.jsx

    team/
      TeamComposition.jsx

    gates/
      GateCard.jsx
      GatePipeline.jsx

    evidence/
      EvidenceList.jsx
      EvidenceItem.jsx

    common/
      StatusBadge.jsx
      EmptyState.jsx
      DataQualityWarning.jsx

  pages/
    Dashboard.jsx
    Companies.jsx
    CompanyDetails.jsx
    PlaceholderPage.jsx

  data/
    marketIntelligence.js

  utils/
    calculations.js
    priority.js
    dataQuality.js

  App.jsx

==================================================
DATA MODEL
==================================================

Do NOT couple components directly to Excel column names.

Create normalized frontend objects.

For example:

company = {
  id,
  name,
  foundedYear,
  founders: [],
  location,
  funding: {
    type,
    amount,
    investors: []
  },
  employees: {
    reported,
    range
  },
  team: [],
  hiring: {
    roles: [],
    sources: [],
    applicantSignals: [],
    hrCount,
    taCount
  },
  gates: {
    gate0,
    gate1,
    gate2,
    gate3,
    gate4
  },
  evidence: [],
  priority
}

This is important because later this structure can map to Supabase.

==================================================
ROUTING
==================================================

Use React Router if needed.

Routes:

/
  Dashboard

/companies
  Companies

/companies/:id
  Company Details

/research
/hiring
/people
/outreach

The last four can initially render a placeholder page.

==================================================
RESPONSIVE DESIGN
==================================================

Desktop-first because this is a research workstation.

But make it responsive.

Desktop:

Sidebar + main content.

Tablet:

Collapsible sidebar.

Mobile:

Drawer navigation.

Tables should remain usable.

==================================================
CHAKRA UI
==================================================

Use Chakra UI throughout.

Prefer:

- Box
- Flex
- Grid
- Stack
- Heading
- Text
- Badge
- Button
- Input
- Select
- Table
- Card
- Tabs
- Progress
- Stat
- Drawer
- Modal
- Tooltip
- Alert

Do not introduce another UI framework.

==================================================
VISUAL STYLE
==================================================

Do not make this look like a flashy startup landing page.

It should feel like an internal professional intelligence platform.

Use:

- white/light neutral surfaces
- subtle borders
- restrained shadows
- strong typography hierarchy
- compact data tables
- consistent badges
- clear green/red/amber/gray statuses
- one restrained accent color
- lots of information density without visual clutter

Think:

"Research workstation"

rather than:

"Marketing website"

==================================================
IMPORTANT UX DETAILS
==================================================

1. Clicking a company must open its profile.

2. Search must actually filter the local dataset.

3. Gate filters must actually work.

4. Company table sorting should work.

5. Tabs on Company Details should work.

6. Priority should be derived from data.

7. Data-quality warnings should be visible.

8. Missing information should not be represented as zero.

9. Gate 2/3/4 should clearly appear as not yet evaluated where appropriate.

10. No fake backend calls.

11. No loading spinners pretending to fetch data.

12. Keep all dummy data in one dedicated data file.

==================================================
SUCCESS CRITERIA
==================================================

When I run:

npm install
npm run dev

I should get a polished working Ratch Market Intelligence dashboard.

I should be able to:

- open Dashboard
- see company statistics
- see Gate 0 → Gate 4 pipeline
- search companies
- filter companies
- sort companies
- click Namma Yatri
- inspect its Overview
- inspect Hiring
- inspect Team
- inspect Gates
- inspect Evidence
- see data-quality warnings
- navigate back to Companies
- navigate through the sidebar
- see placeholder states for future modules

Do NOT build the backend yet.

Do NOT add authentication.

Do NOT add Supabase.

Do NOT add AI.

Do NOT add scraping.

Focus entirely on making the frontend prototype polished, functional, and structurally ready for the real Market Intelligence system later.