# Product Requirements Document: SMR Family Tree

## 1. Vision & Purpose

**Product:** SMR Family Tree
**Live URL:** https://smrfamilytree.web.app/

A shared digital experience that brings extended family history to life. SMR Family Tree makes it easy for family members — across generations and geographies — to explore how they're all connected, discover relatives they may not know, and preserve family knowledge for the future.

---

## 2. Problem Statement

Extended families that span multiple generations and cultural backgrounds lose connection over time. Younger members may not know their second cousins. Older members hold knowledge about relationships that isn't written down anywhere. Existing solutions fall short in different ways — paper charts and spreadsheets are too static, and paid platforms like Ancestry.com have significant gaps: records are heavily U.S.-centric with limited coverage of international families, many family members keep their profiles private, and the platform focuses on historical records rather than living family knowledge that elders carry.

**Key pain points:**
- Family relationship knowledge lives in the heads of a few elder members and risks being lost
- No single, accessible place for the whole family to see how everyone is connected
- Platforms like Ancestry.com lack comprehensive data for families with roots outside the U.S., and private member profiles create gaps that fragment the tree
- Traditional family trees break down when multiple families intermarry
- Static charts can't handle the complexity of cross-family marriages, adoptions, divorces, and blended families
- Family members on phones need the same access as those on desktops

---

## 3. Target Audience

| Segment | Needs |
|---------|-------|
| **Curious family members** | Browse and discover — "How am I related to this person?" |
| **Elder knowledge-holders** | Verify accuracy, contribute details about professions, places, dates |
| **Parents with young children** | Teach kids about family heritage in a visual, engaging way |
| **Reunion planners** | Understand the full scope of the family for events and communication |
| **Remote/distant relatives** | Feel connected to the larger family despite geographic distance |

---

## 4. Goals & Success Metrics

### Product Goals

1. **Preserve** — Capture multi-generational family knowledge in a durable, shareable format
2. **Connect** — Help family members understand their relationships across four founding families
3. **Engage** — Make exploration intuitive and enjoyable so people actually use it
4. **Access** — Work well on any device, for any age group

### Success Metrics

| Metric | Signal |
|--------|--------|
| Engagement | Time spent exploring (session duration) |
| Reach | Unique visitors, especially around family events/reunions |
| Completeness | Percentage of family members with photos, birth years, and professions filled in |
| Discoverability | Search usage rate — are people finding specific relatives? |
| Cross-device usage | Mobile vs. desktop session split |

---

## 5. User Stories

### Exploration

> *As a family member, I want to visually explore the family tree so I can understand how different branches connect.*

> *As a family member at a distant relative's wedding, I want to search for names and see exactly how we're connected so I can understand the relationship.*

### Discovery

> *As a spouse who married into the family, I want to trace my partner's lineage back to the founding couple so I understand their family history.*

> *As a curious relative, I want to click on a person and see their details (photo, profession, birth info) so I can learn about them.*

> *As a user viewing someone who married in, I want to navigate to that person's own family of origin so I can see both sides.*

### Navigation

> *As a user in card view, I want to tap "View in Tree" to see the same person in the interactive graph for more context.*

> *As a user in tree view, I want to zoom and pan so I can focus on a specific branch without losing the big picture.*

> *As a user, I want my preferred view (tree or cards) remembered so I don't have to switch every time I visit.*

### Accessibility

> *As a family member with accessibility needs, I want to use card view with keyboard navigation, screen reader support, and focus indicators so I can explore the family tree without relying on a mouse.*

> *As an older family member, I want to increase the font size so I can read names comfortably.*

> *As a first-time visitor, I want to understand what the colors and symbols mean so the tree makes sense to me.*

---

## 6. Core Features

### 6.1 Two Ways to Explore

The app offers two complementary views because different users have different mental models:

**Tree View** — An interactive graph where nodes represent people and marriages. Best for understanding the overall structure and how branches connect. Users click to expand/collapse branches, hover for details, and zoom/pan to navigate.

**Card View** — A scrollable, hierarchical list of family cards. Designed as the better experience for small devices like phones, where zooming and panning a graph is cumbersome. Also the more accessible view — built with ARIA attributes, keyboard navigation (tab, Enter/Space), and focus indicators so users who rely on assistive technology can explore the tree without a mouse. Ideal for browsing linearly and for users less comfortable with graph interfaces. Families expand like an accordion.

Default view adapts to device: cards on mobile, tree on desktop.

### 6.2 Search

Find anyone in the family by typing their name or nickname. Results appear instantly (after 2 characters) with photo, name, and birth year. Selecting a result navigates directly to that person in whichever view is active — expanding the necessary path and scrolling/centering to them.

### 6.3 Person Details

Each family member can have:
- Photo (or a placeholder with their initial)
- Full name and nickname
- Birth and death years and places
- Profession
- Military service
- Gender indicator
- Relationship markers (adopted, from another marriage, divorced, etc.)

In tree view, details appear on hover (tooltip). In card view, details are shown inline.

### 6.4 Cross-Family Navigation

Four founding families are interconnected through marriages. When viewing a spouse who married into a family, a "View Ancestors" action traces them back to their own family of origin. This lets users seamlessly navigate across family boundaries — a key differentiator from simple tree charts.

### 6.5 Legend & Onboarding

A legend dropdown explains:
- What the node colors mean (tree view)
- What special symbols mean (adopted, divorced, passed away, stillborn, etc.)

This serves as lightweight onboarding so users can self-serve without instructions.

### 6.6 Font Size Controls

Adjustable text size (keyboard shortcuts and buttons) so the tree is readable for all ages and screen sizes. Preference is remembered across sessions.

---

## 7. Information Architecture

### Founding Families (shown on load)

| Family | ID |
|--------|----|
| Robinson | Primary |
| Davis | Primary |
| Royyuru | Primary |
| Viswanadham | Primary |

### Secondary Families (reachable via navigation)

Evani, Furbee, Long — accessible when tracing a spouse's ancestors.

### Data per Person

Names may include symbols conveying relationship context:

| Symbol | Meaning |
|--------|---------|
| `*` | Adopted or not biologically related |
| `½` | From another marriage |
| `~` | Passed away, year unknown |
| `○` | Stillborn |
| `⟷` | Divorced out of the family |
| `♂` / `♀` | Male / Female |

---

## 8. Interaction Design

### Tree View Behaviors

| Action | Result |
|--------|--------|
| Click a cyan node | Expand — reveal spouse(s) and children |
| Click a pink node | Collapse — hide descendants |
| Hover a node | Show tooltip with person details and photo |
| Scroll wheel / pinch | Zoom in and out |
| Click and drag background | Pan the view |
| Select search result | Tree expands path to person and centers on them |

### Card View Behaviors

| Action | Result |
|--------|--------|
| Tap a family header | Expand/collapse the founding couple's descendants |
| Tap a person's expand arrow | Show their children and spouse details |
| Tap "View Ancestors" | Navigate to the spouse's family of origin |
| Tap "View in Tree" | Switch to tree view centered on that person |
| Select search result | Expand path to person, scroll and highlight |

---

## 9. Responsive Design

| Context | Experience |
|---------|-----------|
| **Desktop** | Tree view by default. Navbar in two rows (title on top, search/controls on bottom). Legend as dropdown. Hover tooltips. |
| **Mobile (≤600px)** | Card view by default. Navbar wraps to three rows as search bar takes full width. Legend as full-width panel. Touch-friendly cards. |

---

## 10. Persistence & State

| What's saved | Where | Why |
|-------------|-------|-----|
| Preferred view mode | localStorage | Don't make users re-choose every visit |
| Font size preference | localStorage | Accessibility setting should stick |

---

## 11. Technical Summary

| Layer | Technology |
|-------|-----------|
| UI Framework | React 19 |
| Tree Rendering | D3.js + d3-dag (Sugiyama layout) |
| Build Tool | Vite |
| Hosting | Firebase Hosting |
| Data | Static JS module (no backend/database) |

No authentication, no server-side logic, no database. All family data is bundled into the app at build time.

---

## 12. Constraints & Trade-offs

| Constraint | Implication |
|-----------|-------------|
| **Static data** | Adding/editing family members requires a code change and redeploy. No self-service editing. |
| **No auth** | The tree is public to anyone with the URL. Privacy depends on obscurity. |
| **No backend** | No analytics, no user accounts, no collaborative editing. |
| **D3 complexity** | Tree view is powerful but has a learning curve for non-technical users — hence the card view alternative. |

---

## 14. Assumptions

- A single technical family member maintains the codebase and deploys updates
- Non-technical family members can contribute by sending a list of additions or corrections (names, dates, photos, etc.) to the maintainer, who then updates the data and redeploys
- Family data is relatively stable — updates happen occasionally (new births, marriages, deaths) rather than continuously
- The four founding families (Robinson, Davis, Royyuru, Viswanadham) represent the complete scope of the tree; new top-level families are not expected
- The URL is shared within the family and not broadly advertised, providing a basic level of privacy
- Users have access to a modern web browser (Chrome, Safari, Firefox, Edge)

---

## 15. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Single maintainer dependency** | If the one technical family member becomes unavailable, no one can update the tree | Document the update process clearly; keep the data format simple enough that another developer could pick it up |
| **Data accuracy** | Incorrect dates, misspelled names, or missing people erode trust in the tool | Encourage family members to review and send corrections; elder family members can verify historical details |
| **Knowledge loss over time** | Elder family members who hold relationship knowledge may not contribute before it's too late | Prioritize capturing information from older generations; make it easy for them to send updates (a simple list to the maintainer) |
| **Public URL exposure** | Anyone with the link can view personal family information (names, photos, birth years) | Share the URL only within the family; consider adding authentication if the family grows concerned |
| **Data loss** | The family data file is the single source of truth with no backup beyond git history | Data lives in a git repository with full version history; consider periodic backups or a secondary copy |
| **Tree view unusable on mobile** | Users on phones may find the D3 graph frustrating, leading to abandonment | Card view serves as the default on mobile and provides a fully functional alternative |

---

## 16. Open Questions

- How should data updates be handled long-term? Who maintains the data today?
- Is there a privacy concern with the tree being publicly accessible?
- Are there family members who would actively contribute if a self-service editing feature existed?
- What's the appetite for adding historical context (stories, documents, scanned photos) beyond structured data?
