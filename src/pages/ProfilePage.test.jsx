import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProfilePage from './ProfilePage';

vi.mock('../api/profile', () => ({
  getProfile: vi.fn(),
}));

vi.mock('../context/AppContext', () => ({
  useAppContext: () => ({ setUser: vi.fn() }),
}));

import { getProfile } from '../api/profile';

const MOCK_PROFILE = {
  fullName: 'Jane Doe',
  email: 'jane@example.com',
  location: 'Kuala Lumpur',
  bio: 'Eco traveller',
  preferences: { notifications: true, units: 'metric', ecoGoal: 'low' },
};

function renderPage() {
  return render(
    <MemoryRouter>
      <ProfilePage />
    </MemoryRouter>
  );
}

afterEach(() => vi.clearAllMocks());

describe('ProfilePage', () => {
  test('shows loading spinner initially', () => {
    getProfile.mockReturnValue(new Promise(() => {})); // never resolves
    renderPage();
    expect(document.querySelector('.spinner-border')).toBeInTheDocument();
  });

  test('renders Personal Info section by default after loading', async () => {
    getProfile.mockResolvedValue(MOCK_PROFILE);
    renderPage();
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Personal Info' })).toBeInTheDocument();
    });
  });

  test('shows user full name in the sidebar after loading', async () => {
    getProfile.mockResolvedValue(MOCK_PROFILE);
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });
  });

  test('switches to Security section when Security nav is clicked', async () => {
    getProfile.mockResolvedValue(MOCK_PROFILE);
    const user = userEvent.setup();
    renderPage();

    await waitFor(() => screen.getByRole('heading', { name: 'Personal Info' }));
    await user.click(screen.getByRole('button', { name: /security/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Security' })).toBeInTheDocument();
    });
  });

  test('shows error message and retry button when getProfile() fails', async () => {
    getProfile.mockRejectedValue(new Error('Network error'));
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    });
  });

  test('retries loading when Try again button is clicked', async () => {
    getProfile
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValue(MOCK_PROFILE);

    const user = userEvent.setup();
    renderPage();

    await waitFor(() => screen.getByRole('button', { name: /try again/i }));
    await user.click(screen.getByRole('button', { name: /try again/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Personal Info' })).toBeInTheDocument();
    });
  });
});
