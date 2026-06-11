import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import EcoOptionsPage from './EcoOptionsPage';

// Mock API
vi.mock('../api/ecoOptions', () => ({
  getEcoOptions: vi.fn(),
}));

// Mock AppContext
vi.mock('../context/AppContext', () => ({
  useAppContext: () => ({
    favourites: [],
    addFavourite: vi.fn(),
    removeFavourite: vi.fn(),
  }),
}));

import { getEcoOptions } from '../api/ecoOptions';

const MOCK_OPTIONS = [
  {
    id: 1, name: 'Green Leaf Boutique', city: 'kl',
    category: 'Accommodation', eco: 5, budget: 150,
    desc: 'Solar-powered eco-resort.',
    image: 'https://example.com/img1.jpg',
  },
  {
    id: 2, name: 'The Organic Kitchen', city: 'kl',
    category: 'Restaurant', eco: 4, budget: 35,
    desc: 'Farm-to-table meals.',
    image: 'https://example.com/img2.jpg',
  },
  {
    id: 5, name: 'Penang Eco Resort', city: 'penang',
    category: 'Accommodation', eco: 5, budget: 180,
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

describe('EcoOptionsPage', () => {
  test('renders page heading', async () => {
    render(<EcoOptionsPage />);
    expect(screen.getByText('Discover Eco Options')).toBeInTheDocument();
  });

  test('shows all 3 options after loading', async () => {
    render(<EcoOptionsPage />);
    await waitFor(() => {
      expect(screen.getByText('Green Leaf Boutique')).toBeInTheDocument();
      expect(screen.getByText('The Organic Kitchen')).toBeInTheDocument();
      expect(screen.getByText('Penang Eco Resort')).toBeInTheDocument();
    });
  });

  test('shows result count after loading', async () => {
    render(<EcoOptionsPage />);
    await waitFor(() => {
      expect(screen.getByText('3 results found')).toBeInTheDocument();
    });
  });

  test('filters results when typing in search box', async () => {
    const user = userEvent.setup();
    render(<EcoOptionsPage />);
    await waitFor(() => screen.getByText('Green Leaf Boutique'));

    await user.type(screen.getByPlaceholderText(/Search by city or place name/i), 'penang');

    await waitFor(() => {
      expect(screen.getByText('Penang Eco Resort')).toBeInTheDocument();
      expect(screen.queryByText('Green Leaf Boutique')).not.toBeInTheDocument();
      expect(screen.queryByText('The Organic Kitchen')).not.toBeInTheDocument();
    });
  });

  test('filters results when clicking a category button', async () => {
    const user = userEvent.setup();
    render(<EcoOptionsPage />);
    await waitFor(() => screen.getByText('Green Leaf Boutique'));

    await user.click(screen.getByRole('button', { name: 'Restaurant' }));

    await waitFor(() => {
      expect(screen.getByText('The Organic Kitchen')).toBeInTheDocument();
      expect(screen.queryByText('Green Leaf Boutique')).not.toBeInTheDocument();
      expect(screen.queryByText('Penang Eco Resort')).not.toBeInTheDocument();
    });
  });

  test('result count updates after filtering by category', async () => {
    const user = userEvent.setup();
    render(<EcoOptionsPage />);
    await waitFor(() => screen.getByText('3 results found'));

    await user.click(screen.getByRole('button', { name: 'Restaurant' }));

    await waitFor(() => {
      expect(screen.getByText('1 results found')).toBeInTheDocument();
    });
  });

  test('shows no results message when search matches nothing', async () => {
    const user = userEvent.setup();
    render(<EcoOptionsPage />);
    await waitFor(() => screen.getByText('Green Leaf Boutique'));

    await user.type(screen.getByPlaceholderText(/Search by city or place name/i), 'zzznomatch');

    await waitFor(() => {
      expect(screen.getByText(/No eco-options found/i)).toBeInTheDocument();
    });
  });

  test('shows My Favourites sidebar', async () => {
    render(<EcoOptionsPage />);
    expect(screen.getByText('My Favourites')).toBeInTheDocument();
  });
});
