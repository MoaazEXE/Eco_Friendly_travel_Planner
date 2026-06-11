import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import ItineraryPage from './ItineraryPage';

vi.mock('../api/ecoOptions', () => ({
  getEcoOptions: vi.fn(),
}));

vi.mock('../context/AppContext', () => ({
  useAppContext: () => ({
    savedPlan: [],
    addStop: vi.fn(),
    removeStop: vi.fn(),
    updateStop: vi.fn(),
  }),
}));

import { getEcoOptions } from '../api/ecoOptions';

const MOCK_OPTIONS = [
  {
    id: 1, name: 'Green Leaf Boutique', city: 'kl', type: 'nature',
    category: 'Accommodation', eco: 5, budget: 150, impact: 'Low',
    impactNote: 'Solar-powered.',
    desc: 'Solar-powered eco-resort.',
    image: 'https://example.com/img1.jpg',
  },
  {
    id: 2, name: 'The Organic Kitchen', city: 'kl', type: 'food',
    category: 'Restaurant', eco: 4, budget: 35, impact: 'Low',
    impactNote: 'Locally sourced.',
    desc: 'Farm-to-table meals.',
    image: 'https://example.com/img2.jpg',
  },
  {
    id: 5, name: 'Penang Eco Resort', city: 'penang', type: 'nature',
    category: 'Accommodation', eco: 5, budget: 180, impact: 'Low',
    impactNote: 'Rainwater harvesting.',
    desc: 'Beachfront sustainable resort.',
    image: 'https://example.com/img3.jpg',
  },
];

beforeEach(() => {
  getEcoOptions.mockResolvedValue(MOCK_OPTIONS);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('ItineraryPage', () => {
  test('renders page heading', () => {
    render(<ItineraryPage />);
    expect(screen.getByText('Plan Your Green Journey')).toBeInTheDocument();
  });

  test('renders destination input', () => {
    render(<ItineraryPage />);
    expect(screen.getByPlaceholderText(/e.g. KL, Penang/i)).toBeInTheDocument();
  });

  test('renders Find Spots button', () => {
    render(<ItineraryPage />);
    expect(screen.getByRole('button', { name: /find spots/i })).toBeInTheDocument();
  });

  test('shows KL results after submitting with destination "kl" and nature interest', async () => {
    const user = userEvent.setup();
    render(<ItineraryPage />);
    await waitFor(() => getEcoOptions);

    await user.type(screen.getByPlaceholderText(/e.g. KL, Penang/i), 'kl');
    await user.click(screen.getByRole('button', { name: /find spots/i }));

    await waitFor(() => {
      expect(screen.getByText('Green Leaf Boutique')).toBeInTheDocument();
    });
  });

  test('shows error when adding to plan without selecting a date', async () => {
    const user = userEvent.setup();
    render(<ItineraryPage />);
    await waitFor(() => expect(getEcoOptions).toHaveBeenCalled());

    await user.type(screen.getByPlaceholderText(/e.g. KL, Penang/i), 'kl');
    await user.click(screen.getByRole('button', { name: /find spots/i }));

    await waitFor(() => screen.getByText('Green Leaf Boutique'));

    const addButtons = screen.getAllByRole('button', { name: /add to my plan/i });
    await user.click(addButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/Please select a Date of Visit/i)).toBeInTheDocument();
    });
  });

  test('renders saved itinerary section', async () => {
    render(<ItineraryPage />);
    await waitFor(() => {
      expect(screen.getByText('Your Saved Itinerary')).toBeInTheDocument();
    });
  });

  test('shows empty plan message when no stops saved', async () => {
    render(<ItineraryPage />);
    await waitFor(() => {
      expect(screen.getByText(/Your plan is empty/i)).toBeInTheDocument();
    });
  });
});
