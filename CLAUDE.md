# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive family tree visualization app built with React and D3.js. Deployed to Firebase Hosting at https://smrfamilytree.web.app/

Two view modes: Tree view (D3 visualization) and Card view (hierarchical cards).

## Commands

```bash
# Install dependencies
npm i

# Run development server (localhost:5173)
npm run dev

# Build for production
npm run build

# Deploy to Firebase
firebase deploy
```

## Architecture

### Core Components

- **`src/App.jsx`** - Main React component. Manages:
  - View mode switching (tree/card) persisted in localStorage
  - Font size state (persisted in localStorage)
  - FamilyTree initialization via useEffect
  - Navbar with search, legend dropdown, and view toggle
  - Keyboard shortcuts (+/- for font size, 0 to reset)

- **`src/js/familytree.js`** - Core tree visualization engine:
  - `FamilyTree` - Main entry point, extends FTDrawer
  - `FTDataHandler` - Parses family data, manages node visibility, builds graph using d3-dag's `graphConnect()`
  - `FTDrawer` - Handles D3.js rendering: SVG, zoom/pan, tooltips, transitions
  - `centerView()` - Centers view on all visible nodes (called when switching to tree view)
  - `navigateToNode(id)` - Expands tree to show a specific person and centers on them
  - Initial visible nodes: 4 founding couples (Robinson, Davis, Royyuru, Viswanadham)

- **`src/components/CardView.jsx`** - Card-based family view:
  - Shows 4 founding couples as expandable family cards
  - Nested expansion of children with spouses
  - "View Ancestors" links for spouses to navigate to their family

- **`src/components/ExpandablePersonCard.jsx`** - Recursive card component:
  - `ExpandablePersonCard` - Shows person with expandable children
  - `PersonMini` - Compact person display with photo, info, and links
  - `showAncestors` prop controls whether "View Ancestors" button appears (only for spouses)

- **`src/components/Legend.jsx`** - Dropdown legend in navbar:
  - Shows node colors (tree view) and symbol meanings
  - Closes when clicking outside

- **`src/hooks/useFamilyTree.js`** - Card view state management:
  - `INITIAL_COUPLES` - The 4 founding couples (ids 1-2, 5-6, 82-83, 84-85)
  - `findPathToInitialCouple(id)` - BFS to find path from person to founding family
  - `navigateUp()` - Scrolls to ancestors if in current view, or navigates to new screen
  - `navigateToPersonInCards()` - Expands path to show specific person (for search)

- **`src/data/treeData.js`** - Family data store with `persons` object and generated `unions`/`links`

### Data Flow

1. `treeData.js` exports `data` with persons, unions (generated), and links (generated)
2. Tree view: `FTDataHandler` builds DAG, `FTDrawer` renders with D3
3. Card view: `useFamilyTree` hook manages expansion state and navigation
4. Both views share the same data source

### Key Patterns

- **Descendant detection**: A person with `parent_union` is a descendant of the founding families; one without married into the family
- **Ancestor navigation**: When clicking "View Ancestors" on a spouse, the code finds the `descendantId` (parent with `parent_union`) and traces back to their founding family
- **View centering**: Tree view calls `centerView()` when switching from card view to re-center on visible nodes

### Symbols in Names

Names in the data may contain these symbols (displayed as-is, not extracted):
- `*` - Adopted or not biologically related
- `½` - From another marriage
- `~` - Passed away, year unknown
- `○` - Stillborn
- `⟷` - Divorced out of the family

### Gender Display

Add `gender: "M"` or `gender: "F"` to person objects to display gender symbols:
- `♂` - Male (gender: "M")
- `♀` - Female (gender: "F")

### Mobile Responsive

- Navbar stacks into two rows on mobile (≤600px)
- Title on top row, search and buttons on second row
- Legend dropdown appears as full-width panel below navbar on mobile

### Font Size Feature

- Default: 14px, Range: 8-24px, Step: 2px
- Controls: TextSizeControls component (tree view only), keyboard +/-/0
- Persisted in localStorage (`familyTreeFontSize`)
