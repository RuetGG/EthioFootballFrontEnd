import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { compareApi } from '../../../lib/api/compareApi';
import ComparePage from '../ComparePage';

// Mock the translation hook
jest.mock('../../../lib/i18n/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    language: 'en',
    setLanguage: jest.fn(),
  }),
}));

const mockStore = configureStore({
  reducer: {
    [compareApi.reducerPath]: compareApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(compareApi.middleware),
});

const mockComparisonData = {
  comparison_data: {
    team_a: {
      name: 'St. George',
      honors: ['31x Premier League', '12x Ethiopian Cup'],
      recent_form: ['W', 'W', 'D', 'W', 'L'],
      notable_players: ['Player A', 'Player B'],
      fanbase_notes: 'Reportedly the largest and most passionate fanbase in the country.',
    },
    team_b: {
      name: 'Ethiopia Bunna',
      honors: ['2x Premier League', '5x Ethiopian Cup'],
      recent_form: ['L', 'D', 'D', 'W', 'W'],
      notable_players: ['Player C', 'Player D'],
      fanbase_notes: 'Known for their vibrant and vocal supporters, especially in Addis Ababa.',
    },
  },
  source: 'Curated Data',
  freshness: '2025-09-01T12:00:00Z',
};

// Mock the API hook
jest.mock('../../../lib/api/compareApi', () => ({
  ...jest.requireActual('../../../lib/api/compareApi'),
  useGetComparisonQuery: jest.fn(),
}));

describe('ComparePage', () => {
  beforeEach(() => {
    const { useGetComparisonQuery } = require('../../../lib/api/compareApi');
    useGetComparisonQuery.mockReturnValue({
      data: mockComparisonData,
      isLoading: false,
      error: null,
    });
  });

  it('renders loading state', () => {
    const { useGetComparisonQuery } = require('../../../lib/api/compareApi');
    useGetComparisonQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <Provider store={mockStore}>
        <ComparePage />
      </Provider>
    );

    expect(screen.getByText('compare.loading')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const { useGetComparisonQuery } = require('../../../lib/api/compareApi');
    useGetComparisonQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: 'Failed to fetch' },
    });

    render(
      <Provider store={mockStore}>
        <ComparePage />
      </Provider>
    );

    expect(screen.getByText('compare.error')).toBeInTheDocument();
  });

  it('renders comparison data successfully', () => {
    render(
      <Provider store={mockStore}>
        <ComparePage />
      </Provider>
    );

    expect(screen.getByText('St. George')).toBeInTheDocument();
    expect(screen.getByText('Ethiopia Bunna')).toBeInTheDocument();
    expect(screen.getByText('compare.vs')).toBeInTheDocument();
    expect(screen.getByText('Curated Data')).toBeInTheDocument();
  });
});
