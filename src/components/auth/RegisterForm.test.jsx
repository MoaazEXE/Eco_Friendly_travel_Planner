import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import RegisterForm from './RegisterForm';

vi.mock('../../api/auth', () => ({
  register: vi.fn(),
}));

import { register } from '../../api/auth';

function renderForm() {
  return render(
    <MemoryRouter>
      <RegisterForm />
    </MemoryRouter>
  );
}

afterEach(() => vi.clearAllMocks());

describe('RegisterForm', () => {
  test('renders all four input fields', () => {
    renderForm();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  test('renders Register button', () => {
    renderForm();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('shows error when full name is empty on submit', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole('button', { name: /register/i }));
    expect(screen.getByText(/enter your full name/i)).toBeInTheDocument();
  });

  test('shows error when email is invalid', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email address/i), 'bademail');
    await user.click(screen.getByRole('button', { name: /register/i }));
    expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
  });

  test('shows error when password is less than 8 characters', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'short');
    await user.click(screen.getByRole('button', { name: /register/i }));
    expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
  });

  test('shows error when passwords do not match', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');
    await user.type(screen.getByLabelText(/confirm password/i), 'different123');
    await user.click(screen.getByRole('button', { name: /register/i }));
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  test('shows success message after successful registration', async () => {
    register.mockResolvedValue({});
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');
    await user.type(screen.getByLabelText(/confirm password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /register/i }));
    await waitFor(() => {
      expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
    });
  });

  test('calls register() with correct payload on valid submit', async () => {
    register.mockResolvedValue({});
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');
    await user.type(screen.getByLabelText(/confirm password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /register/i }));
    await waitFor(() => {
      expect(register).toHaveBeenCalledWith({
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
      });
    });
  });

  test('shows server error when register() throws', async () => {
    register.mockRejectedValue(new Error('Email already in use'));
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');
    await user.type(screen.getByLabelText(/confirm password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /register/i }));
    await waitFor(() => {
      expect(screen.getByText('Email already in use')).toBeInTheDocument();
    });
  });
});
