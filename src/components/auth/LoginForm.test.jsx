import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import LoginForm from './LoginForm';

vi.mock('../../api/auth', () => ({
  login: vi.fn(),
}));

vi.mock('../../context/AppContext', () => ({
  useAppContext: () => ({ setUser: vi.fn() }),
}));

import { login } from '../../api/auth';

afterEach(() => vi.clearAllMocks());

describe('LoginForm', () => {
  test('renders email and password fields', () => {
    render(<LoginForm onSuccess={() => {}} />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('renders Login button', () => {
    render(<LoginForm onSuccess={() => {}} />);
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows email validation error when email is invalid', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSuccess={() => {}} />);

    await user.type(screen.getByLabelText(/email address/i), 'notanemail');
    await user.type(screen.getByLabelText(/password/i), 'somepass');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
  });

  test('shows password required error when password is empty', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSuccess={() => {}} />);

    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  test('calls login() with correct credentials on valid submit', async () => {
    login.mockResolvedValue({ user: { id: '1', fullName: 'Jane' } });
    const user = userEvent.setup();
    render(<LoginForm onSuccess={() => {}} />);

    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/password/i), 'mypassword');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'jane@example.com',
        password: 'mypassword',
      });
    });
  });

  test('calls onSuccess after successful login', async () => {
    login.mockResolvedValue({ user: { id: '1', fullName: 'Jane' } });
    const onSuccess = vi.fn();
    const user = userEvent.setup();
    render(<LoginForm onSuccess={onSuccess} />);

    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/password/i), 'mypassword');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());
  });

  test('shows server error message when login() throws', async () => {
    login.mockRejectedValue(new Error('Invalid credentials'));
    const user = userEvent.setup();
    render(<LoginForm onSuccess={() => {}} />);

    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/password/i), 'wrongpass');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  test('does not call login() when validation fails', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSuccess={() => {}} />);

    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(login).not.toHaveBeenCalled();
  });
});
