# Compare Teams Component

This directory contains the complete implementation of the team comparison functionality for EthioFootball.

## Components

- **ComparePage.tsx** - Main page component that handles data loading and renders the comparison UI
- **TeamCard.tsx** - Individual team display component showing honors, form, players, and fanbase notes
- **FormRow.tsx** - Recent form visualization with colored pills (W/D/L)
- **CompareStats.tsx** - Head-to-head statistics comparison
- **FreshnessBadge.tsx** - Data source and freshness indicator

## Features

- ✅ Responsive design (mobile-first, desktop two-column layout)
- ✅ Loading and error states
- ✅ Internationalization support (English/Amharic)
- ✅ Accessibility features (ARIA labels, semantic HTML, keyboard navigation)
- ✅ Redux integration with RTK Query
- ✅ TypeScript support with proper interfaces
- ✅ Mock data integration with easy API switching

## Usage

```tsx
import ComparePage from './components/compare/ComparePage';

// Use with default teams
<ComparePage />

// Use with specific teams
<ComparePage teamA="st-george" teamB="bunna" />
```

## Switching from Mock to Real API

To switch from mock data to a real API endpoint:

1. **Update the API endpoint** in `src/lib/api/compareApi.ts`:
   ```typescript
   query: ({ teamA, teamB }) => {
     // Change this line:
     return '/compare';
     // To this:
     return `/compare/${teamA}-vs-${teamB}`;
   },
   ```

2. **Set the API URL** environment variable:
   ```bash
   NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
   ```

That's it! The component will automatically use the real API instead of mock data.

## API Response Format

The API should return data in this exact format:

```json
{
  "comparison_data": {
    "team_a": {
      "name": "Team Name",
      "honors": ["Honor 1", "Honor 2"],
      "recent_form": ["W", "D", "L", "W", "W"],
      "notable_players": ["Player 1", "Player 2"],
      "fanbase_notes": "Description of fanbase"
    },
    "team_b": {
      // Same structure as team_a
    }
  },
  "source": "Data Source Name",
  "freshness": "2025-09-01T12:00:00Z"
}
```

## Testing

Run tests with:
```bash
npm test src/components/compare/__tests__/
```

## Styling

Uses Tailwind CSS with the project's design tokens:
- Primary colors: Blue (#0D2A4B), Green (#22C55E), Red (#EF4444)
- Responsive breakpoints for mobile-first design
- Consistent spacing and typography
