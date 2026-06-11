import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import WeatherPage from './WeatherPage';

afterEach(() => {
  vi.unstubAllGlobals();
  localStorage.clear();
});

const MOCK_WEATHER = {
  city: 'Kuala Lumpur',
  date: '2025-01-10',
  condition: 'Sunny',
  temp: 32,
  feelsLike: 36,
  humidity: 75,
  wind: 15,
  visibility: 10,
  pressure: 1012,
  uvIndex: 8,
  airQuality: 'Good',
  forecast: [
    { day: 'Mon', condition: 'Sunny', high: 33, low: 26 },
    { day: 'Tue', condition: 'Cloudy', high: 30, low: 24 },
  ],
};

function makeFetch(status, body) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  });
}

describe('WeatherPage', () => {
  test('renders Weather Forecast heading', () => {
    render(<WeatherPage />);
    expect(screen.getByText('Weather Forecast')).toBeInTheDocument();
  });

  test('shows empty state prompt before any search', () => {
    render(<WeatherPage />);
    expect(
      screen.getByText(/Search for a city above/i)
    ).toBeInTheDocument();
  });

  test('renders the search input and Search button', () => {
    render(<WeatherPage />);
    expect(screen.getByPlaceholderText(/search city/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('shows weather data after a successful fetch', async () => {
    vi.stubGlobal('fetch', makeFetch(200, MOCK_WEATHER));
    const user = userEvent.setup();
    render(<WeatherPage />);

    await user.type(screen.getByPlaceholderText(/search city/i), 'Kuala Lumpur');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText('Kuala Lumpur')).toBeInTheDocument();
    });
  });

  test('shows city-not-found error on 404 response', async () => {
    vi.stubGlobal('fetch', makeFetch(404, {}));
    const user = userEvent.setup();
    render(<WeatherPage />);

    await user.type(screen.getByPlaceholderText(/search city/i), 'NoSuchCity');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });
  });

  test('shows generic error on non-ok server response', async () => {
    vi.stubGlobal('fetch', makeFetch(500, {}));
    const user = userEvent.setup();
    render(<WeatherPage />);

    await user.type(screen.getByPlaceholderText(/search city/i), 'KL');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch weather data/i)).toBeInTheDocument();
    });
  });

  test('shows network error when fetch rejects', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));
    const user = userEvent.setup();
    render(<WeatherPage />);

    await user.type(screen.getByPlaceholderText(/search city/i), 'KL');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText(/Could not reach the weather service/i)).toBeInTheDocument();
    });
  });

  test('renders popular city shortcut buttons', () => {
    render(<WeatherPage />);
    expect(screen.getByText(/Popular:/i)).toBeInTheDocument();
  });
});
