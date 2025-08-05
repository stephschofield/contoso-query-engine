# IAP Query Engine 

## Overview

IAP Query Engine is a no-code analytics studio tailored for non-technical Call Center Agent Supervisors. It empowers supervisors to easily build custom queries, generate insightful reports, and analyze agent behaviors, focusing on improving coaching and compliance. The application connects securely to a behavioral analytics API and presents actionable data in an intuitive, accessible interface.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Core Concepts](#core-concepts)
- [API Reference](#api-reference)
- [Interface Mockups](#interface-mockups)
- [Accessibility](#accessibility)
- [Contributing](#contributing)
- [Glossary](#glossary)
- [Appendix](#appendix)

---

## Features

- **No-Code Query Builder:** Easily select behaviors or metrics (mutual silence, sentiment, cross-talk, etc.) and build queries without writing code.
- **Behavioral Analytics:** Visualize agent KPIs on greeting compliance, cross-talk, non-talk, sentiment trends, and sales pitch attempts.
- **Report Table & Drilldown Views:** Click agent names in reports to investigate call history and compliance per individual.
- **Automated Recommendations:** Context-aware coaching suggestions for supervisors based on observed behaviors.
- **Data Export:** Export reports in CSV format.
- **Secure & Fast:** Azure AD authentication; robust error handling; near-instant report loading.

---

## Getting Started

**Prerequisites:**
- Node.js & npm or yarn installed
- Access credentials for Azure AD and the Charter Query Engine API

**Installation:**

<pre>
git clone https://github.com/stephschofield/iap-query-engine-wx.git
cd iap-query-engine-wx
npm install
</pre>

**Configuration:**
- Set up your API endpoint and credentials in `.env` or the provided config file (see sample in `config/`).
- Ensure your user has access permissions via Azure AD.

**Running the App:**

<pre>
npm start
</pre>
---

## Usage

1. **Login** with your Azure AD credentials.
2. **Select or Build a Report** using the query builder.
3. **Choose Metrics:** Select behaviors (e.g., mutual silence, sentiment, crosstalk) and set agent and time filters.
4. **Run Query** to generate a tabular report.
5. **Drill Down:** Click an agent's name to review their detailed behavioral history.
6. **Review Recommendations:** See system-suggested coaching tips in the sidebar.
7. **Export Data** if needed.

---

## Core Concepts

### Behaviors & KPIs Tracked

- **Mutual Silence (Non-talk):** % of time where neither party speaks.
- **Sentiment Tracking:** Positive/negative language at call opening and closing.
- **Crosstalk:** Instances of overlapping speech.
- **Branded Greeting:** If agent stated company greeting within 15s.
- **Mobile Pitch:** Sales attempt on mobile services detected.
- **Truth in Billing:** Agent clearly states new price at end of call for compliance.

---

## API Reference

The application uses a documented REST API. Core endpoints include:

- `GET /api/v1/reports` - List reports.
- `POST /api/v1/reports` - Create new report with selected metrics/filters.
- `GET /api/v1/reports/{report_id}/data` - Report data.
- `POST /api/v1/interactions/search` - Search call interactions by metric and filter.
- `GET /api/v1/interactions/agent/{agent_id}` - Retrieve agent call logs.

**All endpoints require Azure AD authentication. See the [`/docs`](https://ciap-app-kcf5ofqycqvs2.mangomeadow-b5c8efc2.centralus.azurecontainerapps.io/docs) for complete details.**

**Sample Query JSON:**

<pre>
{
"metrics": ["mutual_silence", "sentiment_beginning", "sentiment_ending", "crosstalk"],
  "filters": {
    "agent_id": "12345",
    "start_time": "2024-05-01T00:00:00Z",
    "end_time": "2024-05-07T23:59:59Z"
  }
}
</pre>


---

## Interface Mockups

- **Dashboard:** Quick access to saved reports and new report wizard.
- **Query Builder:** Date pickers, agent selectors, metric checkboxes.
- **Report Table:** Sortable table with behavioral metrics; agent drilldown on click.
- **Agent Drilldown:** Time series of behaviors, compliance flags, coaching sidebar.

---

## Accessibility

- All UI elements are ARIA-labeled.
- High-contrast, color-blind friendly palette.
- Keyboard-only navigation.
- Table/grid and forms are fully screen reader accessible.

---

## Contributing

**We welcome issues and pull requests!**
- Please create bug reports and feature suggestions via the Issues tab.
- For larger changes, open a discussion in our Discussions or Projects tabs first.

---

## Glossary

- **Mutual Silence:** No speech by either agent or customer.
- **Sentiment:** Evaluated mood of speech at call start/end.
- **Crosstalk:** Both parties talking over each other.
- **Branded Greeting:** Official call opening required by company.
- **Mobile Pitch:** Mention or attempt to sell mobile services.
- **Truth in Billing:** Clear statement of costs to maintain compliance.

---

## Appendix

- **API Docs:** See `/docs` endpoint for full Swagger specification.
- **UI Mockups:** Example wireframes included in `docs/wireframes/`.
- **FAQ & Troubleshooting:** See `docs/FAQ.md`.

---
